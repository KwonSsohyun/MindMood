/**
 * ▶ index 페이지
 *
 * 메인 페이지
 * - Calendar 컴포넌트 렌더링
 */
import React from 'react';
import { Box } from '@chakra-ui/react';
import Calendar from '../components/calendar/Calendar';

export default function Home() {
   return <>
         <Box as="main" width={{ base: "100%", md: "75%" }} mx="auto" mt="120px" mb="100px">
            <Calendar />
         </Box>
   </>
}