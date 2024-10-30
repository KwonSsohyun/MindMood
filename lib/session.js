// lib/session.js
import session from 'express-session';

export const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET || 'your-secret-key', // 강력한 비밀번호 설정
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // 프로덕션에서는 true
        maxAge: 1000 * 60 * 60 * 24, // 1일 동안 유효
        sameSite: 'lax', // 또는 'None' (크로스사이트 요청에서 쿠키를 사용하도록 허용)
    }
});
