/**
 * ▶ UserSignupForm 컴포넌트
 *
 * 회원가입
 * - 회원가입 페이지
 * 
 * 🗃️ DB 테이블명           : auth_user
 * 📊 DB 컬럼명
 * - user_seq               : 고유식별자 (Primary Key)
 * - user_id                : 사용자 ID (Unique, NULL 불가)
 * - name                   : 사용자 이름 (NULL 불가)
 * - email                  : 사용자 이메일 (Unique, NULL 가능)
 * - password               : 사용자 비밀번호 (NULL 불가)
 * - create_date            : 생성일 (Timestamp)
 * - select_item            : 선택된 카테고리 ID 목록(배열)(INT[]) (기분, 사건, 감정, 행동, 결과, 제안)
 */
import React, { useState } from 'react';
import { Box, Button, Flex, Text, Input, FormControl, FormLabel, Link, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router'; // Next.js 라우터(페이지 이동)
import { useSession } from '../../context/SessionContext'; // 세션 훅 가져오기
import bcrypt from 'bcryptjs';

export default function UserSignupForm() {

    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const toast = useToast(); // Toast 훅 사용
    const router = useRouter(); // Router 훅 사용

    const { setUser } = useSession(); // 세션 훅 사용

    // DB 회원가입 처리
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 비밀번호 해시화
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = {
            user_id: userId,
            name: name,
            email: email,
            password: hashedPassword,
            select_item: [] // 초기값 빈 배열
        };

        try {
            const response = await fetch('/api/createUser', {  
                // API 엔드포인트
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser),
            });

            if (response.ok) {
                // console.log('사용자 생성 성공');
                const data = await response.json();
                // setUser(data); // 회원가입 후 사용자 정보를 세션에 설정
                toast({
                    title: "회원가입 성공",
                    description: "회원가입에 성공했습니다.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });

                // 메인 페이지로 리다이렉션
                // router.push('/');

                // 로그인 페이지로 리다이렉션
                router.push('/login');                
                
            } else {
                console.error('사용자 생성 실패');
                const errorData = await response.json();
                toast({
                    title: "회원가입 실패",
                    description: "이미 가입한 계정이 있습니다.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });

            }
        } catch (error) {
            console.error('오류 발생:', error);
            // 오류 메시지 팝업
            toast({
                title: "오류 발생",
                description: "회원가입 중 오류가 발생했습니다.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return <>
        <Flex 
            align="center" 
            justify="center" 
            height="100vh" 
        >
            <Box 
                p={6} 
                borderRadius="md" 
                bg="white"
                w={"80%"}
            >
                <Text fontSize="2xl" fontWeight="bold" color="#2C6E49" mb={10}>회원가입</Text>
                <form onSubmit={handleSubmit}>
                    <FormControl isRequired mb={6}>
                        <FormLabel fontWeight="bold">사용자 이름</FormLabel>
                        <Input 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            color="#2C6E49"
                            fontWeight="bold"
                            borderColor="#D6E7DB"
                            _focus={{ borderColor: "#2C6E49", boxShadow: "0 0 0 1px #D6E7DB" }}
                        />
                    </FormControl>
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
                    <FormControl isRequired mb={6}>
                        <FormLabel fontWeight="bold">이메일</FormLabel>
                        <Input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            color="#2C6E49"
                            fontWeight="bold"
                            borderColor="#D6E7DB"
                            _focus={{ borderColor: "#2C6E49", boxShadow: "0 0 0 1px #D6E7DB" }}
                        />
                    </FormControl>
                    <FormControl isRequired mb={12}>
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
                        _hover={{ bg: "#2C6E49" }} // 호버 시 색상 변경
                        _active={{ bg: "#2C6E49" }} // 클릭 시 색상 변경
                    >
                        회원가입
                    </Button>
                </form>
                <Flex justify="center" mt={10}>
                        <Text color="#919191" mr={2}>이미 계정이 있으신가요?</Text>
                        <Link href="/login" color="#4C956C" fontWeight="bold">
                            로그인
                        </Link>
                </Flex>
            </Box>
        </Flex>        
    </>
}