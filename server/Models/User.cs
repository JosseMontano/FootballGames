using System;
using System.Collections.Generic;

namespace server.Models;

public partial class User
{
    public int Id { get; set; }

    public string Gmail { get; set; } = null!;

    public string Password { get; set; } = null!;



}
