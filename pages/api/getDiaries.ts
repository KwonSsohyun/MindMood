/**
 * ▶ getDiaries API
 *
 * 감정 일기 목록 조회
 * - 데이터베이스에서 모든 일기 데이터를 가져와 반환
 */
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const userId = req.query.userId as string;
        console.log("전체 일기 userId : ", userId)

        try {
            const diaries = await prisma.diary.findMany({
                where: { user_id: userId }
            });
            console.log("사용자 일기 전체 데이터 : ", diaries);
            return res.status(200).json(diaries);

        } catch (error) {
            console.error('Error fetching user diaries:', error);
            return res.status(500).json({ error: 'Failed to fetch diaries.' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }    
}