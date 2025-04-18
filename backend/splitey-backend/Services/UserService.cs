using Microsoft.EntityFrameworkCore;
using splitey_backend.Context;
using splitey_backend.DTOs;

namespace splitey_backend.Services
{
    public class UserService : IUserService
    {
        private readonly SpliteyContext _context;

        public UserService(SpliteyContext context)
        {
            _context = context;
        }

        public async Task<string> RegisterAsync(RegisterRequest request)
        {
            var existing = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (existing != null)
                return "Email already exists.";

            var user = new User
            {
                FullName = request.FullName,
                Email = request.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(request.Password)
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return "User registered successfully.";
        }

        public async Task<string> LoginAsync(LoginRequest request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
                return null;

            return "Login successful."; // Later: return JWT token
        }
    }

}
