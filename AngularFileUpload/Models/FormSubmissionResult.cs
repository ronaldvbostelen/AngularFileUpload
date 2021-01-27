namespace AngularFileUpload.Models
{
    public class FileSubmissionResult
    {
        public int Id { get; set; }
        public int FormId { get; set; }
        public string Name { get; set; }
        public long FileSize { get; set; }
    }
}