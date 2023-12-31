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

                const user = await prisma.user.findMany({
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                    include: {
                        Adminmaster : true,
                    },
                });

                const totalusers = await prisma.user.count();
                const totalPage: number = Math.ceil(totalusers / pageSize);
                res.status(200).json({ user, page, pageSize, totalPage });
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching the users" });
            }
            break;

        case 'POST':
            try {
                const newuser = await prisma.user.create({
                    data: req.body,
                });

                res.status(201).json(newuser);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while creating the user" });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}