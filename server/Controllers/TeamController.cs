using Microsoft.AspNetCore.Mvc;
using server.Constants;
using server.Utils;
using server.Dtos;
using server.Models;

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
            var teams = db.Teams;
            return res.SuccessResponse(Messages.Team.FOUND, teams);
        }

        [HttpPost]
        public IActionResult Create(TeamDto body)
        {
            Team team = new()
            {
                Name = body.Name
            };

            db.Teams.Add(team);
            db.SaveChanges();
            return res.SuccessResponse(Messages.Team.CREATED, body);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, TeamDto body)
        {
            var team = db.Teams.Find(id);
            if (team == null) return res.NotFoundResponse(Messages.Team.NOTFOUND);
            team.Name = body.Name;
            db.SaveChanges();
            return res.SuccessResponse(Messages.Team.UPDATED, team);
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