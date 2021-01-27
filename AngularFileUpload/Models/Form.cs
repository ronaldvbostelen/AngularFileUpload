using System.ComponentModel.DataAnnotations;
using System.Security.AccessControl;
using Microsoft.AspNetCore.Http;

namespace AngularFileUpload.Models
{
    public class Form
    {
        [Required] public int FormId { get; set; }
        [Required] public string[] Names { get; set; }
        [Required] public IFormFile File { get; set; }
    }
}