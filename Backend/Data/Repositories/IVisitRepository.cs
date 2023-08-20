using Backend.Data.Entities.Visit;

namespace Backend.Data.Repositories
{
    public interface IVisitRepository
    {
        public Task<IEnumerable<Visit>> GetAllAsync();
        public Task<IEnumerable<Visit>> GetAllOfSpecialistAsync(Guid specialistId);
        public Task<IEnumerable<Visit>> GetLast7Async();
        public Task<IEnumerable<Visit>> GetAllStartedAsync();
        public Task<Visit?> GetAsync(Guid visitId);
        public Task<Visit?> GetByCodeAsync(int code);
        public Task<Visit> CreateAsync(Visit visit);
        public Task<Visit> UpdateAsync(Visit visit);
        public Task<int> GetLastCodeAsync();
    }
}
