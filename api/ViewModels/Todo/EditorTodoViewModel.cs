using System.ComponentModel.DataAnnotations;

namespace api.ViewModels.Todo
{
    public class EditorTodoViewModel
    {
        [Required(ErrorMessage = "O campo de título é obrigatório")]
        public string Title { get; set; }
        public bool? Done { get; set; }
        public DateTime? ScheduledAt { get; set; }

    }
}
