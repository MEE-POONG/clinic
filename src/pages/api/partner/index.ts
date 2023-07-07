import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();
type Data = {
    success: boolean;
    message?: string;
    data?: any;
    pagination?: Pagination
};

type Pagination = {
    page: number;
    pageSize: number;
    total: number;
}
interface RequestQuery {
    page?: string;
    pageSize?: string;
}
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const query: RequestQuery = req.query as unknown as RequestQuery;
                const page: number = parseInt(query.page || '1', 10);
                const pageSize: number = parseInt(query.pageSize || '10', 10);

                const partners = await prisma.partner.findMany({
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                    include: {
                        member: true,
                    },
                });

                const totalPartnersCount: number = await prisma.partner.count();
                const totalPages: number = Math.ceil(totalPartnersCount / pageSize);

                res.status(200).json({ success: true, data: partners, pagination: { total: totalPages, page: page, pageSize: pageSize } });
            } catch (error) {
                console.log(error);

                res.status(500).json({ success: false, message: "An error occurred while fetching the partners" });
            }
            break;
        case 'POST':
            const { userAG, originAG, percent, commission, overdue, adjustPercentage, pay, customerCommission, recommender } = req.body;
            try {
                const newPartner = await prisma.partner.create({
                    data: {
                        userAG,
                        originAG,
                        percent,
                        commission,
                        overdue,
                        adjustPercentage,
                        pay,
                        customerCommission,
                        recommender
                    },
                });
                res.status(201).json({ success: true, data: newPartner });
            } catch (error) {
                res.status(500).json({ success: true, message: "An error occurred while creating the partner" });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
