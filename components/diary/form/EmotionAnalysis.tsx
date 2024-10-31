/**
 * ▶ EmotionAnalysis 컴포넌트
 *
 * 3) 감정 탐구
 * - 주요 감정 선택
 * - 감정 이유 작성
 * 
 * 🗃️ DB 테이블명           : diary
 * 📊 DB 컬럼명
 * - emotion_type            : 주요 감정 (VARCHAR)
 * - emotion_detail          : 감정 이유 (VARCHAR)
 */
import React, { useState } from 'react';
import { Flex, Box, Text, Textarea, Button } from '@chakra-ui/react';


export default function EmotionAnalysis({ diaryStore, onNext }) {

    // ● 주요 감정(emotion_type)
    const [emotionType, setEmotionType] = useState(null);
    // ● 감정 이유(emotion_detail)
    const [emotionDetail, setEmotionDetail] = useState(null);

    // ▶ MobX 스토어 저장 및 다음 단계 이동
    const handleNext = () => {
        diaryStore.setEmotionType(emotionType);
        diaryStore.setEmotionDetail(emotionDetail);
        onNext();
    };    

    return <>
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
            <Flex direction="column" p={4} mx={{ base: 0, md: 200 }}>
                <Button 
                    bg="#4C956C" 
                    color="white"
                    width="full"
                    px={6}
                    py={6}
                    mt={4}
                    onClick={handleNext}
                    isDisabled={ !emotionType || !emotionDetail }
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
        <Text>2.사건 기록 - 함께한 사람 : {diaryStore.getEventWith()}</Text>
    </>
}