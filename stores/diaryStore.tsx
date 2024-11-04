/**
 * ▶ DiaryStore 스토어
 *
 * 감정일기 상태관리
 * - 사용자 날짜별 일기 데이터를 중앙 관리
 * - 일기 항목 추가, 수정, 삭제 기능 제공
 * - MobX의 관찰 가능 상태로 UI 자동 업데이트
 * - 리액트 컴포넌트와 실시간 연동
 */
import { makeAutoObservable, reaction } from 'mobx';
import axios from 'axios';
import { UserStore } from './UserStore';

export class DiaryStore {
    // ▶ 일기 필드
    private diary_seq: number;       // 고유 식별자
    private user_id: string;         // 사용자 ID
    private mood_level: number;      // 감정 강도
    private mood_emoji: string;      // 감정 이모지
    private event_info: string;      // 주요 사건
    private event_with: string;      // 함께한 사람
    private emotion_type: string;    // 주요 감정
    private emotion_detail: string;  // 감정 이유
    private behavior_style: string;  // 행동 기록
    private behavior_effect: string; // 행동 영향
    private behavior_reason: string; // 미표현 이유
    private result_outcome: string;  // 사건 결과
    private result_plan: string;     // 미래 행동 계획
    private self_goal: string;       // 느낀점 및 다짐
    private entry_date: string;      // 일기 작성일
    private create_date: string;     // 생성일
    private update_date: string;     // 수정일

    constructor(private userStore: UserStore) {
        makeAutoObservable(this);

        // entry_date가 변경될 때마다 UserStore의 데이터를 새로 가져오기
        reaction(
            () => this.entry_date, // 관찰할 상태
            async (newEntryDate) => {
                if (this.user_id) { // user_id가 설정되어 있을 경우에만 호출
                    await this.userStore.fetchUserData(this.user_id);
                }
            }
        );

        // update_date가 변경될 때마다 UserStore의 데이터를 새로 가져오기
        reaction(
            () => this.update_date, // 관찰할 상태
            async (newUpdateDate) => {
                if (this.user_id) { // user_id가 설정되어 있을 경우에만 호출
                    await this.userStore.fetchUserData(this.user_id);
                }
            }
        );
}

    // ▶ Getter
    get diarySeq() {
        return this.diary_seq;
    }

    get userId() {
        return this.user_id;
    }

    get moodLevel() {
        return this.mood_level;
    }

    get moodEmoji() {
        return this.mood_emoji;
    }

    get eventInfo() {
        return this.event_info;
    }

    get eventWith() {
        return this.event_with;
    }

    get emotionType() {
        return this.emotion_type;
    }

    get emotionDetail() {
        return this.emotion_detail;
    }

    get behaviorStyle() {
        return this.behavior_style;
    }

    get behaviorEffect() {
        return this.behavior_effect;
    }

    get behaviorReason() {
        return this.behavior_reason;
    }

    get resultOutcome() {
        return this.result_outcome;
    }

    get resultPlan() {
        return this.result_plan;
    }

    get selfGoal() {
        return this.self_goal;
    }

    get entryDate() {
        return this.entry_date;
    }

    get createDate() {
        return this.create_date;
    }

    get updateDate() {
        return this.update_date;
    }


    // ▶ Setter
    set diarySeq(seq: number) {
        this.diary_seq = seq;
    }

    set userId(userId: string) {
        this.user_id = userId;
    }

    set moodLevel(level: number) {
        this.mood_level = level;
    }

    set moodEmoji(emoji: string) {
        this.mood_emoji = emoji;
    }

    set eventInfo(info: string) {
        this.event_info = info;
    }

    set eventWith(person: string) {
        this.event_with = person;
    }

    set emotionType(type: string) {
        this.emotion_type = type;
    }

    set emotionDetail(detail: string) {
        this.emotion_detail = detail;
    }

    set behaviorStyle(style: string) {
        this.behavior_style = style;
    }

    set behaviorEffect(effect: string) {
        this.behavior_effect = effect;
    }

    set behaviorReason(reason: string) {
        this.behavior_reason = reason;
    }

    set resultOutcome(outcome: string) {
        this.result_outcome = outcome;
    }

    set resultPlan(plan: string) {
        this.result_plan = plan;
    }

    set selfGoal(goal: string) {
        this.self_goal = goal;
    }

    set entryDate(entryDate: string) {
        this.entry_date = entryDate;
    }

    set createDate(createDate: string) {
        this.create_date = createDate;
    }

    set updateDate(updateDate: string) {
        this.update_date = updateDate;
    }

    // ▶ 스토어 리셋 메서드
    resetStore = () => {
        Object.assign(this, {
            diary_seq: null,
            user_id: '',
            mood_level: null,
            mood_emoji: '',
            event_info: '',
            event_with: '',
            emotion_type: '',
            emotion_detail: '',
            behavior_style: '',
            behavior_effect: '',
            behavior_reason: '',
            result_outcome: '',
            result_plan: '',
            self_goal: '',
            entry_date: '',
            create_date: '',
            update_date: ''
        });
    };    

    // ▶ 데이터베이스 저장 메서드(API 호출하여 저장)
    async saveDiaryEntry() {
        const diaryData =  {
            user_id: this.user_id,
            mood_level: this.mood_level,
            mood_emoji: this.mood_emoji,
            event_info: this.event_info,
            event_with: this.event_with,
            emotion_type: this.emotion_type,
            emotion_detail: this.emotion_detail,
            behavior_style: this.behavior_style,
            behavior_effect: this.behavior_effect,
            behavior_reason: this.behavior_reason,
            result_outcome: this.result_outcome,
            result_plan: this.result_plan,
            self_goal: this.self_goal,
            entry_date: this.entry_date
        };
        try {
            const response = await axios.post('/api/createDiary', diaryData);
            console.log('일기 저장 성공 :', response.data);

            // UserStore의 fetchUserData 호출하여 최신값으로 업데이트
            try {
                await this.userStore.fetchUserData(this.user_id);
            } catch (error) {
                console.error('사용자 데이터 업데이트 실패:', error.message);
                throw new Error('사용자 데이터를 업데이트하는 중 오류가 발생했습니다.');
            }        

            this.resetStore(); // 저장 후 필드 초기화

        } catch (error) {
            if (error.response) {
                // 서버가 응답했으나 상태 코드가 2xx가 아닌 경우
                console.error('일기 저장 실패 :', error.response.data.error);
                throw new Error(error.response.data.error); // 사용자에게 보여줄 에러 메시지
            } else {
                // 네트워크 오류 등
                console.error('일기 저장 실패 :', error.message);
                throw new Error('일기 저장 중 오류가 발생했습니다.'); // 사용자에게 보여줄 일반 오류 메시지
            }
        }
    }
}