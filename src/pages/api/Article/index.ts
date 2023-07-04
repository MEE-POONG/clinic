import { PrismaClient, Article } from '@prisma/client';
const prisma = new PrismaClient()

export default async function handler(req: any, res: any) {
    const { method } = req
    switch (method) {
        case 'GET':
            try {
                const data = await prisma.article.findMany({
                    
                });
                res.status(200).json(data)
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'POST':
            const {Title ,detail,img}= req.body;
            try {
                const newArticle = await prisma.article.create({
                    data: {
                        Title ,
                        img,
                        detail,
                    },
                });
                res.status(201).json({ success: true, data: newArticle });
            } catch (error) {
                res.status(500).json({ success: true, message: "An error occurred while creating the article" });
            }
            break;
        default:
            res.setHeader('Allow', ['GET','POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}