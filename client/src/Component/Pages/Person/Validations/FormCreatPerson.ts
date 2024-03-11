import { z } from "zod";

export const schemaCreatePerson = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  lastName: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  ci: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
});
