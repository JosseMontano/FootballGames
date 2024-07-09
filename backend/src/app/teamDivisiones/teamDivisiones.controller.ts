import {Router, Response, Request} from "express"
import { PrismaClient } from '@prisma/client';
import { ResponseType } from "../../interfaces/response";

const router = Router();
const prisma = new PrismaClient();
const endpoint = "/teamDivisions/";

export type DivisionDTO = {
    name: string;
}

router.get(endpoint, async (req: Request, res: Response) => {
    try {

        const teamsDivision = await prisma.teamDivision.findMany();
    
        const response:ResponseType = {
            message: "Divisiones retrieved",
            data: teamsDivision,
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
        const teamsDivision = await prisma.teamDivision.findUnique({where: {id: teamId}});

        if(!teamsDivision)
            return res.status(404).json({message: "Division not found"});

        const response:ResponseType = {
            message: "Division retrieved",
            data: teamsDivision,
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
        const {name} = req.body as DivisionDTO;

        if(!name)
            return res.status(400).json({message: "Name is required"});
    
        const teamsDivision = await prisma.teamDivision.findUnique({where: {name}});
    
        if(teamsDivision)
            return res.status(400).json({message: "Division already exists"});
    
        const newDivision = await prisma.teamDivision.create({data: {name}});
    
        const response:ResponseType={
            message: `Team ${name} created`,
            data: newDivision,
            status: 201
        }
        res.json(response);
    } catch (error) {
        if(error instanceof Error)
            return res.status(500).json({message: "Server error" + error.message});
    }
})

router.put(endpoint + ":id", async (req: Request, res: Response) => {
    try {
        const teamId = parseInt(req.params.id);
        const {name} = req.body as DivisionDTO;

        if(!name)
            return res.status(400).json({message: "Name is required"});
    
        const teamsDivision = await prisma.teamDivision.findUnique({where: {id: teamId}});
    
        if(!teamsDivision)
            return res.status(404).json({message: "Team not found"});
    
        const updatedDivision = await prisma.teamDivision.update({where: {id: teamId}, data: {name: name}});
    
        const response:ResponseType={
            message: `Team ${name} updated`,
            data: updatedDivision,
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
        const divisionId = parseInt(req.params.id);
        const teamDivision = await prisma.teamDivision.findUnique({where: {id: divisionId}});
    
        if(!teamDivision)
            return res.status(404).json({message: "Division not found"});
    
        await prisma.teamDivision.delete({where: {id: divisionId}});
    
        const response:ResponseType={
            message: `Team ${teamDivision.name} deleted`,
            data: teamDivision,
            status: 200
        }
        res.json(response);
    } catch (error) {
        if(error instanceof Error)
            return res.status(500).json({message: "Server error" + error.message});
    }
})

export default router;