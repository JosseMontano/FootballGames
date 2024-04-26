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
            var games = db.Games.Include(v => v.Localteam).Include(v => v.Visitorteam).Include(v => v.Champeonship).OrderBy(v => v.Id).ToList();
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

        [HttpGet("GamesWithoutChampeonship/{champeonshipId}")]
        public IActionResult GetGameByChampeon(int champeonshipId)
        {
            int id = champeonshipId;
            var allgamesLocalTeamId = db.Games.Where(v => v.Champeonshipid == id).Select(v => v.Localteamid).ToList();
            var allgamesVisitorTeamId = db.Games.Where(v => v.Champeonshipid == id).Select(v => v.Visitorteamid).ToList();
            var allgamesId = allgamesLocalTeamId.Concat(allgamesVisitorTeamId).ToList();

            //teams don't have a champeonship
            var teams = db.Teams.Where(t => !allgamesId.Contains(t.Id)).ToList();

            if (teams == null) return res.NotFoundResponse(Messages.Game.NOTFOUND);
            return res.SuccessResponse(Messages.Player.FOUND, teams);
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

        // POST: api/Game
        [HttpPost("Register-random-game")]
        public IActionResult RegisterRandomGame(GamesRandomsDto body)
        {
            var teams = db.Teams.Include(v => v.Division).Where(v=>v.DivisionId == body.Divisionid).ToList();

            // Shuffle teams
            Random rng = new Random();
            int n = teams.Count;
            while (n > 1)
            {
                n--;
                int k = rng.Next(n + 1);
                var value = teams[k];
                teams[k] = teams[n];
                teams[n] = value;
            }

            var champeonShip = db.Champeonships.Find(body.Champeonshipid);

            if (champeonShip == null) return res.NotFoundResponse(Messages.Championship.NOTFOUND);

            var excludeTeamsId = new List<int>();

            var dateEachGame = champeonShip.Datestart;

            List<Game> games = new();

            var gamesDB = db.Games.ToList();

            int amountTeamsRegistered = db.Games.Where(v => v.Champeonshipid == body.Champeonshipid).Count();

            if(amountTeamsRegistered > 0){
                amountTeamsRegistered = amountTeamsRegistered*2;
            }

            bool createNewData = false;

            for (int i = 0; i < teams.Count(); i++)
            {

                var localTeam = teams[i];

                if (amountTeamsRegistered >= champeonShip.Amountteams) break;

                createNewData=true;

                int numerTeamsToDivision = teams.Count(v => v.Division.Name == localTeam.Division.Name);

                bool isEven = numerTeamsToDivision % 2 == 0;

                if (!isEven) continue;

                if (excludeTeamsId.Contains(localTeam.Id)) continue;

                for (int j = 0; j < teams.Count(); j++)
                {
                    var visitorTeam = teams[j];

                    if (amountTeamsRegistered >= champeonShip.Amountteams) break;

                    if (localTeam.Id == visitorTeam.Id) continue;
                    if (excludeTeamsId.Contains(visitorTeam.Id)) continue;
                    if (localTeam.Division.Name != visitorTeam.Division.Name) continue;


                    excludeTeamsId.Add(localTeam.Id);
                    excludeTeamsId.Add(visitorTeam.Id);

                    Game game = new()
                    {
                        Champeonshipid = body.Champeonshipid,
                        Date = dateEachGame,
                        Localteamid = localTeam.Id,
                        Visitorteamid = visitorTeam.Id
                    };

                    dateEachGame = dateEachGame.AddDays(1);

                    db.Games.Add(game);

                    games.Add(game);

                    amountTeamsRegistered += 2;

                    break;

                }
                db.SaveChanges();
            }

            if(!createNewData) return res.BadRequestResponse(Messages.Game.LIMITTEAMS);
            
            return res.SuccessResponse(Messages.Game.CREATED, games);
        }


        // PUT: api/Game/5
        [HttpPut("{id}")]
        public IActionResult PutGame(int id, GamePutDto body)
        {
            var game = db.Games.Find(id);
            if (game == null) return res.NotFoundResponse(Messages.Game.NOTFOUND);

            game.Champeonshipid = body.Champeonshipid;
            game.Date = body.Date;
            game.Localteamid = game.Localteamid;
            game.Visitorteamid = game.Visitorteamid;
            game.AmountGoalsVisitor = body.AmountGoalsVisitor;
            game.AmountGoalsLocal = body.AmountGoalsLocal;

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