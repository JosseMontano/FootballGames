import { Request, Response, Router } from "express";
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { compareHashedString, hashedString } from "../../helpers/hashedString";
import { config } from "../../config";
import { AuthDTO } from "./auth.dto";
import { ResponseType } from "../../interfaces/response";

const prisma = new PrismaClient();

const router = Router();

const endpoint = "/auth/";

router.post(endpoint + 'register', async (req: Request, res: Response) => {
    const { gmail, password, confirmPassword } = req.body as AuthDTO;

    try {
        const user = await prisma.user.findUnique({ where: { gmail: gmail } });

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
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
        res.json(response);
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: "Server error" + error.message });
    }
}
)


router.post(endpoint + 'login', async (req: Request, res: Response) => {
    const { gmail, password } = req.body as AuthDTO;

    try {
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
            message: "Login successful",
            data: {
                token
            },
            status: 200
        }
        res.json(response);
    } catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: "Server error" + error.message });
    }
});

export default router;