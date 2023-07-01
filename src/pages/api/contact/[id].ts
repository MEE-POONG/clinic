import { contact, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

type Data = {
    success: boolean;
    message?: string;
    data?: any;
};
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { method } = req;
    const { id } = req.query;

    switch (method) {
        case 'GET':
            try {
                const contact: contact | null = await prisma.contact.findUnique({
                    where: {
                        id: String(id),
                    },
                });

                if (!contact) {
                    return res.status(404).json({ success: false, message: 'contact not found' });
                }

                res.status(200).json({ success: true, data: contact });
            } catch (error) {
                console.error(error);
                res.status(500).json({ success: false, message: "An error occurred while fetching the contact" });
            }
            break;
        case 'PUT':
            const {title,subtitle,detail,detail1,picture1,picture2} = req.body;

            try {
                const contact: contact = await prisma.contact.update({
                    where: { id: String(id) },
                    data: {
                       title,
                       subtitle,
                       detail,
                       detail1,
                       picture1,
                       picture2
                    },
                });

                res.status(200).json({ success: false, data: contact });
            } catch (error) {
                console.error(error);
                res.status(500).json({ success: false, message: 'An error occurred while updating the contact' });
            }
            break;
        case 'DELETE':
            try {
                const contact: contact = await prisma.contact.delete({
                    where: { id: String(id) },
                });

                res.status(200).json({ success: false, message: 'contact deleted successfully', data: contact });
            } catch (error) {
                console.error("67 ",error);
                res.status(500).json({ success: false, message: 'An error occurred while deleting the contact' });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}