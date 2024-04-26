

using System.ComponentModel.DataAnnotations;

namespace server.Dtos;

public partial class GameDto
{
    [Required]
    public int? Localteamid { get; set; }
    [Required]

    public int? Visitorteamid { get; set; }
    [Required]

    public int? Champeonshipid { get; set; }

    public int? AmountGoalsLocal { get; set; } = null;
    public int? AmountGoalsVisitor { get; set; } = null;
    [Required]
    public DateOnly Date { get; set; }

}


public partial class GamePutDto
{
    [Required]
    public int? Champeonshipid { get; set; }

    public int? AmountGoalsLocal { get; set; } = null;
    public int? AmountGoalsVisitor { get; set; } = null;
    [Required]
    public DateOnly Date { get; set; }

}


public partial class GamesRandomsDto
{
    public int? Champeonshipid { get; set; }
    public int? Divisionid { get; set; }


}

