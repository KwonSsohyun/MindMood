/**
 * ▶ BehaviorAnalysis 컴포넌트
 *
 * 4) 행동/반응 분석
 * - 감정 표현 방식 작성
 * - 행동 방식의 영향 작성
 * - 감정 미표현 이유 작성
 * 
 * 🗃️ DB 테이블명           : diary
 * 📊 DB 컬럼명
 * - behavior_style          : 행동 기록 (VARCHAR)
 * - behavior_effect         : 행동 영향 (VARCHAR)
 * - behavior_reason         : 미표현 이유 (VARCHAR)
 */
import React, { useState } from 'react';
import { Flex, Box, Text, Textarea, Button } from '@chakra-ui/react';


export default function BehaviorAnalysis({ diaryStore, onNext }) {

    // ● 행동 기록(behavior_style)
    const [behaviorStyle, setBehaviorStyle] = useState(null);
    // ● 행동 영향(behavior_effect)
    const [behaviorEffect, setBehaviorEffect] = useState(null);
    // ● 미표현 이유(behavior_reason)
    const [behaviorReason, setBehaviorReason] = useState(null);

    // ▶ MobX 스토어 저장 및 다음 단계 이동
    const handleNext = () => {
        diaryStore.setBehaviorStyle(behaviorStyle);
        diaryStore.setBehaviorEffect(behaviorEffect);
        diaryStore.setBehaviorReason(behaviorReason);
        onNext();
    };       

    return <>
        <Flex direction="column" p={4} mb={3}>
            <Flex>
                <Text fontSize="2xl" fontWeight="bold" color="#2C6E49" mb={5}>행동/반응 분석</Text>
            </Flex>
            <Flex>
                <Box borderWidth="2px" borderRadius="lg" p={10} px={7} mb={4} w="100%">
                    <Text fontSize="xl" fontWeight="bold" mb={5}>행동 기록</Text>
                    <Flex wrap="wrap">
                        <Textarea 
                            placeholder="감정 표현 방식 작성"
                            value={behaviorStyle}
                            onChange={(e) => setBehaviorStyle(e.target.value)}
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
                    <Text fontSize="xl" fontWeight="bold" mb={5}>행동 영향</Text>
                    <Flex wrap="wrap">
                        <Textarea 
                            placeholder="감정에 미친 영향 작성"
                            value={behaviorEffect}
                            onChange={(e) => setBehaviorEffect(e.target.value)}
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
                    <Text fontSize="xl" fontWeight="bold" mb={5}>미표현 이유</Text>
                    <Flex wrap="wrap">
                        <Textarea 
                            placeholder="감정을 표현하지 않은 이유 작성"
                            value={behaviorReason}
                            onChange={(e) => setBehaviorReason(e.target.value)}
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
                    isDisabled={ !behaviorStyle || !behaviorEffect || !behaviorReason }
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
        <Text>3.감정 탐구 - 감정 이유 : {diaryStore.getEmotionDetail()}</Text>
    </>
}