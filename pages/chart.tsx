/**
 * ▶ chart 페이지
 *
 * 감정 차트 페이지
 * - DiaryEntryChart 컴포넌트 렌더링
 */
import React from 'react';
import { Box } from '@chakra-ui/react';
import DiaryEntryChart from '../components/chart/DiaryEntryChart';

export default function chart() {
    return <>
        <Box as="main" width={{ base: "80%", md: "60%" }} mx="auto" mt="140px" mb="100px">
            <DiaryEntryChart />
        </Box>
    </>
}