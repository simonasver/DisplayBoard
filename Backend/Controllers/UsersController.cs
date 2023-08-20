using Backend.Data.Dtos.Auth;
using Backend.Data.Entities.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public UsersController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [AllowAnonymous]
        [HttpGet("/api/[controller]")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userManager.Users.ToListAsync();

            var transformedUsers = users.Select(x => new { x.Id, x.UserName }).ToList();

            return Ok(transformedUsers);
        }

        [Authorize]
        [HttpGet("/api/[controller]/profile")]
        public async Task<IActionResult> GetUser()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            if (user == null)
            {
                return Forbid();
            }

            var roles = await _userManager.GetRolesAsync(user);

            return Ok(new UserDto(user.Id, user.UserName, user.Email, roles));
        }

        [AllowAnonymous]
        [HttpPost("/api/[controller]")]
        public async Task<IActionResult> Register([FromBody] RegisterDto userRegisterDto)
        {
            var user = await _userManager.FindByNameAsync(userRegisterDto.UserName);
            if (user != null)
            {
                return BadRequest("This user already exists");
            }

            if (await _userManager.FindByEmailAsync(userRegisterDto.Email) != null)
            {
                return BadRequest("This email is already in use");
            }

            var newUser = new ApplicationUser
            {
                Email = userRegisterDto.Email,
                UserName = userRegisterDto.UserName,
                HasActiveVisit = false
            };
            var createUserResult = await _userManager.CreateAsync(newUser, userRegisterDto.Password);
            if (!createUserResult.Succeeded)
            {
                return BadRequest(createUserResult.Errors.FirstOrDefault()?.Description ?? "Could not create a user");
            }

            await _userManager.AddToRoleAsync(newUser, ApplicationUserRoles.User);

            return CreatedAtAction(nameof(Register), newUser.Id);
        }
    }
}
