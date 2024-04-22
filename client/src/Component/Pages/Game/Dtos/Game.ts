export interface GameFormDto{
    localteamid: number;
    visitorteamid: number;
    champeonshipid: number;
    amountGoalsLocal?: number;
    amountGoalsVisitor?: number;
    date: string;
}

export interface GamesRandomFormDto{
    localteamid: number;
    visitorteamid: number;
    champeonshipid: number;
    amountGoalsLocal?: number;
    amountGoalsVisitor?: number;
    date: string;
}