import { z } from "zod";

export const TeamFormSchema = z.object({
  name: z.string().min(3, "Los nombres deben tener al menos 3 caracteres"),
  divisionId: z.number().or(z.string()),
});
