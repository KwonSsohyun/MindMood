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
import { Box, Button, Flex, Text, Input, FormControl, FormLabel } from '@chakra-ui/react';

export default function UserSignupForm() {

    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // 여기에 회원가입 처리 로직 추가
        console.log({ username, userId, email, password });
        // fetch(createUser.ts)
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
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
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
                        _hover={{ bg: "#2C6E49" }} // 호버 시 색상 변경
                        _active={{ bg: "#2C6E49" }} // 클릭 시 색상 변경
                    >
                        회원가입
                    </Button>
                </form>
            </Box>
        </Flex>        
    </>
}