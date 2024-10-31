/**
 * ▶ EventRecord 컴포넌트
 *
 * 2) 사건 기록
 * - 주요 사건 작성(시간, 장소, 내용)
 * - 함께한 사람 선택 또는 입력
 * 
 * 🗃️ DB 테이블명           : diary
 * 📊 DB 컬럼명
 * - event_info              : 주요 사건 (VARCHAR)
 * - event_with              : 함께한 사람 (VARCHAR)
 */
import React, { useState } from 'react';
import { Flex, Box, Text, Textarea, Input, Button } from '@chakra-ui/react';


export default function EventRecord({ diaryStore, onNext }) {

    // ● 주요 사건(event_info)
    const [eventInfo, setEventInfo] = useState(null);
    // ● 함께한 사람(event_with)
    const [eventWith, setEventWith] = useState(null);
    // ● 사용자 입력 상태
    const [customPerson, setCustomPerson] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const persons = [
        '가족', '친구', '연인', '동료', '상사', '부하', '지인', '친척', '혼자'
    ];

    // ▶ MobX 스토어 저장 및 다음 단계 이동
    const handleNext = () => {
        diaryStore.setEventInfo(eventInfo);
        diaryStore.setEventWith(eventWith);
        onNext();
    };

    // 사용자 정의 사람 추가
    const handleAddCustomPerson = () => {
        setEventWith(customPerson);
        setIsEditing(false); // 입력 필드 숨기기
    };

    return <>
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
                                onClick={() => {setEventWith(person); setIsEditing(false);}}
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
                        {isEditing ? (
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
                                    setIsEditing(true); // 입력 모드로 변경
                                    setEventWith(null); // 기존 선택값 초기화
                                }}
                                width="auto" // 기본 버튼 길이
                            >
                                {customPerson || '+'} {/* 사용자 입력 없으면 + 표시 */}
                            </Button>
                        )}
                        {isEditing && (
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
            <Flex direction="column" p={4} mx={{ base: 0, md: 200 }}>
                <Button 
                    bg="#4C956C" 
                    color="white"
                    width="full"
                    px={6}
                    py={6}
                    mt={4}
                    onClick={handleNext}
                    isDisabled={ !eventInfo || !eventWith }
                    _hover={{ bg: "#2C6E49" }}
                    _active={{ bg: "#2C6E49" }}
                >
                    다음
                </Button>
            </Flex>
        </Flex>

        <Text>1.오늘의 기분 점검 - 감정 강도 : {diaryStore.getMoodLevel()}</Text>
        <Text>1.오늘의 기분 점검 - 감정 이모지 : {diaryStore.getMoodEmoji()}</Text>
    </>
}