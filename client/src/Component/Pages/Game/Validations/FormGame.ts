import { z } from "zod";

export interface GameFormDto {
  localteamid: number;
  visitorteamid: number;
  champeonshipid: number;
  date: string;
}

export const GameFormDtoSchema = z.object({
  localteamid: z.number().or(z.string()),
  visitorteamid: z.number().or(z.string()),
  champeonshipid: z.number().or(z.string()),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "La fecha debe estar en formato AAAA-MM-DD"),
  amountGoalsLocal: z.string().or(z.number()).nullable().optional(),
  amountGoalsVisitor: z.string().or(z.number()).nullable().optional(),
});
