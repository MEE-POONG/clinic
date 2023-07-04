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

                const promotions = await prisma.promotion.findMany({
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                });

                const totalpromotions = await prisma.promotion.count();
                const totalPage: number = Math.ceil(totalpromotions / pageSize);
                res.status(200).json({ promotions, page, pageSize, totalPage });
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching the promotions" });
            }
            break;

        case 'POST':
            try {
                const newpromotion = await prisma.promotion.create({
                    data: req.body,
                });

                res.status(201).json(newpromotion);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while creating the promotion" });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}