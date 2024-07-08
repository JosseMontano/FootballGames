import { Request, Response, Router } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const router = Router();

router.post('/auth/register', async (req: Request, res: Response) => {
    const { gmail, password, confirmPassword } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { Gmail: gmail } });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = await prisma.user.create({ data: { Gmail: gmail, Password: hashedPassword } });
        const token = jwt.sign({ id: newUser.Id }, 'your_secret_key', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: "Server error" + error.message });
    }
}
)


router.post('/auth/login', async (req: Request, res: Response) => {
    const { gmail, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { Gmail: gmail } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = bcrypt.compareSync(password, user.Password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.Id }, 'your_secret_key', { expiresIn: '1h' });
        const response = {
            message: "Login successful",
            data:{
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