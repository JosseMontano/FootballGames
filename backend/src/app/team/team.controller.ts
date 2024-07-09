import {Router, Response, Request} from "express"
import { PrismaClient } from '@prisma/client';
import { ResponseType } from "../../interfaces/response";

const router = Router();
const prisma = new PrismaClient();
const endpoint = "/team/";

export type TeamDTO = {
    name: string;
}

router.get(endpoint, async (req: Request, res: Response) => {
    try {

        const teams = await prisma.team.findMany();
    
        const response:ResponseType = {
            message: "Teams retrieved",
            data: teams,
            status: 200
        }
        res.json(response);
        
    } catch (error) {
        if(error instanceof Error)
            return res.status(500).json({message: "Server error" + error.message});
    }
})

router.get(endpoint + ":id", async (req: Request, res: Response) => {
    try {
        const teamId = parseInt(req.params.id);
        const team = await prisma.team.findUnique({where: {id: teamId}});

        if(!team)
            return res.status(404).json({message: "Team not found"});

        const response:ResponseType = {
            message: "Team retrieved",
            data: team,
            status: 200
        }
        res.json(response);

    } catch (error) {
        if(error instanceof Error)
            return res.status(500).json({message: "Server error" + error.message});
    }
})

router.post(endpoint, async (req: Request, res: Response) => {
    try {
        const {name} = req.body as TeamDTO;

        if(!name)
            return res.status(400).json({message: "Name is required"});
    
        const team = await prisma.team.findUnique({where: {name}});
    
        if(team)
            return res.status(400).json({message: "Team already exists"});
    
        const newTeam = await prisma.team.create({data: {name}});
    
        const response:ResponseType={
            message: `Team ${name} created`,
            data: newTeam,
            status: 201
        }
        res.json(response);
    } catch (error) {
        if(error instanceof Error)
            return res.status(500).json({message: "Server error" + error.message});
    }

    res.json({message: `Team ${name} created`});
})

router.put(endpoint + ":id", async (req: Request, res: Response) => {
    try {
        const teamId = parseInt(req.params.id);
        const {name} = req.body as TeamDTO;

        if(!name)
            return res.status(400).json({message: "Name is required"});
    
        const team = await prisma.team.findUnique({where: {id: teamId}});
    
        if(!team)
            return res.status(404).json({message: "Team not found"});
    
        const updatedTeam = await prisma.team.update({where: {id: teamId}, data: {name: name}});
    
        const response:ResponseType={
            message: `Team ${name} updated`,
            data: updatedTeam,
            status: 200
        }
        res.json(response);
    } catch (error) {
        if(error instanceof Error)
            return res.status(500).json({message: "Server error" + error.message});
    }
})

router.delete(endpoint + ":id", async (req: Request, res: Response) => {
    try {
        const teamId = parseInt(req.params.id);
        const team = await prisma.team.findUnique({where: {id: teamId}});
    
        if(!team)
            return res.status(404).json({message: "Team not found"});
    
        await prisma.team.delete({where: {id: teamId}});
    
        const response:ResponseType={
            message: `Team ${team.name} deleted`,
            data: team,
            status: 200
        }
        res.json(response);
    } catch (error) {
        if(error instanceof Error)
            return res.status(500).json({message: "Server error" + error.message});
    }
})

export default router;