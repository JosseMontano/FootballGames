import { z } from "zod";

export interface GameFormDto {
  localteamid: number;
  visitorteamid: number;
  champeonshipid: number;
  date: string;
}

export const GameFormDtoSchema = z.object({
  localteamid: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => val >= 0, "Seleccione una opcion"),
  visitorteamid: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => val >= 0, "Seleccione una opcion"),
  champeonshipid: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => val >= 0, "Seleccione una opcion"),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "La fecha debe estar en formato AAAA-MM-DD"),
});
