using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Constants;
using server.Dtos;
using server.Models;
using server.Utils;
using System.Collections.Generic;
using System.Linq;

namespace server.Controllers
{
    [Route("game")]
    [ApiController]
    public class GameController : ControllerBase
    {
        private readonly SoccerGameDbContext db;

        Response res = new();

        public GameController(SoccerGameDbContext _dbContext)
        {
            db = _dbContext;
        }

        // GET: api/Game
        [HttpGet]
        public IActionResult GetGames()
        {
            var games = db.Games.Include(v => v.Localteam).Include(v => v.Visitorteam).Include(v => v.Champeonship).ToList();
            return res.SuccessResponse(Messages.Game.FOUND, games);
        }

        // GET: api/Game/5
        [HttpGet("{id}")]
        public IActionResult GetGame(int id)
        {
            var game = db.Games.Include(v => v.Localteam).Include(v => v.Visitorteam).Include(v => v.Champeonship).FirstOrDefault(v => v.Id == id);
            if (game == null) return res.NotFoundResponse(Messages.Game.NOTFOUND);
            return res.SuccessResponse(Messages.Player.FOUND, game);
        }

        // Get by past date
        [HttpGet("past-date")]
        public IActionResult GetPastGames()
        {
            var games = db.Games
                .Include(v => v.Localteam)
                .Include(v => v.Visitorteam)
                .Include(v => v.Champeonship)
                .Where(v => v.Champeonship!.Dateend < DateOnly.FromDateTime(DateTime.Now))
                .ToList();

            return res.SuccessResponse(Messages.Game.FOUND, games);
        }

        
        // Get by future date
        [HttpGet("future-date")]
        public IActionResult GetFutureGames()
        {
            var games = db.Games
                .Include(v => v.Localteam)
                .Include(v => v.Visitorteam)
                .Include(v => v.Champeonship)
                .Where(v => v.Champeonship!.Dateend > DateOnly.FromDateTime(DateTime.Now))
                .ToList();

            return res.SuccessResponse(Messages.Game.FOUND, games);
        }

        // POST: api/Game
        [HttpPost]
        public IActionResult PostGame(GameDto body)
        {
            Game game = new()
            {
                Champeonshipid = body.Champeonshipid,
                Date = body.Date,
                Localteamid = body.Localteamid,
                Visitorteamid = body.Visitorteamid

            };

            db.Games.Add(game);
            db.SaveChanges();
            return res.SuccessResponse(Messages.Game.CREATED, game);
        }

        // PUT: api/Game/5
        [HttpPut("{id}")]
        public IActionResult PutGame(int id, GameDto body)
        {
            var game = db.Games.Find(id);
            if (game == null) return res.NotFoundResponse(Messages.Game.NOTFOUND);

            game.Champeonshipid = body.Champeonshipid;
            game.Date = body.Date;
            game.Localteamid = body.Localteamid;
            game.Visitorteamid = body.Visitorteamid;

            db.SaveChanges();
            return res.SuccessResponse(Messages.Game.UPDATED, game);
        }

        // DELETE: api/Game/5
        [HttpDelete("{id}")]
        public IActionResult DeleteGame(int id)
        {
            var game = db.Games.Find(id);
            if (game == null) return res.NotFoundResponse(Messages.Game.NOTFOUND);
            db.Games.Remove(game);
            db.SaveChanges();
            return res.SuccessResponse(Messages.Game.DELETED, game);
        }
    }
}