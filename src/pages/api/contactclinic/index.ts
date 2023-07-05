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

                const contactclinics = await prisma.contactclinic.findMany({
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                });

                const totalcontactclinics = await prisma.contactclinic.count();
                const totalPage: number = Math.ceil(totalcontactclinics / pageSize);
                res.status(200).json({ contactclinics, page, pageSize, totalPage });
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching the contactclinics" });
            }
            break;

        case 'POST':
            try {
                const newcontactclinic = await prisma.contactclinic.create({
                    data: req.body,
                });

                res.status(201).json(newcontactclinic);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while creating the contactclinic" });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}