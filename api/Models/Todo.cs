

using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace api.Models
{
    [Table("Todo")]
    public class Todo
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        [Required]
        public string Title { get; set; }
        [DefaultValue(false)]
        public bool Done { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Identity), DataMember]
        public DateTime? CreatedAt { get; set; }
        public DateTime? ScheduleAt { get; set; }
        public DateTime? FinishedAt { get; set; }

        [ForeignKey("UserId")] public Guid UserId { get; set; }
        public User User { get; set; }

        // public Todo() {
        //     CreatedAt = DateTime.Now.ToUniversalTime();
        // }
    }
}
