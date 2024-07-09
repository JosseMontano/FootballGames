import { Router, Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
import { ResponseType } from "../../interfaces/response";

const router = Router();
const prisma = new PrismaClient();
const endpoint = "/championship/";

export type ChampeonshipTO = {
    name: string;
    amountteams: number;
    type: string;
    datestart: Date;
    dateend: Date;
};

router.get(endpoint, async (req: Request, res: Response) => {
    try {
        const champeonships = await prisma.championship.findMany({});

        const response: ResponseType = {
            message: "Campeonatos obtenidos",
            data: champeonships,
            status: 200,
        };
        //format  AAAA-MM-DD
        champeonships.forEach((champeonship) => {
            //@ts-ignore
            champeonship.datestart = champeonship.datestart.toISOString().split('T')[0];
            //@ts-ignore
            champeonship.dateend = champeonship.dateend.toISOString().split('T')[0];
        });
        res.json(response);
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: "Server error" + error.message });
    }
});

router.get(endpoint + ":id", async (req: Request, res: Response) => {
    try {
        const champeonshipId = parseInt(req.params.id);
        const champeonship = await prisma.championship.findUnique({
            where: { id: champeonshipId },
        });

        if (!champeonship)
            return res.status(404).json({ message: "No se encontro el campeonato" });

        const response: ResponseType = {
            message: "Campeonato obtenido",
            data: champeonship,
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
        const { name, amountteams, dateend, datestart, type } =
            req.body as ChampeonshipTO;

        if (!name) return res.status(400).json({ message: "Name is required" });

        const team = await prisma.team.findUnique({ where: { name } });

        if (team) return res.status(400).json({ message: "Campeonato ya existe" });

        const newChampeonship = await prisma.championship.create({
            data: { name, amountteams, dateend: new Date(dateend), datestart: new Date(datestart), type },
        });

        const response: ResponseType = {
            message: `Campeonato ${name} creado`,
            data: newChampeonship,
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
        const teamId = parseInt(req.params.id);
        const { name, amountteams, dateend, datestart, type } =
            req.body as ChampeonshipTO;

        if (!name) return res.status(400).json({ message: "Name is required" });

        const team = await prisma.championship.findUnique({
            where: { id: teamId },
        });

        if (!team) return res.status(404).json({ message: "No se encontro el campeonato" });

        const updatedChampeonship = await prisma.championship.update({
            where: { id: teamId },
            data: { name, amountteams, dateend: new Date(dateend), datestart: new Date(datestart), type },
        });

        const response: ResponseType = {
            message: `Campeonato ${name} actualizado`,
            data: updatedChampeonship,
            status: 200,
        };
        res.json(response);
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: "Server error" + error.message });
    }
});

router.delete(endpoint + ":id", async (req: Request, res: Response) => {
    try {
        const teamId = parseInt(req.params.id);
        const championship = await prisma.championship.findUnique({ where: { id: teamId } });

        if (!championship) return res.status(404).json({ message: "no se encontro el campeonato" });

        await prisma.championship.delete({ where: { id: teamId } });

        const response: ResponseType = {
            message: `Campeonato ${championship.name} eliminado`,
            data: championship,
            status: 200,
        };
        res.json(response);
    } catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ message: "Server error" + error.message });
    }
});

export default router;
