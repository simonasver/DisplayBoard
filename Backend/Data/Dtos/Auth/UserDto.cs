namespace Backend.Data.Dtos.Auth
{
    public class UserDto
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public IList<string> Roles { get; set; }

        public UserDto(string id, string userName, string email, IList<string> roles)
        {
            this.Id = id;
            this.UserName = userName;
            this.Email = email;
            this.Roles = roles;
        }
    }
}
