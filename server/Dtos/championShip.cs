namespace server.Dtos{
    public class ChampionshipDto
    {
        public string Name { get; set; }
        public int AmountTeams { get; set; }
        public string Type { get; set; }
        public DateOnly Datestart { get; set; }
        public DateOnly Dateend { get; set; }
  
    }
}