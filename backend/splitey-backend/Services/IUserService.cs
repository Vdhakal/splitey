using splitey_backend.DTOs;

namespace splitey_backend.Services
{
    public interface IUserService
    {
        Task<string> RegisterAsync(RegisterRequest request);
        Task<string> LoginAsync(LoginRequest request);
    }

}
