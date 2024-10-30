// types/next-session.d.ts
import { NextApiRequest } from 'next';
import { Session } from 'express-session'; // express-session의 Session 타입

declare module 'next' {
    interface NextApiRequest {
        session: Session; // session 속성을 추가
    }
}
