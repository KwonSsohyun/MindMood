/**
 * ▶ ListDiary 페이지
 *
 * 감정 일기 목록 페이지
 * - DiaryList 컴포넌트 렌더링
 */
import React, { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import DiaryList from '../../components/diary/list/DiaryList';

// SSR fetch(getDiaries.ts)

export default function ListDiary() {
    return <>
        <Box as="main" width={{ base: "85%", md: "60%" }} mx="auto" mt="140px" mb="100px">
            <DiaryList />
        </Box>
    </>
}