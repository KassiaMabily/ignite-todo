using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class HomeController : ControllerBase
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    [HttpGet("", Name = "HealthCheck")]
    public IActionResult Get([FromServices] IConfiguration config)
    {
        var env = config.GetValue<string>("Env");
        return Ok(new
        {
            environment = env
        });
    }
}
