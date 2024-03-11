using System;
using System.Collections.Generic;

namespace server.Models;

public partial class Champeonship
{
    public int Id { get; set; }

    public int? Playerid { get; set; }

    public string Name { get; set; } = null!;

    public int Amountteams { get; set; }

    public string Type { get; set; } = null!;

    public DateOnly Datestart { get; set; }

    public DateOnly Dateend { get; set; }

    public virtual ICollection<Game> Games { get; set; } = new List<Game>();

    public virtual Player? Player { get; set; }
}
