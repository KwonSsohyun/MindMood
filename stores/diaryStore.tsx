/**
 * ▶ DiaryStore 스토어
 *
 * 감정일기 상태관리
 * - 사용자 날짜별 일기 데이터를 중앙 관리
 * - 일기 항목 추가, 수정, 삭제 기능 제공
 * - MobX의 관찰 가능 상태로 UI 자동 업데이트
 * - 리액트 컴포넌트와 실시간 연동
 */
import { makeAutoObservable } from 'mobx';

export class DiaryStore {
    // ▶ 일기 필드
    diarySeq: number;       // 고유 식별자
    userId: string;         // 사용자 ID
    moodLevel: number;      // 감정 강도
    moodEmoji: string;      // 감정 이모지
    eventInfo: string;      // 주요 사건
    eventWith: string;      // 함께한 사람
    emotionType: string;    // 주요 감정
    emotionDetail: string;  // 감정 이유
    behaviorStyle: string;  // 행동 기록
    behaviorEffect: string; // 행동 영향
    behaviorReason: string; // 미표현 이유
    resultOutcome: string;  // 사건 결과
    resultPlan: string;     // 미래 행동 계획
    selfGoal: string;       // 느낀점 및 다짐
    createDate: string;     // 작성일
    updateDate: string;     // 수정일

    constructor() {
        makeAutoObservable(this);
    }

    // ▶ 상태 업데이트 메서드
    setDiarySeq(seq: number) {
        this.diarySeq = seq;
    }

    setUserId(userId: string) {
        this.userId = userId;
    }

    setMoodLevel(level: number) {
        this.moodLevel = level;
    }

    setMoodEmoji(emoji: string) {
        this.moodEmoji = emoji;
    }

    setEventInfo(info: string) {
        this.eventInfo = info;
    }

    setEventWith(person: string) {
        this.eventWith = person;
    }

    setEmotionType(type: string) {
        this.emotionType = type;
    }

    setEmotionDetail(detail: string) {
        this.emotionDetail = detail;
    }

    setBehaviorStyle(style: string) {
        this.behaviorStyle = style;
    }

    setBehaviorEffect(effect: string) {
        this.behaviorEffect = effect;
    }

    setBehaviorReason(reason: string) {
        this.behaviorReason = reason;
    }

    setResultOutcome(outcome: string) {
        this.resultOutcome = outcome;
    }

    setResultPlan(plan: string) {
        this.resultPlan = plan;
    }

    setSelfGoal(goal: string) {
        this.selfGoal = goal;
    }

    setCreateDate(createDate: string) {
        this.createDate = createDate;
    }

    setUpdateDate(updateDate: string) {
        this.updateDate = updateDate;
    }


    // ▶ 상태 조회 메서드 (Getter)
    getDiarySeq() {
        return this.diarySeq;
    }

    getUserId() {
        return this.userId;
    }

    getMoodLevel() {
        return this.moodLevel;
    }

    getMoodEmoji() {
        return this.moodEmoji;
    }

    getEventInfo() {
        return this.eventInfo;
    }

    getEventWith() {
        return this.eventWith;
    }

    getEmotionType() {
        return this.emotionType;
    }

    getEmotionDetail() {
        return this.emotionDetail;
    }

    getBehaviorStyle() {
        return this.behaviorStyle;
    }

    getBehaviorEffect() {
        return this.behaviorEffect;
    }

    getBehaviorReason() {
        return this.behaviorReason;
    }

    getResultOutcome() {
        return this.resultOutcome;
    }

    getResultPlan() {
        return this.resultPlan;
    }

    getSelfGoal() {
        return this.selfGoal;
    }

    getCreateDate() {
        return this.createDate;
    }

    getUpdateDate() {
        return this.updateDate;
    }


    // ▶ 최종 저장 메서드
    saveDiaryEntry() {
        // 데이터베이스에 저장하는 로직 구현
        // 예: API 호출하여 저장
    }
}