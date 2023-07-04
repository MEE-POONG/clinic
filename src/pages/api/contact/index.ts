import { PrismaClient , Contact } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const page: number = Number(req.query.page) || 1;
                const pageSize: number = Number(req.query.pageSize) || 10;

                const contacts = await prisma.contact.findMany({
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                });

                const totalcontacts = await prisma.contact.count();
                const totalPage: number = Math.ceil(totalcontacts / pageSize);
                res.status(200).json({ contacts, page, pageSize, totalPage });
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching the contacts" });
            }
            break;

        case 'POST':
            try {
                const newcontact = await prisma.contact.create({
                    data: req.body,
                });

                res.status(201).json(newcontact);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while creating the contact" });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}