using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class Adddivisions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DivisionID",
                table: "teams",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "teamdivisions",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("teamdivisions_pkey", x => x.id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_teams_DivisionID",
                table: "teams",
                column: "DivisionID");

            migrationBuilder.AddForeignKey(
                name: "teams_divisionid_fkey",
                table: "teams",
                column: "DivisionID",
                principalTable: "teamdivisions",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "teams_divisionid_fkey",
                table: "teams");

            migrationBuilder.DropTable(
                name: "teamdivisions");

            migrationBuilder.DropIndex(
                name: "IX_teams_DivisionID",
                table: "teams");

            migrationBuilder.DropColumn(
                name: "DivisionID",
                table: "teams");
        }
    }
}
