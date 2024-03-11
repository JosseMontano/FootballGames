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
    .min(10, "El teléfono móvil debe tener al menos 10 dígitos"),
  /*   photo: z.string().url("La foto debe ser una URL válida"), */
  age: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => val >= 0, "La edad debe ser un número positivo"),
  teamId: z.string().transform((val) => parseFloat(val))
  .refine((val) => val >= 0, "Seleccione una opcion"),
});
