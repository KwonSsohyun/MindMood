/**
 * ▶ NewDiary 페이지
 *
 * 감정 일기 작성 페이지
 * - DiaryEntryForm 컴포넌트 렌더링
 */
import React from 'react';
import { Box } from '@chakra-ui/react';
import MoodCheck from '../../components/diary/form/MoodCheck';

export default function Home() {
   return <>
         <Box as="main" width={{ base: "80%", md: "60%" }} mx="auto" mt="140px" mb="100px">
            <MoodCheck />
         </Box>
   </>
}