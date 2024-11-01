/**
 * ▶ DiaryEntryForm 컴포넌트
 *
 * 감정 일기 작성 상위 컴포넌트
 * - 각 섹션 관리 : MoodCheck, EventRecord, EmotionAnalysis, BehaviorAnalysis, ResultEvaluation, SelfSuggestion
 */
import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../../../stores'; // MobX 스토어 가져오기
import { useSession } from '../../../context/SessionContext';

import { Flex, Box, Text, IconButton, Button } from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import MoodCheck from '../form/MoodCheck';
import EventRecord from '../form/EventRecord';
import EmotionAnalysis from '../form/EmotionAnalysis';
import BehaviorAnalysis from '../form/BehaviorAnalysis';
import ResultEvaluation from '../form/ResultEvaluation';
import SelfSuggestion from '../form/SelfSuggestion';


const DiaryEntryForm = observer(() => {

    const { user } = useSession();

    // ▶ MobX 스토어 인스턴스 가져오기
    const { diaryStore } = useStore();

    // ▶ 일기 작성일
    const [startDate, setStartDate] = useState(new Date());
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    // ▶ 현재 단계 상태 {1,2,3,4,5,6}
    /*
        1 : MoodCheck (오늘의 기분 점검)
        2 : EventRecord (사건 기록)
        3 : EmotionAnalysis (감정 탐구)
        4 : BehaviorAnalysis (행동/반응 분석)
        5 : ResultEvaluation (결과 평가)
        6 : SelfSuggestion (자기 제안)
    */
    const [currentStep, setCurrentStep] = useState(1);

    const steps = [
        { index: '1', label: '기분' },
        { index: '2', label: '사건' },
        { index: '3', label: '감정' },
        { index: '4', label: '행동' },
        { index: '5', label: '결과' },
        { index: '6', label: '제안' }
    ];

    // ▶ 다음 단계로 이동
    const handleNextStep = () => {
        // 날짜가 선택되지 않았다면 현재 날짜를 MobX 스토어에 저장
        if (!isDatePickerOpen) {
            diaryStore.entryDate = new Date().toISOString(); // 현재 날짜 'YYYY-MM-DD'
        } else {
            diaryStore.entryDate = startDate.toISOString(); // 선택된 날짜 저장
        }
        setCurrentStep((prev) => Math.min(prev + 1, steps.length)); // 단계가 6을 초과하지 않도록 설정
        diaryStore.userId = user.user_id;
    };

    // ▶ 이전 단계로 이동
    const handlePrevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1)); // 단계가 1 미만이 되지 않도록 설정
    };

    // ▶ 일기 작성일
    const handleDateChange = (date) => {
        setStartDate(date);
        diaryStore.entryDate = date.toISOString(); // 'YYYY-MM-DD' 형식으로 저장
        setIsDatePickerOpen(false);
    };


    return <>
        {/* 단계 표시 바 */}
        <Flex direction="column" mb={10} alignItems="center">
            <Flex width="100%" alignItems="center">
                {steps.map((step, index) => (
                    <Flex direction="column" alignItems="center" key={index} position="relative" mx={3}>
                        {/* 동그라미 */}
                        <Box
                            width="30px"
                            height="30px"
                            borderRadius="50%"
                            backgroundColor={index + 1 <= currentStep ? "#4C956C" : "gray.200"} // 현재 단계에 따라 색상 설정
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            mb={1}
                            zIndex={1} // 동그라미가 막대기 위에 위치
                        >
                            <Text fontSize="sm" fontWeight="bold" color={index + 1 <= currentStep ? "white" : "gray.300"}>
                                {step.index} {/* 단계 숫자 */}
                            </Text>
                        </Box>
                        <Text fontSize="sm" fontWeight="bold" color={index + 1 <= currentStep ? "#4C956C" : "gray.300"}>
                            {step.label} {/* 단계 이름 */}
                        </Text>

                        {/* 막대기 */}
                        {index < steps.length - 1 && (
                            <Box
                                position="absolute"
                                width="50px" // 막대기의 너비를 조정
                                height="4px" // 동그라미와 동그라미 사이의 길이를 조정
                                backgroundColor={index + 1 < currentStep ? "#4C956C" : "gray.200"} // 현재 단계에 따라 색상 설정
                                left="100%"
                                transform="translateX(-50%)"
                                top="25%" // 동그라미 아래 위치 조정
                                zIndex={0} // 막대기를 동그라미보다 뒤에 위치
                            />
                        )}
                    </Flex>
                ))}
            </Flex>
        </Flex>
        {currentStep === 1 &&
            <Flex flexDirection="column" mb={6}>
                <Flex direction="column" p={4}>
                    <Text fontSize="ml" fontWeight="bold" color="gray.500">{user.user_id}님 오늘의 감정은 어때요?</Text>
                    <Flex alignItems="center" alignContent="center">
                        <Text fontSize="2xl" fontWeight="bold" color="#2C6E49" mr={1}>
                            {startDate.toLocaleDateString('ko-KR')} {/* 원하는 날짜 형식으로 표시 */}
                        </Text>
                        <IconButton
                            icon={<CalendarIcon />}
                            variant="ghost"
                            alignSelf="center" 
                            onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                            aria-label="Open calendar"
                            _hover={{ bg: 'transparent' }} // 마우스 오버 시 배경색을 투명하게 설정
                            _active={{ bg: 'transparent' }} // 클릭할 때 배경색을 투명하게 설정
                        />
                    </Flex>
                </Flex>
                    {isDatePickerOpen && (
                        <Flex pl={4} mb={7}>
                            <DatePicker
                                selected={startDate} // selected 속성에 Date 객체를 전달
                                onChange={handleDateChange} // onChange 핸들러 설정
                                dateFormat="yyyy/MM/dd" // 날짜 형식 설정
                                inline // 인라인으로 표시
                            />
                        </Flex>
                    )}
            </Flex>
        }
        {currentStep === 1 && <MoodCheck diaryStore={diaryStore} currentStep={currentStep} onPrevious={handlePrevStep} onNext={handleNextStep} />}
        {currentStep === 2 && <EventRecord diaryStore={diaryStore} currentStep={currentStep} onPrevious={handlePrevStep} onNext={handleNextStep} />}
        {currentStep === 3 && <EmotionAnalysis diaryStore={diaryStore} currentStep={currentStep} onPrevious={handlePrevStep} onNext={handleNextStep} />}
        {currentStep === 4 && <BehaviorAnalysis diaryStore={diaryStore} currentStep={currentStep} onPrevious={handlePrevStep} onNext={handleNextStep} />}
        {currentStep === 5 && <ResultEvaluation diaryStore={diaryStore} currentStep={currentStep} onPrevious={handlePrevStep} onNext={handleNextStep} />}
        {currentStep === 6 && <SelfSuggestion diaryStore={diaryStore} currentStep={currentStep} onPrevious={handlePrevStep} onNext={handleNextStep} />}  
    </>
});

export default DiaryEntryForm;