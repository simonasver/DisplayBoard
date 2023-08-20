using System.ComponentModel.DataAnnotations;

namespace Backend.Data.Dtos.Visit
{
    public class CreateVisitDto
    {
        [Required(ErrorMessage = "Specialist ID is required")]
        public Guid SpecialistId { get; set; }
    }
}
