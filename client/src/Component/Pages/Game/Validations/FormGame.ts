import { z } from "zod";

export interface GameFormDto {
  localteamid: number;
  visitorteamid: number;
  champeonshipid: number;
  date: string;
}

export const GameFormDtoSchema = z.object({
  champeonshipid: z.number().or(z.string()),
});
