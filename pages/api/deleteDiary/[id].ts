/**
 * ▶ deleteDiary API
 *
 * 감정 일기 삭제
 * - 특정 일기를 데이터베이스에서 삭제
 */
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== 'DELETE') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { id } = req.query; // URL에서 ID 가져옴
    // console.log('Received ID:', id);

    if (!id) {
        return res.status(400).json({ error: 'ID is required' });
    }

    try {
        await prisma.diary.delete({
            where: { diary_seq: Number(id) },
        });

        res.status(200).json({ message: 'Diary deleted successfully' });

    } catch (error) {
        console.error('Diary delete failed:', error);
        res.status(500).json({ error: 'Diary delete failed' });
    }

}