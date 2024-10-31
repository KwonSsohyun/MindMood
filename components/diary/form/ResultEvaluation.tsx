/**
 * ▶ ResultEvaluation 컴포넌트
 *
 * 5) 결과 평가
 * - 사건 결과 작성
 * - 향후 행동 방안 작성
 * 
 * 🗃️ DB 테이블명           : diary
 * 📊 DB 컬럼명
 * - result_outcome          : 사건 결과 (VARCHAR)
 * - result_plan             : 미래 행동 계획 (VARCHAR)
 */
import React, { useState } from 'react';
import { Flex, Box, Text, Textarea, Button } from '@chakra-ui/react';


export default function ResultEvaluation({ diaryStore, onNext }) {

    // ● 사건 결과(result_outcome)
    const [resultOutcome, setResultOutcome] = useState(null);
    // ● 미래 행동 계획(result_plan)
    const [resultPlan, setResultPlan] = useState(null);

    // ▶ MobX 스토어 저장 및 다음 단계 이동
    const handleNext = () => {
        diaryStore.setResultOutcome(resultOutcome);
        diaryStore.setResultPlan(resultPlan);
        onNext();
    };           

    return <>
        <Flex direction="column" p={4} mb={3}>
            <Flex>
                <Text fontSize="2xl" fontWeight="bold" color="#2C6E49" mb={5}>결과 평가</Text>
            </Flex>
            <Flex>
                <Box borderWidth="2px" borderRadius="lg" p={10} px={7} mb={4} w="100%">
                    <Text fontSize="xl" fontWeight="bold" mb={5}>결과</Text>
                    <Flex wrap="wrap">
                        <Textarea 
                            placeholder="사건 결과 작성"
                            value={resultOutcome}
                            onChange={(e) => setResultOutcome(e.target.value)}
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
            <Flex>
                <Box borderWidth="2px" borderRadius="lg" p={10} px={7} mb={4} w="100%">
                    <Text fontSize="xl" fontWeight="bold" mb={5}>원하는 행동</Text>
                    <Flex wrap="wrap">
                        <Textarea 
                            placeholder="미래 행동 계획 작성"
                            value={resultPlan}
                            onChange={(e) => setResultPlan(e.target.value)}
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
            <Flex direction="column" p={4} mx={{ base: 0, md: 200 }}>
                <Button 
                    bg="#4C956C" 
                    color="white"
                    width="full"
                    px={6}
                    py={6}
                    mt={4}
                    onClick={handleNext}
                    isDisabled={ !resultOutcome || !resultPlan }
                    _hover={{ bg: "#2C6E49" }}
                    _active={{ bg: "#2C6E49" }}
                >
                    다음
                </Button>
            </Flex>
        </Flex>

        <Text>1.오늘의 기분 점검 - 감정 강도 : {diaryStore.getMoodLevel()}</Text>
        <Text>1.오늘의 기분 점검 - 감정 이모지 : {diaryStore.getMoodEmoji()}</Text><br/>
        <Text>2.사건 기록 - 주요 사건 : {diaryStore.getEventInfo()}</Text>
        <Text>2.사건 기록 - 함께한 사람 : {diaryStore.getEventWith()}</Text><br/>
        <Text>3.감정 탐구 - 주요 감정 : {diaryStore.getEmotionType()}</Text>
        <Text>3.감정 탐구 - 감정 이유 : {diaryStore.getEmotionDetail()}</Text><br/>
        <Text>4.행동/반응 분석 - 행동 기록 : {diaryStore.getBehaviorStyle()}</Text>
        <Text>4.행동/반응 분석 - 행동 영향 : {diaryStore.getBehaviorEffect()}</Text>
        <Text>4.행동/반응 분석 - 미표현 이유 : {diaryStore.getBehaviorReason()}</Text>
    </>
}