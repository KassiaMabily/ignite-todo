using api.Data;
using api.Extensions;
using api.Models;
using api.Services;
using api.ViewModels;
using api.ViewModels.Accounts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using SecureIdentity.Password;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class AccountController : ControllerBase
{
    [HttpPost("sign-up")]
    public async Task<IActionResult> Post(
        [FromBody] RegisterViewModel model,
        [FromServices] AppDbContext context,
        [FromServices] TokenService tokenService)
    {
        if (!ModelState.IsValid)
            return BadRequest(new ResultViewModel<string>(ModelState.GetErrors()));

        var user = new User
        {
            Name = model.Name,
            Email = model.Email
        };

        var password = PasswordGenerator.Generate(25);
        user.PasswordHash = PasswordHasher.Hash(password);

        try
        {
            await context.AddAsync(user);
            await context.SaveChangesAsync();
            var token = tokenService.GenerateToken(user);

            return Ok(new ResultViewModel<dynamic>(new {
                user = user.Email,
                password,
                token
            }));
        }
        catch (DbUpdateException)
        {
            StatusCode(400, new ResultViewModel<string>("05X99 - Este E-mail já está cadastrado"));
        }
        catch
        {
            return StatusCode(500, new ResultViewModel<string>("05X04 - Falha interna no servidor"));
        }

        return Ok();
    }

    [HttpPost("sign-in")]
    public async Task<IActionResult> SignIn(
        [FromBody] LoginViewModel model,
        [FromServices] AppDbContext context,
        [FromServices] TokenService tokenService)
    {
        if (!ModelState.IsValid)
            return BadRequest(new ResultViewModel<string>(ModelState.GetErrors()));

        try
        {
            var user = await context
            .Users
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Email == model.Email);

            if (user == null)
                return StatusCode(401, new ResultViewModel<string>("Usuário ou senha inválidos"));

            if (!PasswordHasher.Verify(user.PasswordHash, model.Password))
                return StatusCode(401, new ResultViewModel<string>("Usuário ou senha inválidos"));

        
            var token = tokenService.GenerateToken(user);
            return Ok(new ResultViewModel<string>(token, null));
        }
        catch (SqlException ex)
        {
            return StatusCode(500, new ResultViewModel<string>(ex.Message));
        }
        catch
        {
            return StatusCode(500, new ResultViewModel<string>("05X04 - Falha interna no servidor"));
        }
    }
}
