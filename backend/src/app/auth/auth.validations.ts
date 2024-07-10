import { z } from 'zod';

export const loginSchema = z.object({
    gmail: z.string().min(1, "El campo gmail es requerido").email("Formato invalido del email"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const registerSchema = z.object({
    gmail: z.string().min(1, "El campo gmail es requerido").email("Formato invalido del email"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  }).refine(data => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"], // This will attach the error to the confirmPassword field
  });