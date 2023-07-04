import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function handler(req:any, res:any) {
    const { method } = req
    switch (method) {
        case 'GET':
            try {
                const data = await prisma.contactsocialmedia.findMany({});
                res.status(200).json(data)
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
            
            case 'POST':
            const { facebook,Line,Instagram,twitter,youtube} = req.body;
            try {
                const newPartner = await prisma.contactsocialmedia.create({
                    data: {
                     facebook,
                     Line,
                     Instagram,
                     twitter,
                     youtube
                    },
                });
                res.status(201).json({ success: true, data: newPartner });
            } catch (error) {
                res.status(500).json({ success: true, message: "An error occurred while creating the contactsocia" });
            }
            break;

            


        default:
            res.setHeader('Allow', ['GET', 'PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}


