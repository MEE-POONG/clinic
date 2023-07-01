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

                const reviews = await prisma.review.findMany({
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                });

                const totalreviews = await prisma.review.count();
                const totalPage: number = Math.ceil(totalreviews / pageSize);
                res.status(200).json({ reviews, page, pageSize, totalPage });
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching the reviews" });
            }
            break;

        case 'POST':
            try {
                const newreview = await prisma.review.create({
                    data: req.body,
                });

                res.status(201).json(newreview);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while creating the review" });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}