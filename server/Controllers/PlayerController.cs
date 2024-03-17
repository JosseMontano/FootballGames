
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Constants;
using server.Data;
using server.Dtos;
using server.Models;
using server.Utils;
// do the controller of the model player
namespace server.Controllers
{
    [ApiController]
    [Route("player")]
    public class PlayerController : ControllerBase
    {
        private readonly SoccerGameDbContext db;
        Response res = new();
        public PlayerController(SoccerGameDbContext _db)
        {
            db = _db;
        }
        [HttpGet]
        public IActionResult Get()
        {
            var players = db.Players.Include(v => v.Team).ToList();
            return res.SuccessResponse(Messages.Player.FOUND, players);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var player = db.Players.Include(v => v.Team).FirstOrDefault(v => v.Id == id);
            if (player == null) return res.NotFoundResponse(Messages.Player.NOTFOUND);
            return res.SuccessResponse(Messages.Player.FOUND, player);
        }

        [HttpGet("teamId/{id}")]
        public IActionResult GetTeam(int id)
        {
            var players = db.Players.Include(v => v.Team).Where(v => v.Teamid == id).ToList();
            if (players == null) return res.NotFoundResponse(Messages.Player.NOTFOUND);
            return res.SuccessResponse(Messages.Player.FOUND, players);
        }

        [HttpPost]
        public IActionResult Create(PlayerDto body)
        {

            DateOnly date = body.Date;
            int age = DateTime.Now.Year - date.Year;

            if (date > DateOnly.FromDateTime(DateTime.Today.AddYears(-age))) age--;

            Player player = new()
            {
                Ci = body.Ci,
                Names = body.Names,
                Lastnames = body.Lastnames,
                Age = age,
                Date = body.Date,
                Cellphone = body.Cellphone,
                Photo = body.Photo,
                Teamid = body.Teamid
            };

            db.Players.Add(player);
            db.SaveChanges();
            return res.SuccessResponse(Messages.Player.CREATED, player);
        }
        [HttpPut("{id}")]
        public IActionResult Update(int id, PlayerDto body)
        {
            var player = db.Players.Find(id);
            if (player == null) return res.NotFoundResponse(Messages.Player.NOTFOUND);

            DateOnly date = body.Date;
            int age = DateTime.Now.Year - date.Year;

            player.Ci = body.Ci;
            player.Names = body.Names;
            player.Lastnames = body.Lastnames;
            player.Age = age;
            player.Date = body.Date;
            player.Cellphone = body.Cellphone;
            player.Photo = body.Photo;
            player.Teamid = body.Teamid;
            db.SaveChanges();
            return res.SuccessResponse(Messages.Player.UPDATED, player);
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var player = db.Players.Find(id);
            if (player == null) return res.NotFoundResponse(Messages.Player.NOTFOUND);
            db.Players.Remove(player);
            db.SaveChanges();
            return res.SuccessResponse(Messages.Player.DELETED, player);
        }
    }

}