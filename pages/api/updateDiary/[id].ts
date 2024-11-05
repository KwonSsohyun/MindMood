/**
 * ▶ updateDiary API
 *
 * 감정 일기 수정
 * - 특정 일기의 데이터를 업데이트하여 저장
 */
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== 'PUT') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { id } = req.query; // URL에서 id 가져옴
    // console.log('Received ID:', id);

    const {
        moodLevel, 
        moodEmoji, 
        eventInfo, 
        eventWith, 
        emotionType, 
        emotionDetail, 
        behaviorStyle, 
        behaviorEffect, 
        behaviorReason, 
        resultOutcome, 
        resultPlan, 
        selfGoal
    } = req.body;

    // console.log('Request Body:', req.body);

    if (!id) {
        return res.status(400).json({ error: 'ID is required' });
    }

    try {
        const updatedDiary = await prisma.diary.update({
            where: { diary_seq: Number(id) },
            data: {
                mood_level: moodLevel,
                mood_emoji: moodEmoji,
                event_info: eventInfo,
                event_with: eventWith,
                emotion_type: emotionType,
                emotion_detail: emotionDetail,
                behavior_style: behaviorStyle,
                behavior_effect: behaviorEffect,
                behavior_reason: behaviorReason,
                result_outcome: resultOutcome,
                result_plan: resultPlan,
                self_goal: selfGoal,
                update_date: new Date(), // 현재 시간으로 업데이트 날짜 갱신
            },
        });

        res.status(200).json(updatedDiary); // 성공적으로 업데이트된 데이터 반환

    } catch (error) {
        console.error('Diary update failed:', error);
        res.status(500).json({ error: 'Diary update failed' });
    }

}