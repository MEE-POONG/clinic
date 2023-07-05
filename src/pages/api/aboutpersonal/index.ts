import { PrismaClient , AboutPersonal } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const page: number = Number(req.query.page) || 1;
                const pageSize: number = Number(req.query.pageSize) || 10;

                const aboutpersonals = await prisma.aboutPersonal.findFirst({
                   
                });

                const totalaboutpersonals = await prisma.aboutPersonal.count();
                const totalPage: number = Math.ceil(totalaboutpersonals / pageSize);
                res.status(200).json({ aboutpersonals });
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching the aboutpersonals" });
            }
            break;

        case 'POST':
            try {
                const newaboutpersonal = await prisma.aboutPersonal.create({
                    data: req.body,
                });

                res.status(201).json(newaboutpersonal);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while creating the aboutpersonal" });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}