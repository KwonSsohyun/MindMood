/**
 * ▶ login 페이지
 *
 * 로그인 페이지
 * - LoginForm 컴포넌트 렌더링
 */
import React from 'react';
import { Box } from '@chakra-ui/react';
import UserLoginForm from '../components/auth/UserLoginForm';

export default function login() {
   return <>
         <Box as="main" width={{ base: "100%", md: "75%" }} mx="auto" mt="0px" mb="100px">
            <UserLoginForm />
         </Box>
   </>
}