/**
 * ▶ index 페이지
 *
 * 메인 페이지
 * - Calendar 컴포넌트 렌더링
 */
import React from 'react';
import { Box } from '@chakra-ui/react';
import Header from '../components/layout/Header'; // Header 컴포넌트 import
import Footer from '../components/layout/Footer'; // Footer 컴포넌트 import
import Calendar from '../components/calendar/Calendar';

export default function Home() {
   return <>
        <Header/>
        <Box mt="80px" mb="60px">
            <Calendar/>
        </Box>
        <Footer/>
   </>
}