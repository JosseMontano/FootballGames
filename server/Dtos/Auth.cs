namespace server.Dtos
{
    public class RegisterDTO
    {
        public required string Gmail { get; set; }
        public required string Password { get; set; }
        public required string ConfirmPassword { get; set; }
    }

    public class LoginDTO{
        public required string Gmail { get; set; }
        public required string Password { get; set; }
    }

}