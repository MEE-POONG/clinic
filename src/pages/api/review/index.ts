import { PrismaClient , Review } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const page: number = Number(req.query.page) || 1;
                const pageSize: number = Number(req.query.pageSize) || 10;

                const reviewls = await prisma.review.findMany({
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                });

                const totalreviewls = await prisma.review.count();
                const totalPage: number = Math.ceil(totalreviewls / pageSize);
                res.status(200).json({ reviewls, page, pageSize, totalPage });
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching the reviewls" });
            }
            break;

        case 'POST':
            try {
                const newreviewl = await prisma.review.create({
                    data: req.body,
                });

                res.status(201).json(newreviewl);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while creating the reviewl" });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}