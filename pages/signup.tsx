/**
 * ▶ signup 페이지
 *
 * 회원가입 페이지
 * - SignupForm 컴포넌트 렌더링
 */
import React from 'react';
import { Box } from '@chakra-ui/react';
import UserSignupForm from '../components/auth/UserSignupForm';

export default function signup() {
   return <>
         <Box as="main" width={{ base: "100%", md: "70%" }} mx="auto" mt="10px" mb="100px">
            <UserSignupForm />
         </Box>
   </>
}