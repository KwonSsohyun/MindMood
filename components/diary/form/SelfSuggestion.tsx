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
import React, { useState } from 'react';
import { Flex, Box, Text, Textarea, Button } from '@chakra-ui/react';


export default function SelfSuggestion({ diaryStore, onNext }) {

    // ● 느낀점 및 다짐(self_goal)
    const [selfGoal, setSelfGoal] = useState(null);

    // ▶ MobX 스토어 저장 및 다음 단계 이동
    const handleNext = () => {
        diaryStore.setSelfGoal(selfGoal);
        onNext();
    };     

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
            <Flex direction="column" p={4} mx={{ base: 0, md: 200 }}>
                <Button 
                    bg="#4C956C" 
                    color="white"
                    width="full"
                    px={6}
                    py={6}
                    mt={4}
                    onClick={handleNext}
                    isDisabled={ !selfGoal }
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
        <Text>4.행동/반응 분석 - 미표현 이유 : {diaryStore.getBehaviorReason()}</Text><br/>
        <Text>5.결과 평가 - 사건 결과 : {diaryStore.getResultOutcome()}</Text>
        <Text>5.결과 평가 - 원하는 행동 : {diaryStore.getResultPlan()}</Text>
    </>
}