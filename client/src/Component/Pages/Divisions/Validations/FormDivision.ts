import { z } from "zod";

export const DivisionFormDtoSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres')

});
