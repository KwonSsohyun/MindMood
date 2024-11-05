import prisma from '../../lib/prisma'; // Prisma 클라이언트
import bcrypt from 'bcryptjs'; // 비밀번호 비교를 위한 bcrypt
import { sessionMiddleware } from '../../lib/session'; // 세션 미들웨어

const handler = async (req, res) => {
    await new Promise((resolve, reject) => {
        sessionMiddleware(req, res, (err) => {
            if (err) return reject(err);
            resolve(null);
        });
    });

    if (req.method === 'POST') {
        const { user_id, password } = req.body;

        // console.log('로그인 시도 - 사용자 ID:', user_id);

        try {
            // 사용자 조회
            const user = await prisma.authUser.findUnique({
                where: { user_id: user_id },
            });

            // 비밀번호 확인
            if (!user) {
                console.log('사용자를 찾을 수 없음');
                return res.status(401).json({ message: '아이디 또는 비밀번호가 잘못되었습니다.' });
            }

            // console.log('사용자 조회 성공 : ', user);
            const isPasswordValid = await bcrypt.compare(password, user.password);
            // console.log('비밀번호 검증 결과 : ', isPasswordValid);

            if (isPasswordValid) {
                // 세션에 사용자 정보 저장
                req.session.user = { id: user.user_seq, user_id: user.user_id };
                await req.session.save(); // 세션 저장
                // console.log('로그인 성공 : ', req.session.user);

                // 클라이언트에 응답을 보내기 전에 GET 요청을 통해 세션 정보를 추가
                const sessionResponse = await fetch(`${req.headers.origin}/api/session?user_seq=${user.user_seq}&user_id=${user.user_id}`, {
                    method: 'GET',
                    credentials: 'include', // 쿠키 포함
                });

                if (sessionResponse.ok) {
                    const sessionData = await sessionResponse.json();
                    // console.log('POST GET 세션 데이터:', sessionData.user );
                    return res.status(200).json({ message: 'POST GET 로그인 성공', user: sessionData.user });
                } else {
                    console.error('세션 확인 요청 실패:', sessionResponse.statusText);
                }             

                // 로그인 성공 응답
                return res.status(200).json({ message: '로그인 성공', user: req.session.user });
            } else {
                console.log('비밀번호가 일치하지 않음');
            }

            // 비밀번호가 일치하지 않을 때
            return res.status(401).json({ message: '아이디 또는 비밀번호가 잘못되었습니다.' });

        } catch (error) {
            console.error('로그인 오류:', error);
            return res.status(500).json({ message: '서버 오류' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default handler;
