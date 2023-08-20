using Backend.Data.Entities.Visit;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data.Repositories
{
    public class VisitRepository : IVisitRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public VisitRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Visit> CreateAsync(Visit visit)
        {
            _dbContext.Visits.Add(visit);
            await _dbContext.SaveChangesAsync();
            return visit;
        }

        public async Task<IEnumerable<Visit>> GetAllAsync()
        {
            return await _dbContext.Visits.ToListAsync();
        }

        public async Task<IEnumerable<Visit>> GetAllOfSpecialistAsync(Guid specialistId)
        {
            return await _dbContext.Visits.Where(x => x.OwnerId == specialistId.ToString()).ToListAsync();
        }

        public async Task<IEnumerable<Visit>> GetLast7Async()
        {
            return await _dbContext.Visits.OrderBy(x => x.StartDate).Where(x => DateTime.Now < x.StartDate && x.Status == VisitStatus.NOT_STARTED).Take(7).ToListAsync();
        }

        public async Task<IEnumerable<Visit>> GetAllStartedAsync()
        {
            return await _dbContext.Visits.Where(x => x.Status == VisitStatus.STARTED).ToListAsync();
        }

        public async Task<Visit?> GetAsync(Guid visitId)
        {
            return await _dbContext.Visits.FirstOrDefaultAsync(x => x.Id == visitId);
        }

        public async Task<Visit?> GetByCodeAsync(int code)
        {
            return await _dbContext.Visits.FirstOrDefaultAsync(x => x.Code == code);
        }

        public async Task<Visit> UpdateAsync(Visit visit)
        {
            _dbContext.Visits.Update(visit);
            await _dbContext.SaveChangesAsync();
            return visit;
        }

        public async Task<int> GetLastCodeAsync()
        {
            var maxCode = await _dbContext.Visits.MaxAsync(x => (int?)x.Code);
            if (maxCode.HasValue)
            {
                return (int)maxCode;
            }
            else
            {
                return 0;
            }
        }
    }
}
