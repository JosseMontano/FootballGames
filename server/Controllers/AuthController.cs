using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Constants;
using server.Dtos;
using server.Models;
using server.Utils;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
namespace server.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController : ControllerBase
    {
        private readonly SoccerGameDbContext db;
        private readonly IConfiguration configuration;
        Response res = new();
        public AuthController(SoccerGameDbContext _db, IConfiguration _configuration)
        {
            db = _db;
            configuration = _configuration;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDTO body)
        {
            var existUser = await db.Users.AnyAsync(x => x.Gmail == body.Gmail);
            if (existUser) return res.BadRequestResponse(Messages.Auth.EXISTSUSERNAME);

            //? validate password 
            if (body.Password != body.ConfirmPassword) return res.BadRequestResponse(Messages.Auth.ERRORPASSWORDBODY);

            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(body.Password);

            var user = new User
            {
                Gmail = body.Gmail,
                Password = hashedPassword
            };

            db.Users.Add(user);
            await db.SaveChangesAsync();

            //? start: generate token 
            string? key = configuration.GetValue<string>("JWT:Key");
            string? issuer = configuration.GetValue<string>("JWT:Issuer");
            string? audience = configuration.GetValue<string>("JWT:Audience");

            if (key == null || issuer == null || audience == null) return res.BadRequestResponse(Messages.Auth.ERRORTOKEN);

            var token = GenerateToken(user, new JwtSecrets
            {
                Key = key,
                Audience = audience,
                Issuer = issuer
            });
            //? end: generate token 
            return res.SuccessResponse(Messages.Auth.CREATED, new { token });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDTO body)
        {
            var user = await db.Users.Where(u => u.Gmail == body.Gmail).FirstOrDefaultAsync();
            if (user == null) return res.NotFoundResponse(Messages.Auth.NOTFOUND);

            bool hash = BCrypt.Net.BCrypt.Verify(body.Password, user.Password);

            if (!hash) return res.NotFoundResponse(Messages.Auth.UNAUTHORIZED);

            //? start: generate token 
            string? key = configuration.GetValue<string>("JWT:Key");
            string? issuer = configuration.GetValue<string>("JWT:Issuer");
            string? audience = configuration.GetValue<string>("JWT:Audience");

            if (key == null || issuer == null || audience == null) return res.BadRequestResponse(Messages.Auth.ERRORTOKEN);

            var token = GenerateToken(user, new JwtSecrets
            {
                Key = key,
                Audience = audience,
                Issuer = issuer
            });
            //? end: generate token 
            return res.SuccessResponse(Messages.Auth.LOGINSUCESS, new { token });

        }

        private static string GenerateToken(User user, JwtSecrets secrets)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secrets.Key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>(){
            new Claim("Id", user.Id.ToString()),
        };
            var token = new JwtSecurityToken(
                secrets.Issuer,
                secrets.Audience,
                claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}