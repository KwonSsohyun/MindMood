/**
 * ▶ [id] 동적 페이지
 *
 * 감정 일기 상세 페이지
 * - DiaryDetail 컴포넌트 렌더링
 * - 수정 버튼 클릭 시 DiaryEdit 컴포넌트 렌더링
 */
import React, { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import DiaryDetail from '../../components/diary/list/DiaryDetail';

export default function ListDiary() {
    return <>
        <Box as="main" width={{ base: "85%", md: "60%" }} mx="auto" mt="140px" mb="100px">
            <DiaryDetail />
        </Box>
    </>
}