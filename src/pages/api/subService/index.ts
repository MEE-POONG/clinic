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

                const subServices = await prisma.subService.findMany({
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                });

                const totalsubServices = await prisma.subService.count();
                const totalPage: number = Math.ceil(totalsubServices / pageSize);
                res.status(200).json({ subServices, page, pageSize, totalPage });
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching the subServices" });
            }
            break;

        case 'POST':
            try {
                const newsubService = await prisma.subService.create({
                    data: req.body,
                });

                res.status(201).json(newsubService);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while creating the subService" });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}