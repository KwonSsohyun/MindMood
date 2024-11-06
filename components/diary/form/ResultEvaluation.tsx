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
import React, { useState, useEffect } from 'react';
import { Flex, Box, Text, Textarea } from '@chakra-ui/react';
import ButtonStyle from '../../common/ButtonStyle';


export default function ResultEvaluation({ diaryStore, currentStep, onPrevious, onNext }) {

    // ● 사건 결과(result_outcome)
    const [resultOutcome, setResultOutcome] = useState("");
    // ● 미래 행동 계획(result_plan)
    const [resultPlan, setResultPlan] = useState("");

    // ▶ MobX 스토어 저장 및 다음 단계 이동
    const handleNext = () => {
        diaryStore.resultOutcome = resultOutcome;
        diaryStore.resultPlan = resultPlan;
        onNext();
    };           

    // ▶ 이전 버튼 클릭 시 상태 업데이트
    useEffect(() => {
        setResultOutcome(diaryStore.resultOutcome);
        setResultPlan(diaryStore.resultPlan);
    }, [diaryStore.resultOutcome, diaryStore.resultPlan]);

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
        </Flex>

        <ButtonStyle 
            onPrevious={onPrevious} 
            onNext={handleNext} 
            currentStep={currentStep} 
            isNextDisabled={ !resultOutcome || !resultPlan }
        />
    </>
}