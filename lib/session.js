// lib/session.js
import session from 'express-session';
const FileStore = require('session-file-store')(session);

export const sessionMiddleware = session({
    store: new FileStore({
        path: './data/sessions',
        ttl: 86400,
    }),
    secret: process.env.SESSION_SECRET || 'your-secret-key', // 강력한 비밀번호 설정
    resave: false,
    saveUninitialized: false,
    cookie: {
        // secure: process.env.NODE_ENV === 'production', // 프로덕션에서는 true
        secure: false,
        maxAge: 30 * 60 * 1000, // 30분 후 세션 만료 (단위: 밀리초)
        sameSite: 'lax', // 기본 옵션으로 설정
        // sameSite: 'none', // 또는 'None' (크로스사이트 요청에서 쿠키를 사용하도록 허용)
    },
    proxy: true
});