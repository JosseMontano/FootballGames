using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class rename_name_divisions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DivisionID",
                table: "teams",
                newName: "divisionid");

            migrationBuilder.RenameIndex(
                name: "IX_teams_DivisionID",
                table: "teams",
                newName: "IX_teams_divisionid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "divisionid",
                table: "teams",
                newName: "DivisionID");

            migrationBuilder.RenameIndex(
                name: "IX_teams_divisionid",
                table: "teams",
                newName: "IX_teams_DivisionID");
        }
    }
}
