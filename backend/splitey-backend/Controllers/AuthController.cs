using Microsoft.AspNetCore.Mvc;
using splitey_backend.DTOs;
using splitey_backend.Services;

namespace splitey_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequest request)
        {
            var result = await _userService.RegisterAsync(request);
            if (result == "Email already exists.")
                return BadRequest(new { error = result });

            return Ok(new { message = result });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            var result = await _userService.LoginAsync(request);
            if (result == null)
                return Unauthorized(new { error = "Invalid credentials." });

            return Ok(new { message = result });
        }
    }

}
