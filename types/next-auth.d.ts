// types/next-auth.d.ts
import NextAuth from 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            id: number; // 사용자 ID
            user_id: string; // 사용자 ID
        };
    }

    interface User {
        id: number; // 사용자 ID
        user_id: string; // 사용자 ID
    }
}
