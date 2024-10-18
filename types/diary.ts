/** 
 * ▶ diary 데이터 타입
 *
 * 감정 일기
 * - 각 섹션 데이터 구조 정의
 *   1) MoodCheck
 *      - 감정 강도 (number) : 선택된 감정 강도 선택
 *      - 감정 이모지 (string) : 선택된 감정 이모지 선택
 *   2) EventRecord
 *      - 주요 사건 (string) : 기록할 사건 내용
 *      - 함께한 사람 (string[]) : 사건에 함께한 사람 선택
 *   3) EmotionAnalysis
 *      - 주요 감정 (string): 감정 선택
 *      - 감정 이유 (string): 해당 감정의 이유 작성
 *   4) BehaviorAnalysis
 *      - 감정 표현 방식 (string) : 감정을 표현한 방식 작성
 *      - 행동 영향 (string) : 행동이 미친 영향 작성
 *      - 미표현 이유 (string): 감정을 표현하지 않은 이유 작성
 *   5) ResultEvaluation
 *      - 사건 결과 (string) : 사건에 대한 결과 작성
 *      - 향후 행동 방안 (string) : 향후 계획 작성
 *   6) SelfSuggestion
 *      - 느낀점 (string): 자기 제안 작성
 */