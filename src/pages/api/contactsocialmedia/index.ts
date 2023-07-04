import { PrismaClient , ContactSocialMedia } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const page: number = Number(req.query.page) || 1;
                const pageSize: number = Number(req.query.pageSize) || 10;

                const contactsocialmedials = await prisma.contactSocialMedia.findMany({
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                });

                const totalcontactsocialmedials = await prisma.contactSocialMedia.count();
                const totalPage: number = Math.ceil(totalcontactsocialmedials / pageSize);
                res.status(200).json({ contactsocialmedials, page, pageSize, totalPage });
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching the contactsocialmedials" });
            }
            break;

        case 'POST':
            try {
                const newcontactsocialmedial = await prisma.contactSocialMedia.create({
                    data: req.body,
                });

                res.status(201).json(newcontactsocialmedial);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while creating the contactsocialmedial" });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}