using Microsoft.AspNetCore.Mvc;
using server.Constants;
using server.Utils;
using server.Dtos;
using server.Models;


namespace server.Controllers
{
    [ApiController]
    [Route("championship")]
    public class ChampionshipController : ControllerBase
    {
        private readonly SoccerGameDbContext db;
        Response res = new();

        public ChampionshipController(SoccerGameDbContext _db)
        {
            db = _db;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var Champeonships = db.Champeonships;
            return res.SuccessResponse(Messages.Championship.FOUND, Champeonships);
        }

        [HttpPost]
        public IActionResult Create(ChampionshipDto body)
        {
            Champeonship championship = new()
            {
                Name = body.Name,
                Amountteams = body.AmountTeams,
                Type = body.Type,
                Datestart = body.Datestart,
                Dateend = body.Dateend
            };

            db.Champeonships.Add(championship);
            db.SaveChanges();
            return res.SuccessResponse(Messages.Championship.CREATED, body);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, ChampionshipDto body)
        {
            var championship = db.Champeonships.Find(id);
            if (championship == null) return res.NotFoundResponse(Messages.Championship.NOTFOUND);
            championship.Name = body.Name;
            championship.Amountteams = body.AmountTeams;
            championship.Type = body.Type;
            championship.Datestart = body.Datestart;
            championship.Dateend = body.Dateend;
            db.SaveChanges();
            return res.SuccessResponse(Messages.Championship.UPDATED, championship);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var championship = db.Champeonships.Find(id);
            if (championship == null) return res.NotFoundResponse(Messages.Championship.NOTFOUND);
            db.Champeonships.Remove(championship);
            db.SaveChanges();
            return res.SuccessResponse(Messages.Championship.DELETED, championship);
        }
    }
}