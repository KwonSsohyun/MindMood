import { NextApiRequest, NextApiResponse } from 'next';
import { sessionMiddleware } from '../../lib/session';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    await new Promise((resolve, reject) => {
        sessionMiddleware(req, res, (err) => {
            if (err) return reject(err);
            resolve(null);
        });
    });

    if (req.method === 'GET') {
        // console.log('세션 GET'); 
        
        let user = req.session.user; // 세션에서 사용자 정보 가져오기
        // console.log('세션 user : ', user); 

        // 만약 세션이 없다면, 쿼리 파라미터에서 user_seq와 user_id를 받기
        const { user_seq, user_id } = req.query;  

        if (!user && user_seq && user_id) {
            // 세션이 없으면, user_id를 사용해 세션에 정보를 저장
            req.session.user = { id: user_seq, user_id: user_id };
            await req.session.save(); // 세션 저장
            user = req.session.user; // 업데이트된 사용자 정보
            // console.log('세션에 저장된 user : ', user);
            return res.status(200).json({ user: req.session.user });
        }

        if (user) {
            return res.status(200).json({ user: req.session.user }); // 사용자 정보를 응답으로 반환
        } else {
            return res.status(401).json({ message: '세션이 존재하지 않습니다.' }); // 세션이 없을 때
        }

    } else if (req.method === 'POST') {
        // console.log('세션 POST'); 
        // console.log('POST 현재 세션:', req.session);
        const { user } = req.body; // 클라이언트에서 보낸 사용자 정보를 가져옴
        req.session.user = user; // 세션에 사용자 정보를 저장
        await req.session.save(); // 세션 저장
        // console.log('세션 user : ', user); 
        return res.status(200).json({ message: '로그인 성공', user: req.session.user }); // 성공 응답

    } else if (req.method === 'DELETE') { // 로그아웃 처리
        // console.log('세션 DELETE'); 
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: '로그아웃 실패' });
            }
            return res.status(200).json({ message: '로그아웃 성공' });
        });

    } else {
        res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default handler;
