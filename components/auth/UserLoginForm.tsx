/**
 * ▶ UserLoginForm 컴포넌트
 *
 * 로그인
 * - 사용자 로그인 페이지
 */
import React, { useState } from 'react';
import { Box, Button, Flex, Text, Input, FormControl, FormLabel, useToast, Link } from '@chakra-ui/react';
import { useRouter } from 'next/router'; 
import { useSession } from '../../context/SessionContext'; // 세션 훅 가져오기


export default function UserLoginForm() {

    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const toast = useToast();
    const router = useRouter();
    const { setUser } = useSession(); // 세션 훅 사용

    // DB 로그인 처리
    const handleSubmit = async (e) => {
        e.preventDefault();

        const loginData = {
            user_id: userId,
            password: password
        };

        try {
            const response = await fetch('/api/loginUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("data : ", data);
                setUser(data.user);
                toast({
                    title: "로그인 성공",
                    description: "로그인에 성공했습니다.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                // 메인 페이지로 이동
                router.push('/');

            } else {
                const errorData = await response.json();
                toast({
                    title: "로그인 실패",
                    description: errorData.message,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error('오류 발생:', error);
            toast({
                title: "오류",
                description: "로그인 중 오류가 발생했습니다.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };


    return <>
        <Flex align="center" justify="center" height="100vh">
            <Box p={6} borderRadius="md" bg="white" w={"80%"} maxW="400px">
                <Text fontSize="2xl" fontWeight="bold" color="#2C6E49" mb={10}>로그인</Text>
                <form onSubmit={handleSubmit}>
                    <FormControl isRequired mb={6}>
                        <FormLabel fontWeight="bold">사용자 ID</FormLabel>
                        <Input 
                            type="text" 
                            value={userId} 
                            onChange={(e) => setUserId(e.target.value)} 
                            color="#2C6E49"
                            fontWeight="bold"
                            borderColor="#D6E7DB"
                            _focus={{ borderColor: "#2C6E49", boxShadow: "0 0 0 1px #D6E7DB" }}
                        />
                    </FormControl>
                    <FormControl isRequired mb={10}>
                        <FormLabel fontWeight="bold">비밀번호</FormLabel>
                        <Input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            color="#2C6E49"
                            fontWeight="bold"
                            borderColor="#D6E7DB"
                            _focus={{ borderColor: "#2C6E49", boxShadow: "0 0 0 1px #D6E7DB" }}
                        />
                    </FormControl>
                    <Button 
                        type="submit" 
                        bg="#4C956C" 
                        color="white"
                        width="full"
                        px={6}
                        py={6}
                        _hover={{ bg: "#2C6E49" }}
                        _active={{ bg: "#2C6E49" }}
                    >
                        로그인
                    </Button>
                </form>
                <Flex justify="center" mt={10}>
                        <Text color="#919191" mr={2}>아직 계정이 없으신가요?</Text>
                        <Link href="/signup" color="#4C956C" fontWeight="bold">
                            회원가입
                        </Link>
                </Flex>
            </Box>
        </Flex>
    </>
}