

namespace server.Dtos;

public partial class GameDto
{

    public int? Localteamid { get; set; }

    public int? Visitorteamid { get; set; }

    public int? Champeonshipid { get; set; }
    public int? AmountGoalsLocal { get; set; } = null;
    public int? AmountGoalsVisitor { get; set; } = null;

    public DateOnly Date { get; set; }

}
