import { admin, PrismaClient } from "@prisma/client";
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
                const admin: admin | null = await prisma.admin.findUnique({
                    where: {
                        id: String(id),
                    },
                });

                if (!admin) {
                    return res.status(404).json({ success: false, message: 'admin not found' });
                }

                res.status(200).json({ success: true, data: admin });
            } catch (error) {
                console.error(error);
                res.status(500).json({ success: false, message: "An error occurred while fetching the admin" });
            }
            break;
        case 'PUT':
            const { adminusername, adminpassword, sex, tel, email} = req.body;

            try {
                const admin: admin = await prisma.admin.update({
                    where: { id: String(id) },
                    data: {
                        adminusername,
                        adminpassword,
                        sex,
                        tel,
                        email
                    },
                });

                res.status(200).json({ success: false, data: admin });
            } catch (error) {
                console.error(error);
                res.status(500).json({ success: false, message: 'An error occurred while updating the admin' });
            }
            break;
        case 'DELETE':
            try {
                const admin: admin = await prisma.admin.delete({
                    where: { id: String(id) },
                });

                res.status(200).json({ success: false, message: 'admin deleted successfully', data: admin });
            } catch (error) {
                console.error("67 ",error);
                res.status(500).json({ success: false, message: 'An error occurred while deleting the admin' });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}