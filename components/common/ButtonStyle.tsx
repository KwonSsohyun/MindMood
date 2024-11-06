/**
 * ▶ ButtonStyle 컴포넌트
 *
 * 공통 버튼 레이아웃
 */
import React from 'react';
import { Button, Flex } from '@chakra-ui/react';

export default function ButtonStyle({ onPrevious, onNext, currentStep, isNextDisabled }) {
    return <>
        <Flex 
            direction="row" 
            gap={5} 
            p={4} 
            width={{ base: "full", md: "50%" }} 
            justifyContent="center" 
            alignItems="center"
            mx="auto" // 수평 중앙 정렬
        >
            {currentStep !== 1 && (<Button // 첫 단계에서는 비활성화
                bg="gray.300" 
                color="white" 
                width="full" 
                px={6}
                py={6}
                mt={4}
                onClick={onPrevious} 
                isDisabled={currentStep === 1} 
                _hover={{ bg: "gray.500" }}
                _active={{ bg: "gray.500" }}
            >
                이전
            </Button>
            )}
            {currentStep !== 6 && ( <Button // 마지막 단계에서는 비활성화
                bg="#4C956C" 
                color="white" 
                width="full" 
                px={6}
                py={6}
                mt={4}
                onClick={onNext} 
                isDisabled={isNextDisabled} 
                _hover={{ bg: "#2C6E49" }}
                _active={{ bg: "#2C6E49" }}
            >
                다음
            </Button>
            )}
        </Flex>
    </>
};
