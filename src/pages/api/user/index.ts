import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function handler(req:any, res:any) {
    const { method } = req
    switch (method) {
        case 'GET':
            try {
                const data = await prisma.user.findMany({});
                res.status(200).json(data)
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
            
            case 'POST':
            const { Fname, Lname, Nickname, sex, username,password,email,Line,tel} = req.body;
            try {
                const newPartner = await prisma.user.create({
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
                res.status(201).json({ success: true, data: newPartner });
            } catch (error) {
                res.status(500).json({ success: true, message: "An error occurred while creating the User" });
            }
            break;

            


        default:
            res.setHeader('Allow', ['GET', 'PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}


