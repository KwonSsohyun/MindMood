/**
 * ▶ signup 페이지
 *
 * 회원가입 페이지
 * - SignupForm 컴포넌트 렌더링
 */
import React from 'react';
import { Box } from '@chakra-ui/react';
import UserSignupForm from '../components/auth/UserSignupForm';

export default function Home() {
   return <>
         <Box as="main" width={{ base: "100%", md: "75%" }} mx="auto" mt="0px" mb="100px">
            <UserSignupForm />
         </Box>
   </>
}