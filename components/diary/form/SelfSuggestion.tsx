/**
 * ▶ SelfSuggestion 컴포넌트
 *
 * 6) 자기 제안
 * - 느낀점 및 긍정적 메시지 작성
 * 
 * 🗃️ DB 테이블명           : diary
 * 📊 DB 컬럼명
 * - self_goal               : 느낀점 및 다짐 (VARCHAR)
 */
import React, { useState, useEffect } from 'react';
import { Flex, Box, Text, Textarea, Button, useToast } from '@chakra-ui/react';
import ButtonStyle from '../../common/ButtonStyle';
import { useRouter } from 'next/router';


export default function SelfSuggestion({ diaryStore, currentStep, onPrevious, onNext }) {

    // ● 느낀점 및 다짐(self_goal)
    const [selfGoal, setSelfGoal] = useState("");

    const toast = useToast(); // Toast 훅
    const router = useRouter(); // Router 훅

    // ▶ MobX 스토어 저장 및 다음 단계 이동
    const handleSave = async () => {
        diaryStore.selfGoal = selfGoal;

        // 저장 후 오류 메시지가 없을 경우 성공 알림 띄우기
        try {
            await diaryStore.saveDiaryEntry();
            toast({
                title: "일기 저장 완료",
                description: "일기가 성공적으로 저장되었습니다.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            router.push('/'); // 원하는 경로로 이동

        } catch (error) {
            // 오류 메시지 표시
            toast({
                title: "저장 실패",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleNext = () => {
        diaryStore.selfGoal = selfGoal;
        onNext();
    };      

    // ▶ 이전 버튼 클릭 시 상태 업데이트
    useEffect(() => {
        setSelfGoal(diaryStore.selfGoal);
    }, [diaryStore.selfGoal]);

    return <>
        <Flex direction="column" p={4} mb={3}>
            <Flex>
                <Text fontSize="2xl" fontWeight="bold" color="#2C6E49" mb={5}>자기 제안</Text>
            </Flex>
            <Flex>
                <Box borderWidth="2px" borderRadius="lg" p={10} px={7} mb={4} w="100%">
                    <Text fontSize="xl" fontWeight="bold" mb={5}>느낀점 및 다짐</Text>
                    <Flex wrap="wrap">
                        <Textarea 
                            placeholder="긍정적인 메시지나 다짐 작성"
                            value={selfGoal}
                            onChange={(e) => setSelfGoal(e.target.value)}
                            color="#2C6E49"
                            fontWeight="bold"
                            borderColor="#D6E7DB"
                            _focus={{ borderColor: "#2C6E49", boxShadow: "0 0 0 1px #D6E7DB" }}
                            resize="vertical"
                            rows={7}
                        />
                    </Flex>
                </Box>
            </Flex>
        </Flex>

        <Flex direction="row">
            <ButtonStyle 
                onPrevious={onPrevious} 
                onNext={handleNext} 
                currentStep={currentStep} 
                isNextDisabled={ !selfGoal }
            />
            <Button 
                bg="#4C956C" 
                color="white"
                width="full"
                px={6}
                py={6}
                mt={8}
                onClick={handleSave}
                isDisabled={ !selfGoal }
                _hover={{ bg: "#2C6E49" }}
                _active={{ bg: "#2C6E49" }}
            >
                작성 완료
            </Button>
        </Flex>
    </>
}