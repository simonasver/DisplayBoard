using Microsoft.AspNetCore.Identity;

namespace Backend.Data.Entities.Auth
{
    public class ApplicationUser : IdentityUser
    {
        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiration { get; set; }
        public bool HasActiveVisit { get; set; }

    }
}
