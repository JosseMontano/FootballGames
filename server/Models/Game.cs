﻿

namespace server.Models;

public partial class Game
{
    public int Id { get; set; }

    public int? Localteamid { get; set; }

    public int? Visitorteamid { get; set; }
    public int? Champeonshipid { get; set; }

    public DateOnly Date { get; set; }
    public int? AmountGoalsLocal { get; set; } = null;
    public int? AmountGoalsVisitor { get; set; }= null;

    public virtual Champeonship? Champeonship { get; set; }

    public virtual Team? Localteam { get; set; }

    public virtual Team? Visitorteam { get; set; }
}
