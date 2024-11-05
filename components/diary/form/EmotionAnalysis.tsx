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
import React, { useState, useEffect } from 'react';
import { Flex, Box, Text, Textarea } from '@chakra-ui/react';
import ButtonStyle from '../../common/ButtonStyle';


export default function EmotionAnalysis({ diaryStore, currentStep, onPrevious, onNext }) {

    // ● 주요 감정(emotion_type)
    const [emotionType, setEmotionType] = useState(null);
    // ● 감정 이유(emotion_detail)
    const [emotionDetail, setEmotionDetail] = useState(null);

    // ▶ MobX 스토어 저장 및 다음 단계 이동
    const handleNext = () => {
        diaryStore.emotionType = emotionType;
        diaryStore.emotionDetail = emotionDetail;
        onNext();
    };    

    // ▶ 이전 버튼 클릭 시 상태 업데이트
    useEffect(() => {
        setEmotionType(diaryStore.emotionType);
        setEmotionDetail(diaryStore.emotionDetail);
    }, [diaryStore.emotionType, diaryStore.emotionDetail]);

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
        </Flex>

        <ButtonStyle 
            onPrevious={onPrevious} 
            onNext={handleNext} 
            currentStep={currentStep} 
            isNextDisabled={ !emotionType || !emotionDetail }
        />
    </>
}