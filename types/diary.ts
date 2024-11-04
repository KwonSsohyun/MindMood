/** 
 * ▶ diary 데이터 타입
 *
 * 감정 일기
 * - 각 섹션 데이터 구조 정의
 *   1) MoodCheck
 *      - 감정 강도
 *      - 감정 이모지
 *   2) EventRecord
 *      - 주요 사건
 *      - 함께한 사람
 *   3) EmotionAnalysis
 *      - 주요 감정
 *      - 감정 이유
 *   4) BehaviorAnalysis
 *      - 감정 표현 방식
 *      - 행동 영향
 *      - 미표현 이유
 *   5) ResultEvaluation
 *      - 사건 결과
 *      - 향후 행동 방안
 *   6) SelfSuggestion
 *      - 느낀점
 */
export interface Diary {
    diary_seq: number;       // 고유 식별자
    user_id: string;         // 사용자 ID
    mood_level: number;      // 감정 강도
    mood_emoji: string;      // 감정 이모지
    event_info: string;      // 주요 사건
    event_with: string;      // 함께한 사람
    emotion_type: string;    // 주요 감정
    emotion_detail: string;  // 감정 이유
    behavior_style: string;  // 행동 기록
    behavior_effect: string; // 행동 영향
    behavior_reason: string; // 미표현 이유
    result_outcome: string;  // 사건 결과
    result_plan: string;     // 미래 행동 계획
    self_goal: string;       // 느낀점 및 다짐
    entry_date: string;      // 일기 작성일
    create_date: string;     // 생성일
    update_date: string;     // 수정일
}