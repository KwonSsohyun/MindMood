/**
 * ▶ DiaryEntryForm 컴포넌트
 *
 * 감정 일기 작성 상위 컴포넌트
 * - 각 섹션 관리 : MoodCheck, EventRecord, EmotionAnalysis, BehaviorAnalysis, ResultEvaluation, SelfSuggestion
 */
import React, { useState } from 'react';
import { useStore } from '../../../stores'; // MobX 스토어 가져오기
import MoodCheck from '../form/MoodCheck';
import EventRecord from '../form/EventRecord';
import EmotionAnalysis from '../form/EmotionAnalysis';
import BehaviorAnalysis from '../form/BehaviorAnalysis';
import ResultEvaluation from '../form/ResultEvaluation';
import SelfSuggestion from '../form/SelfSuggestion';


export default function DiaryEntryForm() {

    // ▶ MobX 스토어 인스턴스 가져오기
    const { diaryStore } = useStore();

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

    // ▶ 다음 단계로 이동
    const handleNextStep = () => {
        setCurrentStep((prev) => prev + 1); 
    };

    return <>
        {currentStep === 1 && <MoodCheck diaryStore={diaryStore} onNext={handleNextStep} />}
        {currentStep === 2 && <EventRecord diaryStore={diaryStore} onNext={handleNextStep} />}
        {currentStep === 3 && <EmotionAnalysis diaryStore={diaryStore} onNext={handleNextStep} />}
        {currentStep === 4 && <BehaviorAnalysis diaryStore={diaryStore} onNext={handleNextStep} />}
        {currentStep === 5 && <ResultEvaluation diaryStore={diaryStore} onNext={handleNextStep} />}
        {currentStep === 6 && <SelfSuggestion diaryStore={diaryStore} onNext={handleNextStep} />}
    </>
}