using api.Data;
using api.Extensions;
using api.Models;
using api.ViewModels;
using api.ViewModels.Todo;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data.Common;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class TodoController : ControllerBase
{
    [Authorize]
    [HttpGet("")]
    public async Task<IActionResult> GetAsync(
        [FromServices] AppDbContext context)
    {
        var user = await context.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == Guid.Parse(User.Identity.Name));
        if (user == null)
            return NotFound(new ResultViewModel<Todo>("Usuário não encontrado"));

        try
        {
            var todos = context.Todos.AsNoTracking().Where(t => t.UserId == Guid.Parse(User.Identity.Name)).OrderBy(t => t.Done).ToList();

            return Ok(new ResultViewModel<List<Todo>>(todos));
        }
        catch
        {
            return StatusCode(500, new ResultViewModel<string>("05X01 - Falha interna no servidor"));
        }
    }

    [Authorize]
    [HttpPost("")]
    public async Task<IActionResult> PostAsync(
        [FromBody] EditorTodoViewModel model,
        [FromServices] AppDbContext context)
    {
        if (!ModelState.IsValid)
            return BadRequest(new ResultViewModel<Todo>(ModelState.GetErrors()));

        var user = await context.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == Guid.Parse(User.Identity.Name));
        if (user == null)
            return NotFound(new ResultViewModel<Todo>("Usuário não encontrado"));

        try
        {
            var todo = new Todo
            {
                Title = model.Title,
                ScheduleAt = model.ScheduledAt,
                Done = model?.Done ?? false,
                CreatedAt = DateTime.Now.ToUniversalTime(),
                UserId = user.Id,
            };
            await context.Todos.AddAsync(todo);
            await context.SaveChangesAsync();

            return Ok(new ResultViewModel<Todo>(todo));
        }
        catch
        {
            return StatusCode(500, new ResultViewModel<string>("05X01 - Falha interna no servidor"));
        }
    }

    [Authorize]
    [HttpPut("{id:guid}/toggle-finish")]
    public async Task<IActionResult> ToogleFinishTodo(
        [FromRoute] Guid id,
        [FromServices] AppDbContext context)
    {
        var user = await context.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == Guid.Parse(User.Identity.Name));
        if (user == null)
            return NotFound(new ResultViewModel<Todo>("Usuário não encontrado"));

        var todo = await context.Todos.FirstOrDefaultAsync(t => t.Id == id);
        if (todo == null)
            return NotFound(new ResultViewModel<Todo>("Tarefa não encontrada"));

        if (todo.UserId != user.Id)
            return StatusCode(403, new ResultViewModel<string>("05X02 - Você não possui permissão para alterar esta tarefa"));

        try
        {
            var updatedTodo = todo;
            updatedTodo.Done = !todo.Done;
            context.Todos.Update(updatedTodo);
            await context.SaveChangesAsync();

            return Ok(new ResultViewModel<Todo>(updatedTodo));
        }
        catch
        {
            return StatusCode(500, new ResultViewModel<string>("05X03 - Falha interna no servidor"));
        }
    }

    [Authorize]
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteAsync(
        [FromRoute] Guid id,
        [FromServices] AppDbContext context)
    {
        try
        {
            var user = await context.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == Guid.Parse(User.Identity.Name));
            if (user == null)
                return NotFound(new ResultViewModel<Todo>("Usuário não encontrado"));

            var todo = await context.Todos.FirstOrDefaultAsync(t => t.Id == id);
            if (todo == null)
                return NotFound(new ResultViewModel<Todo>("Tarefa não encontrada"));

            if (todo.UserId != user.Id)
                return StatusCode(403, new ResultViewModel<string>("05X02 - Você não possui permissão para alterar esta tarefa"));

            context.Todos.Remove(todo);
            await context.SaveChangesAsync();

            return Ok(new ResultViewModel<Todo>(todo));
        }
        catch (DbUpdateException ex)
        {
            return StatusCode(500, new ResultViewModel<Todo>("05XE7 - Não foi possível excluir a tarefa"));
        }
        catch (Exception ex)
        {
            return StatusCode(500, new ResultViewModel<Todo>("05X12 - Falha interna no servidor"));
        }
    }
}
