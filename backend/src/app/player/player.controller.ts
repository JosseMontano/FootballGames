import { Router, Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
import { ResponseType } from "../../interfaces/response";

const router = Router();
const prisma = new PrismaClient();
const endpoint = "/player/";

export type PlayerDTO = {
    ci: string;
    names: string;
    lastnames: string;
    date: Date;
    cellphone: string;
    photo: string;
    teamid: number;
};

router.get(endpoint, async (req: Request, res: Response) => {
    try {
        const players = await prisma.player.findMany({
            include: {
                team: true
            }
        });

        const response: ResponseType = {
            message: "Jugadores obtenidos",
            data: players,
            status: 200,
        };

        res.json(response);
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: "Server error" + error.message });
    }
});

router.get(endpoint + ":id", async (req: Request, res: Response) => {
    try {
        const playerId = parseInt(req.params.id);
        const player = await prisma.player.findUnique({
            where: { id: playerId },
        });

        if (!player)
            return res.status(404).json({ message: "No se encontro el jugador" });

        const response: ResponseType = {
            message: "Jugador obtenido",
            data: player,
            status: 200,
        };
        res.json(response);
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: "Server error" + error.message });
    }
});

router.post(endpoint, async (req: Request, res: Response) => {
    try {
        const { names, cellphone, ci, date, lastnames, photo, teamid } =
            req.body as PlayerDTO;

        if (!names) return res.status(400).json({ message: "Name is required" });

        //calculate age
        const age = new Date().getFullYear() - new Date(date).getFullYear();

        const team = await prisma.player.findUnique({ where: { ci } });

        if (team) return res.status(400).json({ message: "ese jugar ya existe" });



        const newPlayer = await prisma.player.create({
            data: { names, age, cellphone, ci, date: new Date(date), lastnames, photo, teamId: Number(teamid) },
        });

        const response: ResponseType = {
            message: `Jugador ${names} creado`,
            data: newPlayer,
            status: 201,
        };
        res.json(response);
    } catch (error) {
        if (error instanceof Error) {
            console.log('error', error.message);
            return res.status(500).json({ message: "Server error" + error.message });
        }

    }
});

router.put(endpoint + ":id", async (req: Request, res: Response) => {
    try {
        const playerId = parseInt(req.params.id);
        const { cellphone, ci, date, lastnames, names, photo, teamid } =
            req.body as PlayerDTO;

        if (!names) return res.status(400).json({ message: "Name is required" });

        const team = await prisma.player.findUnique({
            where: { id: playerId },
        });

        if (!team) return res.status(404).json({ message: "No se encontro el jugador" });

        //calculate age
        const age = new Date().getFullYear() - new Date(date).getFullYear();

        const updatedPlayer = await prisma.player.update({
            where: { id: playerId },
            data: { names, age, cellphone, ci, date: new Date(date), lastnames, photo, teamId: Number(teamid) },
        });

        const response: ResponseType = {
            message: `Jugador ${names} actualizado`,
            data: updatedPlayer,
            status: 200,
        };
        res.json(response);
    } catch (error) {
        if (error instanceof Error) {
            console.log(error);
            return res.status(500).json({ message: "Server error" + error.message });
        }
    }
});

router.delete(endpoint + ":id", async (req: Request, res: Response) => {
    try {
        const playerId = parseInt(req.params.id);
        const player = await prisma.player.findUnique({ where: { id: playerId } });

        if (!player) return res.status(404).json({ message: "no se encontro el jugador" });

        await prisma.player.delete({ where: { id: playerId } });

        const response: ResponseType = {
            message: `Jugador ${player.names} eliminado`,
            data: player,
            status: 200,
        };
        res.json(response);
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: "Server error" + error.message });
    }
});

export default router;
