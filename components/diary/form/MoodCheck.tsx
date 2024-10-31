/**
 * ▶ MoodCheck 컴포넌트
 *
 * 1) 오늘의 기분 점검
 * - 감정 강도 선택
 * - 감정 이모지 선택
 * 
 * 🗃️ DB 테이블명           : diary
 * 📊 DB 컬럼명
 * - mood_level              : 감정 강도(1-10) (INT, NOT NULL)
 * - mood_emoji              : 감정 이모지 (VARCHAR, NOT NULL)
 */
import React, { useState } from 'react';
import { Flex, Box, Text, Button, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react';


export default function MoodCheck({ diaryStore, onNext }) {

    // ● 선택된 감정 상태(mood_emoji)
    const [moodEmoji, setMoodEmoji] = useState(null);
    // ● 감정 강도 상태(mood_level)
    const [moodLevel, setMoodLevel] = useState(1);

    const emotions = [
        { emoji: '😄', label: '기쁨' },
        { emoji: '😊', label: '행복' },
        { emoji: '😃', label: '설렘' },
        { emoji: '😐', label: '중립' },
        { emoji: '😟', label: '불안' },
        { emoji: '😠', label: '짜증' },
        { emoji: '😢', label: '우울' },
        { emoji: '😞', label: '슬픔' },
        { emoji: '😔', label: '후회' },
        { emoji: '😡', label: '분노' }
    ];

    // ▶ MobX 스토어 저장 및 다음 단계 이동
    const handleNext = () => {
        diaryStore.setMoodLevel(moodLevel); // MobX 스토어에 감정 강도 저장
        diaryStore.setMoodEmoji(moodEmoji); // MobX 스토어에 감정 이모지 저장
        // 다음 단계로 이동
        onNext();
    };

    return <>
        <Flex direction="column" p={4} mb={3}>
            <Flex>
                <Text fontSize="2xl" fontWeight="bold" color="#2C6E49" mb={5}>오늘의 기분 점검</Text>
            </Flex>
            <Flex>
                <Box borderWidth="2px" borderRadius="lg" p={10} px={7} mb={4} w="100%">
                    <Text fontSize="xl" fontWeight="bold" mb={5}>감정 이모지</Text>
                    <Flex wrap="wrap">
                        {emotions.map((emotion, index) => (
                            <Button
                                key={index}
                                onClick={() => setMoodEmoji(emotion.emoji)}
                                bg={moodEmoji === emotion.emoji ? "#4C956C" : "#F5F3F5"}
                                color={moodEmoji === emotion.emoji ? "white" : "black"}
                                borderRadius="full"
                                m={1}
                                px={4}
                                _hover={{ 
                                    bg: "#d6e7db", // 호버 시 배경색
                                    color: "black" // 호버 시 글자색
                                }}
                            >
                                <Text fontSize="md" mr={2}>{emotion.emoji}</Text> {/* 이모지 */}
                                <Text fontSize="md">{emotion.label}</Text> {/* 감정 레이블 */}
                            </Button>
                        ))}
                    </Flex>
                </Box>
            </Flex>
            <Flex>
                <Box borderWidth="2px" borderRadius="lg" p={10} px={7} mb={4} w="100%">
                    <Text fontSize="xl" fontWeight="bold" mb={5}>감정 강도</Text>
                    <Flex wrap="wrap">
                    <Slider 
                        defaultValue={1} 
                        min={1} 
                        max={10} 
                        step={1} 
                        onChange={(val) => setMoodLevel(val)} 
                        size="lg"
                    >
                        <SliderTrack>
                            <SliderFilledTrack bg="#4C956C" />
                        </SliderTrack>
                        <SliderThumb />
                    </Slider>
                    <Flex justifyContent="space-between" width="100%" mt={4}>
                        {[...Array(10)].map((_, index) => (
                            <Text key={index} fontSize="smaller" fontWeight="bold" color={index + 1 === moodLevel ? "#2C6E49" : "gray.200"}> {/* 선택된 값의 색상 변경 */}
                                {index + 1}
                            </Text>
                        ))}
                    </Flex>
                    </Flex>
                </Box>
            </Flex>
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
                isDisabled={ !moodEmoji || moodLevel < 1 } // 버튼 비활성화(필수 입력 체크)
                _hover={{ bg: "#2C6E49" }}
                _active={{ bg: "#2C6E49" }}
            >
                다음
            </Button>
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
        <Text>5.결과 평가 - 원하는 행동 : {diaryStore.getResultPlan()}</Text><br/>
        <Text>6.자기 제안 - 느낀점과 다짐 : {diaryStore.getSelfGoal()}</Text>
    </>
}