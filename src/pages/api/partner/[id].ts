import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const { id } = req.query; // assuming id is passed as a query param

    switch (method) {
        case 'GET':
            try {
                const partner = await prisma.partner.findUnique({
                    where: { id: String(id) },
                });
                res.status(200).json(partner);
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: "An error occurred while fetching the partner" });
            }
            break;
        case 'PUT':
            const { userAG, originAG, percent, commission, overdue, adjustPercentage, pay, customerCommission, recommender } = req.body;
            try {
                const updatedPartner = await prisma.partner.update({
                    where: { id: String(id) },
                    data: {
                        userAG,
                        originAG,
                        percent,
                        commission,
                        overdue,
                        adjustPercentage,
                        pay,
                        customerCommission,
                        recommender
                    },
                });
                res.status(200).json(updatedPartner);
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: "An error occurred while updating the partner" });
            }
            break;
        case 'DELETE':
            try {
                const deletedPartner = await prisma.partner.delete({
                    where: { id: String(id) },
                });
                res.status(200).json(deletedPartner);
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: "An error occurred while deleting the partner" });
            }
            break;
        default:
            res.setHeader('Allow', ['GET','PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
