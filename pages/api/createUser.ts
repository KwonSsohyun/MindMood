/**
 * ▶ createUser API
 *
 * 사용자 정보 신규 등록
 * - 사용자의 정보 데이터베이스에 저장
 */
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma'; // API 라우트에서 Prisma 사용
import { sessionMiddleware } from '../../lib/session'; // 세션 미들웨어

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    await new Promise((resolve, reject) => {
        sessionMiddleware(req, res, (err) => {
            if (err) return reject(err);
            resolve(null);
        });
    });

    if (req.method === 'POST') {
        const { user_id, name, email, password } = req.body;

        try {
            // 카테고리 테이블에 데이터가 없는 경우, 기본값을 삽입합니다.
            const categoryCount = await prisma.selectCategory.count();
            if (categoryCount === 0) {
                await prisma.selectCategory.createMany({
                    data: [
                        { category_name: '기분' },
                        { category_name: '사건' },
                        { category_name: '감정' },
                        { category_name: '행동' },
                        { category_name: '결과' },
                        { category_name: '제안' },
                    ],
                });
            }

            // 카테고리 ID를 가져옵니다.
            const categories = await prisma.selectCategory.findMany({
                select: {
                    category_id: true,
                },
            });

            // 카테고리 ID를 배열 형태로 변환합니다.
            const categoryIds = categories.map(category => category.category_id);            

            // 사용자 데이터 생성
            const newUser = await prisma.authUser.create({
                data: {
                    user_id,
                    name,
                    email,
                    password,
                    select_item: categoryIds, // 가져온 카테고리 ID를 select_item 설정
                },
            });

            // 로그인 처리: 세션에 사용자 정보 저장
            req.session.user = { id: newUser.user_seq, user_id: newUser.user_id };
            await req.session.save(); // 세션 저장            

            // 성공 응답 반환
            res.status(201).json(newUser);

        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: '사용자 생성에 실패했습니다.' });
        }
    } else {
        // POST 요청이 아닌 경우 405 Method Not Allowed 응답
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}