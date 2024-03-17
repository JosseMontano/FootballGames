using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class DeletePlayerIdOfChampeonship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "teams",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("teams_pkey", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Gmail = table.Column<string>(type: "text", nullable: false),
                    Password = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "players",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ci = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    names = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    lastnames = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    age = table.Column<int>(type: "integer", nullable: false),
                    date = table.Column<DateOnly>(type: "date", nullable: false),
                    cellphone = table.Column<string>(type: "character varying(15)", maxLength: 15, nullable: true),
                    photo = table.Column<string>(type: "text", nullable: true),
                    teamid = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("players_pkey", x => x.id);
                    table.ForeignKey(
                        name: "players_teamid_fkey",
                        column: x => x.teamid,
                        principalTable: "teams",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "champeonships",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    amountteams = table.Column<int>(type: "integer", nullable: false),
                    type = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    datestart = table.Column<DateOnly>(type: "date", nullable: false),
                    dateend = table.Column<DateOnly>(type: "date", nullable: false),
                    PlayerId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("champeonships_pkey", x => x.id);
                    table.ForeignKey(
                        name: "FK_champeonships_players_PlayerId",
                        column: x => x.PlayerId,
                        principalTable: "players",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "games",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    localteamid = table.Column<int>(type: "integer", nullable: true),
                    visitorteamid = table.Column<int>(type: "integer", nullable: true),
                    champeonshipid = table.Column<int>(type: "integer", nullable: true),
                    date = table.Column<DateOnly>(type: "date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("games_pkey", x => x.id);
                    table.ForeignKey(
                        name: "games_champeonshipid_fkey",
                        column: x => x.champeonshipid,
                        principalTable: "champeonships",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "games_localteamid_fkey",
                        column: x => x.localteamid,
                        principalTable: "teams",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "games_visitorteamid_fkey",
                        column: x => x.visitorteamid,
                        principalTable: "teams",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_champeonships_PlayerId",
                table: "champeonships",
                column: "PlayerId");

            migrationBuilder.CreateIndex(
                name: "IX_games_champeonshipid",
                table: "games",
                column: "champeonshipid");

            migrationBuilder.CreateIndex(
                name: "IX_games_localteamid",
                table: "games",
                column: "localteamid");

            migrationBuilder.CreateIndex(
                name: "IX_games_visitorteamid",
                table: "games",
                column: "visitorteamid");

            migrationBuilder.CreateIndex(
                name: "IX_players_teamid",
                table: "players",
                column: "teamid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "games");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "champeonships");

            migrationBuilder.DropTable(
                name: "players");

            migrationBuilder.DropTable(
                name: "teams");
        }
    }
}
