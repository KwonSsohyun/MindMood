/**
 * ▶ getExistingDates API
 *
 * 감정 일기 작성 날짜 반환
 * - 데이터베이스에서 특정 사용자 ID를 기준으로 작성된 날짜만 반환
 */
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const userId = req.query.userId as string;

        try {
            const diaries = await prisma.diary.findMany({
                where: { user_id: userId },
                select: { entry_date: true },
            });

            // entry_date만 추출하여 날짜 문자열 배열로 반환
            const existingDates = diaries.map(diary => diary.entry_date.toISOString().split('T')[0]);
            return res.status(200).json({ existingDates });

        } catch (error) {
            console.error('Error fetching existing dates:', error);
            return res.status(500).json({ error: 'Failed to fetch existing dates.' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }    
}