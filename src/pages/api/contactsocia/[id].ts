import { contactsocialmedia, PrismaClient } from "@prisma/client";
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
                const contactsocialmedia: contactsocialmedia | null = await prisma.contactsocialmedia.findUnique({
                    where: {
                        id: String(id),
                    },
                });

                if (!contactsocialmedia) {
                    return res.status(404).json({ success: false, message: 'contactsocialmedia not found' });
                }

                res.status(200).json({ success: true, data: contactsocialmedia });
            } catch (error) {
                console.error(error);
                res.status(500).json({ success: false, message: "An error occurred while fetching the contactsocialmedia" });
            }
            break;
        case 'PUT':
            const {facebook,Line,Instagram,twitter,youtube} = req.body;

            try {
                const contactsocialmedia: contactsocialmedia = await prisma.contactsocialmedia.update({
                    where: { id: String(id) },
                    data: {
                        facebook,
                        Line,
                        Instagram,
                        twitter,
                        youtube
                    },
                });

                res.status(200).json({ success: false, data: contactsocialmedia });
            } catch (error) {
                console.error(error);
                res.status(500).json({ success: false, message: 'An error occurred while updating the contactsocialmedia' });
            }
            break;
        case 'DELETE':
            try {
                const contactsocialmedia: contactsocialmedia = await prisma.contactsocialmedia.delete({
                    where: { id: String(id) },
                });

                res.status(200).json({ success: false, message: 'contactsocialmedia deleted successfully', data: contactsocialmedia });
            } catch (error) {
                console.error("67 ",error);
                res.status(500).json({ success: false, message: 'An error occurred while deleting the contactsocialmedia' });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}