import { PrismaClient,Article  } from '@prisma/client';
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
                const article: Article | null = await prisma.article.findUnique({
                    where: {
                        id: String(id),
                    },
                    
                });

                if (!article) {
                    return res.status(404).json({ success: false, message: 'Article not found' });
                }

                res.status(200).json({ success: true, data: article });
            } catch (error) {
                console.error(error);
                res.status(500).json({ success: false, message: "An error occurred while fetching the article" });
            }
            break;
        case 'PUT':
            const {Title ,img ,detail} = req.body;

            try {
                const article: Article = await prisma.article.update({
                    where: { id: String(id) },
                    data: {
                        Title ,
                        img,
                        detail,
                        
                    },
                });

                res.status(200).json({ success: false, data: article });
            } catch (error) {
                console.error(error);
                res.status(500).json({ success: false, message: 'An error occurred while updating the article' });
            }
            break;
        case 'DELETE':
            try {
                const article: Article = await prisma.article.delete({
                    where: { id: String(id) },
                });

                res.status(200).json({ success: false, message: 'Article deleted successfully', data: article });
            } catch (error) {
                console.error("67 ",error);
                res.status(500).json({ success: false, message: 'An error occurred while deleting the article' });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}