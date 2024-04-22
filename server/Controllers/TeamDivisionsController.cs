using Microsoft.AspNetCore.Mvc;
using server.Constants;
using server.Utils;
using server.Dtos;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("teamDivisions")]
    public class TeamDivisionsController : ControllerBase

    {
        private readonly SoccerGameDbContext db;
        Response res = new();

        public TeamDivisionsController(SoccerGameDbContext _db)
        {
            db = _db;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var divisions = db.TeamDivisions;
            return res.SuccessResponse(Messages.Divisions.FOUND, divisions);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var division = db.TeamDivisions.Find(id);
            if (division == null) return res.NotFoundResponse(Messages.Divisions.NOTFOUND);
            return res.SuccessResponse(Messages.Divisions.FOUND, division);
        }

        [HttpPost]
        public IActionResult Create(DivisionDto body)
        {
           TeamDivision newDivision = new()
            {
                Name = body.Name,
            };

            db.TeamDivisions.Add(newDivision);
            db.SaveChanges();
            return res.SuccessResponse(Messages.Divisions.CREATED, newDivision);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, DivisionDto body)
        {
            var division = db.TeamDivisions.Find(id);
            if (division == null) return res.NotFoundResponse(Messages.Divisions.NOTFOUND);
            division.Name = body.Name;
            db.SaveChanges();
            return res.SuccessResponse(Messages.Divisions.UPDATED, division);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var division = db.TeamDivisions.Find(id);
            if (division == null) return res.NotFoundResponse(Messages.Divisions.NOTFOUND);
            db.TeamDivisions.Remove(division);
            db.SaveChanges();
            return res.SuccessResponse(Messages.Divisions.DELETED, division);
        }
    }

}