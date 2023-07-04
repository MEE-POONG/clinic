import { PrismaClient,AboutPersonal  } from '@prisma/client';
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
                const aboutpersonal: AboutPersonal | null = await prisma.aboutPersonal.findUnique({
                    where: {
                        id: String(id),
                    },
                    
                });

                if (!aboutpersonal) {
                    return res.status(404).json({ success: false, message: 'AboutPersonal not found' });
                }

                res.status(200).json({ success: true, data: aboutpersonal });
            } catch (error) {
                console.error(error);
                res.status(500).json({ success: false, message: "An error occurred while fetching the aboutpersonal" });
            }
            break;
        case 'PUT':
            const {title ,subTitle,detail1,img,detail2,img2,} = req.body;

            try {
                const aboutpersonal: AboutPersonal = await prisma.aboutPersonal.update({
                    where: { id: String(id) },
                    data: {
                        title ,
                        subTitle,
                        detail1,
                        img,
                        detail2,
                        img2,
                    },
                });

                res.status(200).json({ success: false, data: aboutpersonal });
            } catch (error) {
                console.error(error);
                res.status(500).json({ success: false, message: 'An error occurred while updating the aboutpersonnel' });
            }
            break;
        case 'DELETE':
            try {
                const aboutpersonal: AboutPersonal = await prisma.aboutPersonal.delete({
                    where: { id: String(id) },
                });

                res.status(200).json({ success: false, message: 'AboutPersonnel deleted successfully', data: aboutpersonal });
            } catch (error) {
                console.error("67 ",error);
                res.status(500).json({ success: false, message: 'An error occurred while deleting the aboutpersonnel' });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}