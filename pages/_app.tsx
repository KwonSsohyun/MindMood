/**
 * ▶ _app 컴포넌트
 *
 * 공통 컴포넌트
 * - 모든 페이지에서 공유되는 컴포넌트 정의
 */
import React, { useState, useEffect } from 'react';
import { SessionProvider, useSession } from '../context/SessionContext';
import { Provider } from 'mobx-react';
import { useStore } from '../stores';
import { ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import TopButton from '../components/common/TopButton';
import '../styles/globals.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-datepicker/dist/react-datepicker.css';


export default function MyApp({ Component, pageProps }) {
    const [hydrated, setHydrated] = useState(false); // 클라이언트 렌더링 여부 상태
    const session = useSession(); // 전체 세션 객체 가져오기
    const { userStore } = useStore(); // MobX 스토어 가져오기

    useEffect(() => {
        setHydrated(true); // 클라이언트에서 렌더링 완료
    }, []);

    useEffect(() => {
        const initializeData = async () => {
            // 로컬 스토리지에서 데이터 로드 (페이지 로드 시 한번만 실행)
            if (!userStore.userId) {
                userStore.loadFromLocalStorage();
            }

            // 세션 정보가 있을 때만 서버에서 데이터 재확인 및 동기화
            if (session && session.user && session.user.user_id) {
                await userStore.fetchUserData(session.user.user_id);
            }
        };
        initializeData();
    }, [session, userStore]);

    // hydrated 상태가 false일 때는 null을 반환해 서버와 클라이언트의 초기 UI 불일치를 방지
    if (!hydrated) return null;

    return (
        <SessionProvider>
            <Provider {...useStore}> 
                <ChakraProvider>
                    <Head>
                        <title>MindMood</title>
                        <link rel="icon" href="/icon.ico" />
                    </Head>
                    <Header /> 
                    <Component {...pageProps} />
                    <Footer />
                    <TopButton />
                </ChakraProvider>
            </Provider>
        </SessionProvider>
    );
}