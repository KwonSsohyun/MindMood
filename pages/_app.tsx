/**
 * ▶ _app 컴포넌트
 *
 * 공통 컴포넌트
 * - 모든 페이지에서 공유되는 컴포넌트 정의
 */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ChakraProvider } from '@chakra-ui/react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import '../styles/globals.css';
import Head from 'next/head';
import { SessionProvider } from '../context/SessionContext';

export default function MyApp({ Component, pageProps }) {

    return (
        <SessionProvider>
            <ChakraProvider>
                <Head>
                    <title>MindMood</title>
                    <link rel="icon" href="/icon.ico" />
                </Head>
                <Header /> 
                <Component {...pageProps} />
                <Footer />
            </ChakraProvider>
        </SessionProvider>
    );
}