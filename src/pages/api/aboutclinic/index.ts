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

                const aboutClinics = await prisma.aboutClinic.findMany({
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                });

                const totalAboutClinics = await prisma.aboutClinic.count();
                const totalPage: number = Math.ceil(totalAboutClinics / pageSize);
                res.status(200).json({ aboutClinics, page, pageSize, totalPage });
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching the aboutClinics" });
            }
            break;

        case 'POST':
            try {
                const newaboutclinic = await prisma.aboutClinic.create({
                    data: req.body,
                });

                res.status(201).json(newaboutclinic);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while creating the aboutclinic" });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}