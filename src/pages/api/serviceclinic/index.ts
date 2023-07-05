import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const page: number = Number(req.query.page) || 1;
                const pageSize: number = Number(req.query.pageSize) || 10;

                const services = await prisma.serviceclinic.findFirst({
                    
                });

                const totalservices = await prisma.serviceclinic.count();
                const totalPage: number = Math.ceil(totalservices / pageSize);
                res.status(200).json({ services });
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching the services" });
            }
            break;

        case 'POST':
            try {
                const newservice = await prisma.serviceclinic.create({
                    data: req.body,
                });

                res.status(201).json(newservice);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while creating the service" });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}