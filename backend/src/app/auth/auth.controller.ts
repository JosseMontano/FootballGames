import { Request, Response, Router } from "express";
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { compareHashedString, hashedString } from "../../helpers/hashedString";
import { config } from "../../config";
import { AuthDTO } from "./auth.dto";
import { ResponseType } from "../../interfaces/response";
import { loginSchema, registerSchema } from "./auth.validations";
import { z } from "zod";


const prisma = new PrismaClient();

const router = Router();

const endpoint = "/auth/";

router.post(endpoint + 'register', async (req: Request, res: Response) => {
    const { gmail, password } = req.body as AuthDTO;

    try {
        registerSchema.parse(req.body);
        const user = await prisma.user.findUnique({ where: { gmail: gmail } });

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = hashedString(password);

        const newUser = await prisma.user.create({ data: { gmail: gmail, password: hashedPassword } });

        const token = jwt.sign({ id: newUser.id }, config.tokenSecret, { expiresIn: '1h' });

        const response: ResponseType = {
            message: "User created successfully",
            data: {
                token
            },
            status: 201
        }
       return res.json(response);
    } catch (e) {
        if (e instanceof z.ZodError) {
            const errors = e.errors.map(err => err.message); // Extract error messages
            return res.status(400).send({ errors });
        }
        if (e instanceof Error) {
            console.log(e.message);
            return res.status(500).json({ message: "Error del servidor" + e.message });
        }
    }
}
)


router.post(endpoint + 'login', async (req: Request, res: Response) => {
    const { gmail, password } = req.body as AuthDTO;

    try {
        loginSchema.parse(req.body);

        const user = await prisma.user.findUnique({ where: { gmail: gmail } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = compareHashedString(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id }, config.tokenSecret, { expiresIn: '1h' });
        const response: ResponseType = {
            message: "Login exitoso!",
            data: {
                token
            },
            status: 200
        }
        return res.json(response);
    } catch (e) {
        if (e instanceof z.ZodError) {
            const errors = e.errors.map(err => err.message); // Extract error messages
            return res.status(400).send({ errors });
        }
        if (e instanceof Error) {
            console.log(e.message);
            return res.status(500).json({ message: "Error del servidor" + e.message });
        }

    }
});

export default router;