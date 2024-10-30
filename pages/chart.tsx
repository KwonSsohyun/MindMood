/**
 * ▶ chart 페이지
 *
 * 감정 차트 페이지
 * - PieChart / LineChart 컴포넌트 렌더링
 */
import React from 'react';
import { Box } from '@chakra-ui/react';
import LineChart from '../components/chart/LineChart';
import PieChart from '../components/chart/PieChart';

export default function chart() {
    return <>
        <Box as="main" width={{ base: "80%", md: "60%" }} mx="auto" mt="140px" mb="100px">
            <LineChart />
            <PieChart />
        </Box>
    </>
}