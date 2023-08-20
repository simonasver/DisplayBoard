using Backend.Data.Entities.Utils;
using Backend.Data.Entities.Visit;

namespace Backend.Services
{
    public interface IVisitService
    {
        public Task<ServiceResult<IEnumerable<Visit>>> GetLast7Async(string password);
        public Task<ServiceResult<IEnumerable<Visit>>> GetSpecialistVisitsAsync(Guid specialistId);
        public Task<ServiceResult<Visit>> GetVisitAsync(Guid visitId);
        public Task<ServiceResult<Visit>> GetVisitByCodeAsync(int code);
        public Task<ServiceResult<Guid>> CreateAsync(Guid specialistId);
        public Task<ServiceResult<bool>> UpdateVisitStatusAsync(Guid visitId, VisitStatus status);
        public Task UpdateVisitsAsync();
    }
}
