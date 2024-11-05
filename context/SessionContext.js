import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useStore } from '../stores';

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
    const router = useRouter();
    const { userStore } = useStore();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // 세션을 체크하는 fetchSession 함수
    const fetchSession = async () => {
        const response = await fetch('/api/session', {
            credentials: 'include'
        });
        if (response.ok) {
            const data = await response.json();
            setUser(data.user); // 사용자 정보를 상태에 저장
            userStore.userId = data.user;

        } else {
            setUser(null); // 세션이 없으면 사용자 정보를 null로 설정
            userStore.userId = null;
        }
        setLoading(false); // 데이터 로드 완료
    };

    useEffect(() => {
        fetchSession(); // 컴포넌트가 마운트될 때 세션 체크
    }, []);

    useEffect(() => {
        // 세션 상태에 따라 리디렉션 처리
        if (!loading) {
            if (!user && (router.pathname !== '/login' && router.pathname !== '/signup')) {
                router.push('/login'); // 세션이 없으면 로그인 페이지로 이동
            } else if (user && (router.pathname === '/login' || router.pathname === '/signup')) {
                router.push('/'); // 로그인된 상태에서 로그인 또는 회원가입 페이지에 접근하면 메인 페이지로 리다이렉션
            }
        }
    }, [loading]);

    return (
        <SessionContext.Provider value={{ user, setUser, loading }}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSession = () => {
    return useContext(SessionContext);
};
