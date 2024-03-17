using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Constants;
using server.Data;
using server.Dtos;
using server.Models;
using server.Utils;
using System.Collections.Generic;
using System.Linq;

namespace server.Controllers
{
    [Route("api/[controller]")]
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
            var games = db.Games.Include(v => v.Localteam).Include(v => v.Visitorteam).ToList();
            return res.SuccessResponse(Messages.Game.FOUND, games);
        }

        // GET: api/Game/5
        [HttpGet("{id}")]
        public IActionResult GetGame(int id)
        {
            var game = db.Games.Include(v => v.Localteam).Include(v => v.Visitorteam).FirstOrDefault(v => v.Id == id);
            if (game == null) return res.NotFoundResponse(Messages.Game.NOTFOUND);
            return res.SuccessResponse(Messages.Player.FOUND, game);
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