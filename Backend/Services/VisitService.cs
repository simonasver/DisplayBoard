using Backend.Data.Entities.Auth;
using Backend.Data.Entities.Utils;
using Backend.Data.Entities.Visit;
using Backend.Data.Repositories;
using Microsoft.AspNetCore.Identity;

namespace Backend.Services
{
    public class VisitService : IVisitService
    {
        private const int VisitDurationInMinutes = 5;

        private readonly IConfiguration _configuration;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IVisitRepository _visitRepository;

        public VisitService(IConfiguration configuration, UserManager<ApplicationUser> userManager, IVisitRepository visitRepository)
        {
            _configuration = configuration;
            _userManager = userManager;
            _visitRepository = visitRepository;
        }

        public async Task<ServiceResult<IEnumerable<Visit>>> GetLast7Async(string password)
        {
            if (password != _configuration["DisplayBoard:Password"])
            {
                return ServiceResult<IEnumerable<Visit>>.Failure(StatusCodes.Status400BadRequest, "Invalid password");
            }

            try
            {
                var visits = await _visitRepository.GetLast7Async();
                return ServiceResult<IEnumerable<Visit>>.Success(visits);
            }
            catch (Exception ex)
            {
                return ServiceResult<IEnumerable<Visit>>.Failure(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        public async Task<ServiceResult<IEnumerable<Visit>>> GetSpecialistVisitsAsync(Guid specialistId)
        {
            try
            {
                var visits = await _visitRepository.GetAllOfSpecialistAsync(specialistId);
                return ServiceResult<IEnumerable<Visit>>.Success(visits);
            }
            catch (Exception ex)
            {
                return ServiceResult<IEnumerable<Visit>>.Failure(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        public async Task<ServiceResult<Visit>> GetVisitAsync(Guid visitId)
        {
            try
            {
                var visit = await _visitRepository.GetAsync(visitId);
                return ServiceResult<Visit>.Success(visit);
            }
            catch (Exception ex)
            {
                return ServiceResult<Visit>.Failure(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        public async Task<ServiceResult<Visit>> GetVisitByCodeAsync(int code)
        {
            try
            {
                var visit = await _visitRepository.GetByCodeAsync(code);
                return ServiceResult<Visit>.Success(visit);
            }
            catch (Exception ex)
            {
                return ServiceResult<Visit>.Failure(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        public async Task<ServiceResult<Guid>> CreateAsync(Guid specialistId)
        {
            var specialist = await _userManager.FindByIdAsync(specialistId.ToString());

            if (specialist == null)
            {
                return ServiceResult<Guid>.Failure(StatusCodes.Status400BadRequest, "User not found");
            }

            var specialistVisits = await _visitRepository.GetAllOfSpecialistAsync(specialistId);
            var lastSpecialistVisit = specialistVisits.OrderByDescending(x => x.StartDate).FirstOrDefault();

            Visit visit = new Visit()
            {
                Code = await GenerateCode(),
                DurationInMinutes = VisitDurationInMinutes,
                Owner = specialist,
                Status = VisitStatus.NOT_STARTED,
                StartDate = lastSpecialistVisit == null ? DateTime.Now : lastSpecialistVisit.StartDate.AddMinutes(lastSpecialistVisit.DurationInMinutes + 1)
            };

            var createdVisit = await _visitRepository.CreateAsync(visit);
            return ServiceResult<Guid>.Success(createdVisit.Id);
        }


        public async Task<ServiceResult<bool>> UpdateVisitStatusAsync(Guid visitId, VisitStatus status)
        {
            var visit = await _visitRepository.GetAsync(visitId);

            if (visit == null)
            {
                return ServiceResult<bool>.Failure(StatusCodes.Status400BadRequest, "Visit not found");
            }

            if (status == VisitStatus.NOT_STARTED)
            {
                return ServiceResult<bool>.Failure(StatusCodes.Status400BadRequest,
                    "Cannot change visit status to not started");
            }

            if (status == VisitStatus.STARTED)
            {
                if (visit.Status != VisitStatus.NOT_STARTED)
                {
                    return ServiceResult<bool>.Failure(StatusCodes.Status400BadRequest, "Can only start visit if it hasn't been started already");
                }
                var userVisits = await _visitRepository.GetAllOfSpecialistAsync(new Guid(visit.OwnerId));
                if (userVisits.Any(x => x.Status == VisitStatus.STARTED))
                {
                    return ServiceResult<bool>.Failure(StatusCodes.Status400BadRequest, "Specialist already has a visit started");
                }
                visit.StartDate = DateTime.Now;
            }

            if (status == VisitStatus.ENDED)
            {
                if (visit.Status != VisitStatus.STARTED)
                {
                    return ServiceResult<bool>.Failure(StatusCodes.Status400BadRequest, "Can only end visit if it was started already");
                }
            }

            if (status == VisitStatus.CANCELED)
            {
                if (visit.Status != VisitStatus.STARTED && visit.Status != VisitStatus.NOT_STARTED)
                {
                    return ServiceResult<bool>.Failure(StatusCodes.Status400BadRequest, "Can only cancel visit if it hasn't been ended already");
                }
            }

            visit.Status = status;

            await _visitRepository.UpdateAsync(visit);

            return ServiceResult<bool>.Success();
        }

        private async Task<int> GenerateCode()
        {
            return await _visitRepository.GetLastCodeAsync() + 1;
        }

        public async Task UpdateVisitsAsync()
        {
            var visits = await _visitRepository.GetAllStartedAsync();

            foreach (var visit in visits)
            {
                if (DateTime.Now > visit.StartDate.AddMinutes(visit.DurationInMinutes))
                {
                    visit.Status = VisitStatus.ENDED;
                    await _visitRepository.UpdateAsync(visit);
                }
            }
        }
    }
}
