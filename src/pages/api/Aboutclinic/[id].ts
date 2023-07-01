import { PrismaClient,Aboutclinic  } from '@prisma/client';
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
                const aboutclinic: Aboutclinic | null = await prisma.aboutclinic.findUnique({
                    where: {
                        id: String(id),
                    },
                    
                });

                if (!aboutclinic) {
                    return res.status(404).json({ success: false, message: 'Aboutclinic not found' });
                }

                res.status(200).json({ success: true, data: aboutclinic });
            } catch (error) {
                console.error(error);
                res.status(500).json({ success: false, message: "An error occurred while fetching the aboutclinic" });
            }
            break;
        case 'PUT':
            const {Title ,Subtitel,detail1,img,detail2,img2,} = req.body;

            try {
                const aboutclinic: Aboutclinic = await prisma.aboutclinic.update({
                    where: { id: String(id) },
                    data: {
                        Title ,
                        Subtitel,
                        detail1,
                        img,
                        detail2,
                        img2,
                    },
                });

                res.status(200).json({ success: false, data: aboutclinic });
            } catch (error) {
                console.error(error);
                res.status(500).json({ success: false, message: 'An error occurred while updating the aboutclinic' });
            }
            break;
        case 'DELETE':
            try {
                const aboutclinic: Aboutclinic = await prisma.aboutclinic.delete({
                    where: { id: String(id) },
                });

                res.status(200).json({ success: false, message: 'Aboutclinic deleted successfully', data: aboutclinic });
            } catch (error) {
                console.error("67 ",error);
                res.status(500).json({ success: false, message: 'An error occurred while deleting the aboutclinic' });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}