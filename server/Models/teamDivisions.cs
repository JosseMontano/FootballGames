using System;
using System.Collections.Generic;

namespace server.Models;

public partial class TeamDivision
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<Team> Teams { get; set; } = new List<Team>();
}
