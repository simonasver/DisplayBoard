using System.ComponentModel.DataAnnotations;
using Backend.Data.Entities.Visit;

namespace Backend.Data.Dtos.Visit
{
    public class ChangeVisitStatusDto
    {
        [Required(ErrorMessage = "Visit status is required")]
        public VisitStatus VisitStatus { get; set; }
    }
}
