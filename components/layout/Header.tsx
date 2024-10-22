/**
 * ▶ Header 컴포넌트
 *
 * 공통 헤더 레이아웃
 */
import React from 'react';
import { Box, Flex, Link, Text } from '@chakra-ui/react';

export default function Header() {
    return <>
        <Box as="header" position="fixed" top="0" left="0" width="100%" bg="white" boxShadow="md" zIndex="1000">
            <Flex justify="space-around" align="center" p={4}>
                <Text fontSize="xl" fontWeight="bold">MindMood</Text>
                <Flex fontWeight="bold">
                    <Link 
                        href="/diary/ListDiary" 
                        mx={4} 
                        fontSize="lg" 
                        textDecoration="none" // 밑줄 없애기
                        color="black" // 기본 색상 설정
                        _hover={{ color: "blue.500", textDecoration: "underline" }} // 호버 시 색상 변경
                    >
                        일기 목록
                    </Link>
                    <Link 
                        href="/diary/NewDiary" 
                        mx={4} 
                        fontSize="lg" 
                        textDecoration="none" 
                        color="black" 
                        _hover={{ color: "blue.500", textDecoration: "underline" }} 
                    >
                        일기 작성
                    </Link>
                    <Link 
                        href="/chart" 
                        mx={4} 
                        fontSize="lg" 
                        textDecoration="none" 
                        color="black" 
                        _hover={{ color: "blue.500", textDecoration: "underline" }} 
                    >
                        감정 차트
                    </Link>
                </Flex>
            </Flex>
        </Box>      
    </>
}