using Backend.Data.Entities.Auth;

namespace Backend.Data.Entities.Visit
{
    public class Visit : IUserOwnedResource
    {
        public Guid Id { get; set; }
        public int Code { get; set; }
        public DateTime StartDate { get; set; }
        public int DurationInMinutes { get; set; }
        public VisitStatus Status { get; set; }
        public string OwnerId { get; set; }
        public ApplicationUser Owner { get; set; }
    }

    public enum VisitStatus
    {
        NOT_STARTED,
        STARTED,
        ENDED,
        CANCELED
    }
}
