using Backend.Data.Dtos.Visit;
using Backend.Data.Entities.Auth;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VisitsController : ControllerBase
    {
        private readonly IVisitService _visitService;
        private readonly UserManager<ApplicationUser> _userManager;

        public VisitsController(IVisitService visitService, UserManager<ApplicationUser> userManager)
        {
            _visitService = visitService;
            _userManager = userManager;
        }

        [AllowAnonymous]
        [HttpGet("/api/[controller]")]
        public async Task<IActionResult> GetLast7([FromQuery] string password)
        {
            var visitsResult = await _visitService.GetLast7Async(password);

            if (!visitsResult.IsSuccess)
            {
                return StatusCode(visitsResult.ErrorStatus, visitsResult.ErrorMessage);
            }

            var visits = visitsResult.Data;

            return Ok(visits);
        }

        [Authorize]
        [HttpGet("/api/Users/{userId}/Visits")]
        public async Task<IActionResult> GetSpecialistVisits(Guid userId)
        {
            var visitsResult = await _visitService.GetSpecialistVisitsAsync(userId);

            if (!visitsResult.IsSuccess)
            {
                return StatusCode(visitsResult.ErrorStatus, visitsResult.ErrorMessage);
            }

            var visits = visitsResult.Data;

            return Ok(visits);
        }

        [AllowAnonymous]
        [HttpGet("/api/[controller]/{visitId}")]
        public async Task<IActionResult> GetVisit(Guid visitId)
        {
            var visitResult = await _visitService.GetVisitAsync(visitId);

            if (!visitResult.IsSuccess)
            {
                return StatusCode(visitResult.ErrorStatus, visitResult.ErrorMessage);
            }

            var visit = visitResult.Data;

            if (visit == null)
            {
                return NotFound();
            }

            return Ok(visit);
        }

        [AllowAnonymous]
        [HttpGet("/api/[controller]/Code/{visitCode}")]
        public async Task<IActionResult> GetVisitByCode(int visitCode)
        {
            var visitResult = await _visitService.GetVisitByCodeAsync(visitCode);

            if (!visitResult.IsSuccess)
            {
                return StatusCode(visitResult.ErrorStatus, visitResult.ErrorMessage);
            }

            var visit = visitResult.Data;

            if (visit == null)
            {
                return NotFound();
            }

            return Ok(visit);
        }

        [AllowAnonymous]
        [HttpPost("/api/[controller]")]
        public async Task<IActionResult> CreateVisit([FromBody] CreateVisitDto createVisitDto)
        {
            var createdVisitResult = await _visitService.CreateAsync(createVisitDto.SpecialistId);

            if (!createdVisitResult.IsSuccess)
            {
                return StatusCode(createdVisitResult.ErrorStatus, createdVisitResult.ErrorMessage);
            }

            return CreatedAtAction(nameof(CreateVisit), createdVisitResult.Data);
        }

        [Authorize]
        [HttpPatch("/api/[controller]/{visitId}/Status")]
        public async Task<IActionResult> ChangeStatus(Guid visitId, [FromBody] ChangeVisitStatusDto changeVisitStatusDto)
        {
            var updatedVisitResult = await _visitService.UpdateVisitStatusAsync(visitId, changeVisitStatusDto.VisitStatus);

            if (!updatedVisitResult.IsSuccess)
            {
                return StatusCode(updatedVisitResult.ErrorStatus, updatedVisitResult.ErrorMessage);
            }

            return NoContent();
        }
    }
}
