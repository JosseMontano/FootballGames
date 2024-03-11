namespace server.Dtos;

public class PlayerDto
{
    public required string Ci { get; set; }
    public required string Names { get; set; }
    public required string Lastnames { get; set; }
    public required DateOnly Date { get; set; }
    public required string Cellphone { get; set; }
    public required string Photo { get; set; }

    public required int Age { get; set; }

    public required int TeamId { get; set; }

}