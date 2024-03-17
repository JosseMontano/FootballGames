import { z } from "zod";

export const ChampeonFormSchema = z.object({
  name: z.string().min(3, "Los nombres deben tener al menos 3 caracteres"),
  amountteams: z.string().min(0, "El numero de equipos debe ser mayor a 0"),
  type: z.string().min(3, "El tipo debe tener al menos 3 caracteres"),
  datestart: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "La fecha debe estar en formato AAAA-MM-DD"),
  dateend: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "La fecha debe estar en formato AAAA-MM-DD"),
});
