using Adventureworks.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace TuProyecto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AdventureWorksContext _context;
        private readonly IConfiguration _configuration;

        // Modificamos el constructor para inyectar IConfiguration
        public AuthController(AdventureWorksContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto request)
        {
            if (await _context.Customers.AnyAsync(c => c.EmailAddress == request.EmailAddress))
            {
                return BadRequest("El correo electrónico ya está registrado.");
            }

            CreatePasswordHash(request.Password, out string passwordHash, out string passwordSalt);

            var customer = new Customer
            {
                NameStyle = false,
                FirstName = request.FirstName,
                LastName = request.LastName,
                EmailAddress = request.EmailAddress,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                Rowguid = Guid.NewGuid(),
                ModifiedDate = DateTime.UtcNow
            };

            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Cliente registrado con éxito." });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto request)
        {
            var customer = await _context.Customers.FirstOrDefaultAsync(c => c.EmailAddress == request.EmailAddress);

            if (customer == null)
            {
                return BadRequest("Credenciales inválidas.");
            }

            if (!VerifyPasswordHash(request.Password, customer.PasswordHash, customer.PasswordSalt))
            {
                return BadRequest("Credenciales inválidas.");
            }

            // Generamos el token usando el nuevo método
            string token = CreateToken(customer);

            return Ok(new { message = "Login exitoso.", token = token });
        }

        // --- Método NUEVO para generar el Token JWT ---
        private string CreateToken(Customer customer)
        {
            // 1. Crear los "Claims" (información que viaja dentro del token)
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, customer.CustomerId.ToString()),
                new Claim(ClaimTypes.Email, customer.EmailAddress),
                new Claim(ClaimTypes.GivenName, customer.FirstName)
            };

            // 2. Obtener la clave secreta desde appsettings.json
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));

            // 3. Crear las credenciales de firma (usando HMAC SHA512)
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            // 4. Configurar el token (emisor, audiencia, expiración y firma)
            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddDays(1), // El token durará 1 día
                signingCredentials: creds
            );

            // 5. Escribir y retornar el token como un string
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

        // --- Métodos Privados Auxiliares para el Hashing (Sin cambios) ---

        private void CreatePasswordHash(string password, out string passwordHash, out string passwordSalt)
        {
            // Generamos un Salt aleatorio de 10 caracteres (límite de AdventureWorks)
            passwordSalt = Guid.NewGuid().ToString("N").Substring(0, 10);

            // Hasheamos la contraseña combinada con el Salt usando SHA256
            using (var sha256 = System.Security.Cryptography.SHA256.Create())
            {
                var combined = Encoding.UTF8.GetBytes(password + passwordSalt);
                passwordHash = Convert.ToBase64String(sha256.ComputeHash(combined));
            }
        }

        private bool VerifyPasswordHash(string password, string storedHash, string storedSalt)
        {
            using (var sha256 = System.Security.Cryptography.SHA256.Create())
            {
                var combined = Encoding.UTF8.GetBytes(password + storedSalt);
                var computedHash = Convert.ToBase64String(sha256.ComputeHash(combined));

                return computedHash == storedHash;
            }
        }
    }

    public class RegisterDto
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string EmailAddress { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class LoginDto
    {
        public string EmailAddress { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}