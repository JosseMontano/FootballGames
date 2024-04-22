using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace server.Models;

public partial class SoccerGameDbContext : DbContext
{
    public SoccerGameDbContext()
    {
    }

    public SoccerGameDbContext(DbContextOptions<SoccerGameDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Champeonship> Champeonships { get; set; }

    public virtual DbSet<Game> Games { get; set; }

    public virtual DbSet<Player> Players { get; set; }
    public virtual DbSet<TeamDivision> TeamDivisions { get; set; }

    public virtual DbSet<Team> Teams { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)

        => optionsBuilder.UseNpgsql("Server=localhost;Port=5532;Database=SoccerGameDB;User Id=postgres;Password=admin");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Champeonship>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("champeonships_pkey");

            entity.ToTable("champeonships");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Amountteams).HasColumnName("amountteams");
            entity.Property(e => e.Dateend).HasColumnName("dateend");
            entity.Property(e => e.Datestart).HasColumnName("datestart");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasColumnName("name");
            entity.Property(e => e.Type)
                .HasMaxLength(50)
                .HasColumnName("type");


        });

        modelBuilder.Entity<Game>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("games_pkey");

            entity.ToTable("games");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Champeonshipid).HasColumnName("champeonshipid");
            entity.Property(e => e.Date).HasColumnName("date");
            entity.Property(e => e.Localteamid).HasColumnName("localteamid");
            entity.Property(e => e.Visitorteamid).HasColumnName("visitorteamid");

            entity.HasOne(d => d.Champeonship).WithMany(p => p.Games)
                .HasForeignKey(d => d.Champeonshipid)
                .HasConstraintName("games_champeonshipid_fkey");

            entity.HasOne(d => d.Localteam).WithMany(p => p.GameLocalteams)
                .HasForeignKey(d => d.Localteamid)
                .HasConstraintName("games_localteamid_fkey");

            entity.HasOne(d => d.Visitorteam).WithMany(p => p.GameVisitorteams)
                .HasForeignKey(d => d.Visitorteamid)
                .HasConstraintName("games_visitorteamid_fkey");
        });

        modelBuilder.Entity<Player>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("players_pkey");

            entity.ToTable("players");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Age).HasColumnName("age");
            entity.Property(e => e.Cellphone)
                .HasMaxLength(15)
                .HasColumnName("cellphone");
            entity.Property(e => e.Ci)
                .HasMaxLength(50)
                .HasColumnName("ci");
            entity.Property(e => e.Date).HasColumnName("date");
            entity.Property(e => e.Lastnames)
                .HasMaxLength(50)
                .HasColumnName("lastnames");
            entity.Property(e => e.Names)
                .HasMaxLength(50)
                .HasColumnName("names");
            entity.Property(e => e.Photo).HasColumnName("photo");
            entity.Property(e => e.Teamid).HasColumnName("teamid");

            entity.HasOne(d => d.Team).WithMany(p => p.Players)
                .HasForeignKey(d => d.Teamid)
                .HasConstraintName("players_teamid_fkey");
        });

        modelBuilder.Entity<Team>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("teams_pkey");

            entity.ToTable("teams");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasColumnName("name");

            entity.Property(e => e.DivisionId).HasColumnName("divisionid");
        });

        modelBuilder.Entity<TeamDivision>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("teamdivisions_pkey");

            entity.ToTable("teamdivisions");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasColumnName("name");

            entity.HasMany(d => d.Teams).WithOne(p => p.Division)
            .HasForeignKey(d => d.DivisionId)
            .HasConstraintName("teams_divisionid_fkey");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
