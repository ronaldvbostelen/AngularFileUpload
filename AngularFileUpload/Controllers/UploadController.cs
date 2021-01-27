using AngularFileUpload.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Threading.Tasks;

namespace AngularFileUpload.Controllers
{
    [ApiController]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class UploadController : Controller
    {
        private readonly ILogger<UploadController> _logger;

        public UploadController(ILogger<UploadController> logger)
        {
            _logger = logger;
        }

        [HttpGet("{id:int}/forms/{formId:int}")]
        public async Task<FormSubmissionResult> ViewSubmissionResult(int id, int formId)
        {
            _logger.LogInformation($"viewing the form#{formId}, for ID={id}");
            await Task.Delay(1000);
            return new FormSubmissionResult {FormId = formId, Id = id};
        }

        [HttpPost("{id:int}/single")]
        [RequestSizeLimit(long.MaxValue)]
        public async Task<ActionResult<FormSubmissionResult>> SubmitFile(int id, [FromForm] Form form)
        {
            _logger.LogInformation($"Validating the form#{form.FormId} for ID={id}");

            if (form.Names == null || form.Names.Length == 0)
            {
                return BadRequest("Please enter at least one name.");
            }

            if (form.File == null || form.File.Length < 1)
            {
                return BadRequest("The uploaded file is empty.");
            }

            var filePath = Path.Combine(@"App_Data", id.ToString(), DateTime.Now.ToFileTime() + Path.GetExtension(form.File.FileName));
            new FileInfo(filePath).Directory?.Create();

            await using (var stream = new FileStream(filePath, FileMode.Create))
            {
                _logger.LogInformation($"Saving file [{form.File.FileName}].");
                await form.File.CopyToAsync(stream);
                _logger.LogInformation($"\t The uploaded file is saved as [{filePath}].");
            }

            var result = new FormSubmissionResult {FormId = form.FormId, Id = id, FileSize = form.File.Length};
            return CreatedAtAction(nameof(SubmitFile), new {id, form.FormId}, result);
        }

        [HttpPost("{id:int}/multiple")]
        [RequestSizeLimit(long.MaxValue)]
        public async Task<ActionResult<List<SubmissionResult>>> SubmitFiles(int id, [Required] List<IFormFile> files)
        {
            if (files == null || files.Count == 0)
            {
                return BadRequest("No file is uploaded");
            }
            
            var result = new List<SubmissionResult>();

            foreach (var formFile in files)
            {
                var filePath = Path.Combine(@"App_Data", id.ToString(), @"Files", formFile.FileName);
                new FileInfo(filePath).Directory?.Create();

                await using var stream = new FileStream(filePath, FileMode.Create);
                await formFile.CopyToAsync(stream);
                _logger.LogInformation($"The uploaded file [{formFile.FileName}] is saved as [{filePath}]");
                
                result.Add(new SubmissionResult{FileName = formFile.FileName, FileSize = formFile.Length});
            }

            return Ok(result);
        }
        
    }
}
