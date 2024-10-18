/**
 * ▶ _app 컴포넌트
 *
 * 공통 컴포넌트
 * - 모든 페이지에서 공유되는 컴포넌트 정의
 */
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

// ▶ MyApp 컴포넌트 정의
//   Component : 현재 렌더링할 페이지의 컴포넌트
//   pageProps : 현재 페이지에 전달된 속성(props)
export default function MyApp({ Component, pageProps }) {
    // ● 현재 페이지의 컴포넌트를 렌더링하고, 전달된 속성(props)을 모두 전달
    return <ChakraProvider>
        <Component {...pageProps} />
    </ChakraProvider>
}