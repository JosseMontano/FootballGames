using System;
using System.Collections.Generic;

namespace server.Models;

public partial class Player
{
    public int Id { get; set; }

    public string Ci { get; set; } = null!;

    public string Names { get; set; } = null!;

    public string Lastnames { get; set; } = null!;

    public int Age { get; set; }

    public DateOnly Date { get; set; }

    public string? Cellphone { get; set; }

    public string? Photo { get; set; }

    public int? Teamid { get; set; }

    public virtual ICollection<Champeonship> Champeonships { get; set; } = new List<Champeonship>();

    public virtual Team? Team { get; set; }
}
