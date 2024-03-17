import { ChampeonRes } from "../Res/ChampeonRes";

export interface ChampeonFormDto extends Omit<ChampeonRes, "id" | "games"> {}
