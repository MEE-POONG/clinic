import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const { id } = req.query;

    switch (method) {
        case 'GET':
            try {
                const agentIncomeSystem = await prisma.agentIncomeSystem.findUnique({
                    where: { id: id as string },
                });

                if (!agentIncomeSystem) {
                    return res.status(404).json({ error: "No agent income system found with this id" });
                }

                res.status(200).json(agentIncomeSystem);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching the agent income system" });
            }
            break;

        case 'PUT':
            try {
                const updatedAgentIncomeSystem = await prisma.agentIncomeSystem.update({
                    where: { id: id as string },
                    data: req.body,
                });

                res.status(200).json(updatedAgentIncomeSystem);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while updating the agent income system" });
            }
            break;

        case 'DELETE':
            try {
                const deletedAgentIncomeSystem = await prisma.agentIncomeSystem.delete({
                    where: { id: id as string },
                });

                res.status(200).json(deletedAgentIncomeSystem);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while deleting the agent income system" });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
