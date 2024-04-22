using System;
using System.Collections.Generic;

namespace server.Models;

public partial class Team
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;
    public required int DivisionId { get; set; }
    public virtual TeamDivision? Division { get; set; }

    public virtual ICollection<Game> GameLocalteams { get; set; } = new List<Game>();

    public virtual ICollection<Game> GameVisitorteams { get; set; } = new List<Game>();

    public virtual ICollection<Player> Players { get; set; } = new List<Player>();
}
