import React from 'react';
import { Box, Text, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const Custom404 = () => {
    const router = useRouter();

    const handleRedirect = () => {
        router.push('/'); // 홈 페이지로 리다이렉트
    };

    return (
        <Box textAlign="center" py={10} px={6}>
            <Text fontSize="6xl" fontWeight="bold">404</Text>
            <Text fontSize="2xl" mt={4}>페이지를 찾을 수 없습니다.</Text>
            <Button mt={6} colorScheme="teal" onClick={handleRedirect}>
                홈으로 돌아가기
            </Button>
        </Box>
    );
};

export default Custom404;
