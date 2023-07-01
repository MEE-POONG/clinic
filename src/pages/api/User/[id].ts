import { User, PrismaClient } from "@prisma/client";
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
                const user: User | null = await prisma.user.findUnique({
                    where: {
                        id: String(id),
                    },
                });

                if (!user) {
                    return res.status(404).json({ success: false, message: 'user not found' });
                }

                res.status(200).json({ success: true, data: user });
            } catch (error) {
                console.error(error);
                res.status(500).json({ success: false, message: "An error occurred while fetching the user" });
            }
            break;
        case 'PUT':
            const {Fname, Lname, Nickname, sex, username,password,email,Line,tel} = req.body;

            try {
                const user: User = await prisma.user.update({
                    where: { id: String(id) },
                    data: {
                        Fname,
                        Lname,
                        Nickname,
                        sex,
                        username,
                        password,
                        email,
                        Line,
                        tel
                    },
                });

                res.status(200).json({ success: false, data: user });
            } catch (error) {
                console.error(error);
                res.status(500).json({ success: false, message: 'An error occurred while updating the user' });
            }
            break;
        case 'DELETE':
            try {
                const user: User = await prisma.user.delete({
                    where: { id: String(id) },
                });

                res.status(200).json({ success: false, message: 'user deleted successfully', data: user });
            } catch (error) {
                console.error("67 ",error);
                res.status(500).json({ success: false, message: 'An error occurred while deleting the user' });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}