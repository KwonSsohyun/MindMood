/**
 * ▶ DiaryEdit 컴포넌트
 *
 * 감정 일기 수정
 * - 일기 항목 세부 정보 표시
 * - 취소 및 수정완료 버튼
 */
import React, { useState } from 'react';
import { Flex, Box, Text, Input, Button, Textarea, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react';


export default function DiaryEdit({ diary }) {

    // ● 선택된 감정 상태(mood_emoji)
    const [moodEmoji, setMoodEmoji] = useState(diary.mood_emoji);
    // ● 감정 강도 상태(mood_level)
    const [moodLevel, setMoodLevel] = useState(diary.mood_level);
    // ● 주요 사건(event_info)
    const [eventInfo, setEventInfo] = useState(diary.event_info);
    // ● 함께한 사람(event_with)
    const [eventWith, setEventWith] = useState(diary.event_with);
    // ● 주요 감정(emotion_type)
    const [emotionType, setEmotionType] = useState(diary.emotion_type);
    // ● 감정 이유(emotion_detail)
    const [emotionDetail, setEmotionDetail] = useState(diary.emotion_detail);
    // ● 행동 기록(behavior_style)
    const [behaviorStyle, setBehaviorStyle] = useState(diary.behavior_style);
    // ● 행동 영향(behavior_effect)
    const [behaviorEffect, setBehaviorEffect] = useState(diary.behavior_effect);
    // ● 미표현 이유(behavior_reason)
    const [behaviorReason, setBehaviorReason] = useState(diary.behavior_reason);
    // ● 사건 결과(result_outcome)
    const [resultOutcome, setResultOutcome] = useState(diary.result_outcome);
    // ● 미래 행동 계획(result_plan)
    const [resultPlan, setResultPlan] = useState(diary.result_plan);
    // ● 느낀점 및 다짐(self_goal)
    const [selfGoal, setSelfGoal] = useState(diary.self_goal);

    // ● 사용자 입력 상태
    const [customPerson, setCustomPerson] = useState('');
    const [isEventEditing, setEventIsEditing] = useState(false);

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
    const persons = [
        '가족', '친구', '연인', '동료', '상사', '부하', '지인', '친척', '혼자'
    ];

    // 사용자 정의 사람 추가
    const handleAddCustomPerson = () => {
        setEventWith(customPerson);
        setEventIsEditing(false); // 입력 필드 숨기기
    };


    return <>
        <Flex direction="column" p={4} mb={3}>
            <Text fontSize="xl" fontWeight="bold">{new Date(diary.entry_date).toLocaleDateString('ko-KR')}</Text>
        </Flex>
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
                        value={moodLevel} 
                        min={1} 
                        max={10} 
                        step={1} 
                        onChange={(val) => setMoodLevel(val)} 
                        size="lg"
                    >
                        <SliderTrack>
                            <SliderFilledTrack bg={moodLevel > 0 ? "#4C956C" : "gray.200"} /> {/* 선택된 값이 있을 경우 색상 설정 */}
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

        <Flex direction="column" p={4} mb={3}>
            <Flex>
                <Text fontSize="2xl" fontWeight="bold" color="#2C6E49" mb={5}>사건 기록</Text>
            </Flex>
            <Flex>
                <Box borderWidth="2px" borderRadius="lg" p={10} px={7} mb={4} w="100%">
                    <Text fontSize="xl" fontWeight="bold" mb={5}>주요 사건</Text>
                    <Flex wrap="wrap">
                        <Textarea 
                            placeholder="시간, 장소, 내용 작성"
                            value={eventInfo}
                            onChange={(e) => setEventInfo(e.target.value)}
                            color="#2C6E49"
                            fontWeight="bold"
                            borderColor="#D6E7DB"
                            _focus={{ borderColor: "#2C6E49", boxShadow: "0 0 0 1px #D6E7DB" }}
                            resize="vertical" // 세로 방향으로 크기 조정 가능
                            rows={7} // 기본 높이 설정 (줄 수)
                        />
                    </Flex>
                </Box>
            </Flex>
            <Flex>
                <Box borderWidth="2px" borderRadius="lg" p={10} px={7} mb={4} w="100%">
                    <Text fontSize="xl" fontWeight="bold" mb={5}>함께한 사람</Text>
                    <Flex wrap="wrap">
                        {persons.map((person, index) => (
                            <Button
                                key={index}
                                onClick={() => {setEventWith(person); setEventIsEditing(false);}}
                                bg={eventWith === person ? "#4C956C" : "#F5F3F5"}
                                color={eventWith === person ? "white" : "black"}
                                borderRadius="full"
                                m={1}
                                px={4}
                                _hover={{ 
                                    bg: "#d6e7db", // 호버 시 배경색
                                    color: "black" // 호버 시 글자색
                                }}
                            >
                                {person}
                            </Button>
                        ))}
                    </Flex>
                    <Flex>
                        {/* 사용자 정의 입력 버튼 */}
                        {isEventEditing ? (
                            <Input 
                                placeholder="직접 입력"
                                value={customPerson}
                                onChange={(e) => setCustomPerson(e.target.value)}
                                mr={2}
                                size="md"
                                borderRadius="full"
                                width="auto"
                                mt={2}
                                color="#2C6E49"
                                fontWeight="bold"
                                borderColor="#D6E7DB"
                                _focus={{ borderColor: "#2C6E49", boxShadow: "0 0 0 1px #D6E7DB" }}
                            />
                        ) : (
                            <Button
                                borderRadius="full"
                                m={1}
                                px={4}
                                bg={eventWith === customPerson ? "#4C956C" : "#F5F3F5"} // 선택된 경우 색상 변경
                                color={eventWith === customPerson ? "white" : "black"}
                                _hover={{ 
                                    bg: "#d6e7db",
                                    color: "black"
                                }}
                                onClick={() => {
                                    setEventIsEditing(true); // 입력 모드로 변경
                                    setEventWith(null); // 기존 선택값 초기화
                                }}
                                width="auto" // 기본 버튼 길이
                            >
                                {customPerson || '+'} {/* 사용자 입력 없으면 + 표시 */}
                            </Button>
                        )}
                        {isEventEditing && (
                            <Button onClick={handleAddCustomPerson} 
                                bg="#4C956C" 
                                color="white"
                                mt={2}
                                _hover={{ bg: "#2C6E49" }}
                                _active={{ bg: "#2C6E49" }}
                                borderRadius="full"
                            >
                                추가
                            </Button>
                        )}                        
                    </Flex>
                </Box>
            </Flex>
        </Flex>

        <Flex direction="column" p={4} mb={3}>
            <Flex>
                <Text fontSize="2xl" fontWeight="bold" color="#2C6E49" mb={5}>감정 탐구</Text>
            </Flex>
            <Flex>
                <Box borderWidth="2px" borderRadius="lg" p={10} px={7} mb={4} w="100%">
                    <Text fontSize="xl" fontWeight="bold" mb={5}>주요 감정</Text>
                    <Flex wrap="wrap">
                        <Textarea 
                            placeholder="주요 감정 작성"
                            value={emotionType}
                            onChange={(e) => setEmotionType(e.target.value)}
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
                    <Text fontSize="xl" fontWeight="bold" mb={5}>감정 이유</Text>
                    <Flex wrap="wrap">
                        <Textarea 
                            placeholder="감정의 이유와 상황 작성"
                            value={emotionDetail}
                            onChange={(e) => setEmotionDetail(e.target.value)}
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
        </Flex>

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
        </Flex>

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
    </>
}