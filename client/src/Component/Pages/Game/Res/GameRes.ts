import { ChampeonRes } from "../../Champeonship/Res/ChampeonRes";
import { TeamResType } from "../../Team/Res/TeamRes";

export interface GameRes {
  id: number;
  localteamid: number;
  visitorteamid: number;
  champeonshipid: number;
  date: string;
  amountGoalsLocal?: number;
  amountGoalsVisitor?: number;
  champeonship: ChampeonRes;
  localteam: TeamResType;
  visitorteam: TeamResType;
}
