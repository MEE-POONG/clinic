import { PrismaClient, AboutPersonnel } from '@prisma/client';
const prisma = new PrismaClient()

export default async function handler(req: any, res: any) {
    const { method } = req
    switch (method) {
        case 'GET':
            try {
                const data = await prisma.aboutPersonnel.findMany({
                    
                });
                res.status(200).json(data)
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'POST':
            const {Title ,Subtitel,detail1,img,detail2,img2,}= req.body;
            try {
                const newAboutPersonnel = await prisma.aboutPersonnel.create({
                    data: {
                        Title ,
                        Subtitel,
                        detail1,
                        img,
                        detail2,
                        img2,
                    },
                });
                res.status(201).json({ success: true, data: newAboutPersonnel });
            } catch (error) {
                res.status(500).json({ success: true, message: "An error occurred while creating the aboutpersonnel" });
            }
            break;
        default:
            res.setHeader('Allow', ['GET','POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}