/**
 * ▶ _app 컴포넌트
 *
 * 공통 컴포넌트
 * - 모든 페이지에서 공유되는 컴포넌트 정의
 */
import React, { useEffect } from 'react';
import { SessionProvider } from '../context/SessionContext';
import { Provider } from 'mobx-react';
import { useStore } from '../stores';
import { ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import '../styles/globals.css';


export default function MyApp({ Component, pageProps }) {

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
                </ChakraProvider>
            </Provider>
        </SessionProvider>
    );
}