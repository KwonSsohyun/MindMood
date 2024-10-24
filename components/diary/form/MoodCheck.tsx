/**
 * ▶ MoodCheck 컴포넌트
 *
 * 1) 오늘의 기분 점검
 * - 감정 강도 선택
 * - 감정 이모지 선택
 * 
 * 🗃️ DB 테이블명       : mood_check
 * 📊 DB 컬럼명
 * - id                 : 고유식별자 (Primary Key)
 * - user_id            : 사용자 ID (Foreign Key, NULL 가능)
 * - intensity          : 감정 강도 (1-10점) (INT)
 * - emoji              : 감정 이모지 (기쁨, 행복, 설렘, 중립, 불안, 짜증, 우울, 슬픔, 후회, 분노) (TEXT)
 * - created_at         : 작성일 (Timestamp)
 * - updated_at         : 수정일 (Timestamp)
 */
import React, { useState } from 'react';
import { Box, Button, Flex, Text, Input } from '@chakra-ui/react';


export default function MoodCheck() {
    const [selectedEmotion, setSelectedEmotion] = useState('');
    const [showInput, setShowInput] = useState(false);

    const emotions = [
        '기쁨',
        '행복',
        '설렘',
        '중립',
        '불안',
        '짜증',
        '우울',
        '슬픔',
        '후회',
        '분노'
    ];

    const handleEmotionSelect = (emotion) => {
        setSelectedEmotion(emotion);
    };

    const handleCustomInput = () => {
        setShowInput(true);
    };


    return <>
        <Box>
            <Text fontSize="lg" fontWeight="bold" mb={2}>오늘의 기분을 선택해주세요.</Text>
            <Flex wrap="wrap" mb={4}>
                {emotions.map((emotion, index) => (
                    <Button
                        key={index}
                        onClick={() => handleEmotionSelect(emotion)}
                        bg={selectedEmotion === emotion ? "#4C956C" : "#F5F3F5"}
                        color={selectedEmotion === emotion ? "white" : "black"}
                        borderRadius="full"
                        m={1}
                        px={4}
                        _hover={{ 
                            bg: "#d6e7db", // 호버 시 배경색
                            color: "black" // 호버 시 글자색
                        }}
                    >
                        {emotion}
                    </Button>
                ))}
            </Flex>
            <Button
                    onClick={handleCustomInput}
                    borderRadius="full"
                    m={1}
                    px={4}
                    bg="#F5F3F5"
                    _hover={{ 
                        bg: "#d6e7db", // 호버 시 배경색
                        color: "black" // 호버 시 글자색
                    }}
                >
                    +
            </Button>
            {/* 사용자 정의 감정 입력 필드 */}
            {showInput && (
                <Flex mt={2}>
                    <Input 
                        placeholder="직접 입력할 기분을 입력하세요"
                        value={selectedEmotion}
                        onChange={(e) => setSelectedEmotion(e.target.value)}
                        mr={2}
                    />
                </Flex>                
            )}
        </Box>
    </>
}