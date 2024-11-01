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
import { Flex, Box, Text, Textarea, Button } from '@chakra-ui/react';
import ButtonStyle from '../../common/ButtonStyle';


export default function SelfSuggestion({ diaryStore, currentStep, onPrevious, onNext }) {

    // ● 느낀점 및 다짐(self_goal)
    const [selfGoal, setSelfGoal] = useState(null);

    // ▶ MobX 스토어 저장 및 다음 단계 이동
    const handleSave = async () => {
        diaryStore.selfGoal = selfGoal;

        // 저장 메서드 호출
        await diaryStore.saveDiaryEntry();
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

        <Text>1.오늘의 기분 점검 - 감정 강도 : {diaryStore.moodLevel}</Text>
        <Text>1.오늘의 기분 점검 - 감정 이모지 : {diaryStore.moodEmoji}</Text><br/>
        <Text>2.사건 기록 - 주요 사건 : {diaryStore.eventInfo}</Text>
        <Text>2.사건 기록 - 함께한 사람 : {diaryStore.eventWith}</Text><br/>
        <Text>3.감정 탐구 - 주요 감정 : {diaryStore.emotionType}</Text>
        <Text>3.감정 탐구 - 감정 이유 : {diaryStore.emotionDetail}</Text><br/>
        <Text>4.행동/반응 분석 - 행동 기록 : {diaryStore.behaviorStyle}</Text>
        <Text>4.행동/반응 분석 - 행동 영향 : {diaryStore.behaviorEffect}</Text>
        <Text>4.행동/반응 분석 - 미표현 이유 : {diaryStore.behaviorReason}</Text><br/>
        <Text>5.결과 평가 - 사건 결과 : {diaryStore.resultOutcome}</Text>
        <Text>5.결과 평가 - 원하는 행동 : {diaryStore.resultPlan}</Text>
    </>
}