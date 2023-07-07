import { PrismaClient , Article } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const page: number = Number(req.query.page) || 1;
                const pageSize: number = Number(req.query.pageSize) || 10;

                const articles = await prisma.article.findMany({
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                });

                const totalarticles = await prisma.article.count();
                const totalPage: number = Math.ceil(totalarticles / pageSize);
                res.status(200).json({ articles , page, pageSize, totalPage  });
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching the articles" });
            }
            break;

        case 'POST':
            try {
                const newarticle = await prisma.article.create({
                    data: req.body,
                });

                res.status(201).json(newarticle);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while creating the article" });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}