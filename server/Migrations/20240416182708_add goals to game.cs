using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class addgoalstogame : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AmountGoalsLocal",
                table: "games",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AmountGoalsVisitor",
                table: "games",
                type: "integer",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AmountGoalsLocal",
                table: "games");

            migrationBuilder.DropColumn(
                name: "AmountGoalsVisitor",
                table: "games");
        }
    }
}
