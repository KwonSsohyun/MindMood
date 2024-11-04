/**
 * ▶ createDiary API
 *
 * 감정 일기 작성
 * - 사용자가 입력한 일기 데이터를 데이터베이스에 저장
 */
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma'; // API 라우트에서 Prisma 사용

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'POST') {
        try {
            const {
                user_id,
                mood_level,
                mood_emoji,
                event_info,
                event_with,
                emotion_type,
                emotion_detail,
                behavior_style,
                behavior_effect,
                behavior_reason,
                result_outcome,
                result_plan,
                self_goal,
                entry_date
            } = req.body; // 요청 본문에서 데이터 추출

            // 같은 날 이미 저장된 일기 확인
            const entryDateOnly = entry_date.split('T')[0];
            console.log('entryDateOnly : ', entryDateOnly);
            
            const existingDiary = await prisma.diary.findFirst({
                where: {
                    user_id,
                    // entry_date에서 시간 제거하고 비교
                    entry_date: {
                        gte: new Date(entryDateOnly), // 시작일
                        lt: new Date(new Date(entryDateOnly).setDate(new Date(entryDateOnly).getDate() + 1)) // 종료일
                    }
                }
            });
            console.log('existingDiary : ', existingDiary);
            // 이미 같은 날 일기가 존재하면 에러 응답
            if (existingDiary) {
                return res.status(400).json({ error: '이미 같은 날에 저장된 일기가 있습니다.' });
            }

            // 일기 데이터 저장
            const newDiary = await prisma.diary.create({
                data: {
                    user_id,
                    mood_level,
                    mood_emoji,
                    event_info,
                    event_with,
                    emotion_type,
                    emotion_detail,
                    behavior_style,
                    behavior_effect,
                    behavior_reason,
                    result_outcome,
                    result_plan,
                    self_goal,
                    entry_date
                }
            });

            return res.status(201).json(newDiary); // 성공적으로 저장된 일기 반환

        } catch (error) {
            console.error('일기 저장 에러:', error);
            return res.status(500).json({ error: '이미 같은 날에 저장된 일기가 있습니다.' });
        }
    } else {
        // 지원하지 않는 메서드 처리
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}