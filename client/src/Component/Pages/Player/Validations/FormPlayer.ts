import { z } from "zod";

export const PlayerFormSchema = z.object({
  ci: z.string().min(3, "La CI debe tener al menos 3 caracteres"),
  names: z.string().min(3, "Los nombres deben tener al menos 3 caracteres"),
  lastnames: z
    .string()
    .min(3, "Los apellidos deben tener al menos 3 caracteres"),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "La fecha debe estar en formato AAAA-MM-DD"),
  cellphone: z
    .string()
    .min(8, "El teléfono móvil debe tener al menos 8 dígitos"),
  /*   photo: z.string().url("La foto debe ser una URL válida"), */
  teamid: z.number().or(z.string()),
});
