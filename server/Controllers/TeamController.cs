using Microsoft.AspNetCore.Mvc;
using server.Constants;
using server.Utils;
using server.Dtos;
using server.Models;
using Microsoft.EntityFrameworkCore;

namespace server.Controllers
{
    [ApiController]
    [Route("team")]
    public class TeamController : ControllerBase

    {
        private readonly SoccerGameDbContext db;
        Response res = new();

        public TeamController(SoccerGameDbContext _db)
        {
            db = _db;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var teams = db.Teams.Include(t => t.Division).ToList();
            return res.SuccessResponse(Messages.Team.FOUND, teams);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var team = db.Teams.Include(t=>t.Division).Where(v=>v.Id==id);
            if (team == null) return res.NotFoundResponse(Messages.Team.NOTFOUND);
            return res.SuccessResponse(Messages.Team.FOUND, team);
        }

        [HttpPost]
        public IActionResult Create(TeamDto body)
        {
            var division = db.TeamDivisions.Find(body.DivisionId);
            if (division == null) return res.NotFoundResponse(Messages.Divisions.NOTFOUND);
            Team team = new()
            {
                Name = body.Name,
                DivisionId = body.DivisionId,
                Division = division
            };

            db.Teams.Add(team);
            db.SaveChanges();
            return res.SuccessResponse(Messages.Team.CREATED, team);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, TeamDto body)
        {
            var updateDivision = db.Teams.Find(id);
            if (updateDivision == null) return res.NotFoundResponse(Messages.Team.NOTFOUND);

            var division = db.TeamDivisions.Find(body.DivisionId);
            if (division == null) return res.NotFoundResponse(Messages.Divisions.NOTFOUND);

            updateDivision.Name = body.Name;
            updateDivision.DivisionId = body.DivisionId;
            updateDivision.Division = division;

            db.SaveChanges();
            return res.SuccessResponse(Messages.Team.UPDATED, updateDivision);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var team = db.Teams.Find(id);
            if (team == null) return res.NotFoundResponse(Messages.Team.NOTFOUND);
            db.Teams.Remove(team);
            db.SaveChanges();
            return res.SuccessResponse(Messages.Team.DELETED, team);
        }

    }

}