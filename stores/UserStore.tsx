/**
 * ▶ UserStore 스토어
 *
 * 사용자 전체일기 데이터 상태관리
 * - 사용자 날짜별 일기 데이터를 중앙 관리
 * - 일기 항목 추가, 수정, 삭제 기능 제공
 * - MobX의 관찰 가능 상태로 UI 자동 업데이트
 * - 리액트 컴포넌트와 실시간 연동
 */
import { makeAutoObservable, action, runInAction } from 'mobx';
import axios from 'axios';
import { Diary } from '../types/diary';

export class UserStore {
    private user_id: string;
    private user_diaries: Diary[] = [];
    private user_existingDates: string[] = [];

    constructor() {
        makeAutoObservable(this), {
            fetchUserData: action, // fetchUserData를 action으로 지정
        };
    }    

    // ▶ Getter
    get userId() {
        return this.user_id;
    }

    get diaries() {
        return this.user_diaries;
    }

    get userExistingDates() {
        return this.user_existingDates;
    }

    // ▶ Setter
    set userId(userId: string) {
        this.user_id = userId;
    }

    set userExistingDates(userExistingDates: string[]) {
        this.user_existingDates = userExistingDates;
    }

    // ▶ 전체 일기 데이터 호출 메서드
    async fetchUserData(userId: string) {
        const response = await axios.get(`/api/getDiaries?userId=${userId}`);
        runInAction(() => {
            this.user_diaries = response.data;
            // 응답에서 user_id만 추출해서 저장
            this.user_id = userId;
        });

    } catch (error) {
        console.error('사용자 데이터 가져오기 실패:', error);
        throw error; // 오류를 호출자에게 던짐
    }


    // ▶ 작성된 날짜 목록 가져오기 메서드
    async getExistingDates() {
        try {
            const response = await axios.get(`/api/getExistingDates`, {
                params: { userId: this.user_id }
            });
            this.user_existingDates = response.data.existingDates;
            // console.log("userExistingDates : ", this.user_existingDates);

        } catch (error) {
            console.error('작성된 날짜 조회 실패:', error);
            throw new Error('작성된 날짜를 조회하는 중 오류가 발생했습니다.');
        }
    }
}