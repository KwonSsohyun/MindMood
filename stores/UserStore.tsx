/**
 * ▶ UserStore 스토어
 *
 * 사용자 전체일기 데이터 상태관리
 * - 사용자 날짜별 일기 데이터를 중앙 관리
 * - 일기 항목 추가, 수정, 삭제 기능 제공
 * - MobX의 관찰 가능 상태로 UI 자동 업데이트
 * - 리액트 컴포넌트와 실시간 연동
 */
import { makeAutoObservable } from 'mobx';
import axios from 'axios';
import { Diary } from '../types/diary';

export class UserStore {
    private user_id: string;
    private user_diaries: Diary[] = [];

    constructor() {
        makeAutoObservable(this);
    }    

    // ▶ Getter
    get userId() {
        return this.user_id;
    }

    get diaries() {
        return this.user_diaries;
    }

    // ▶ Setter
    set userId(userId: string) {
        this.user_id = userId;
    }

    // ▶ 데이터베이스 호출 메서드
    async fetchUserData(userId: string) {
        const response = await axios.get(`/api/getDiaries?userId=${userId}`);
        console.log("응답 데이터:", response.data);
        this.user_diaries = response.data;

    } catch (error) {
        console.error('사용자 데이터 가져오기 실패:', error);
        throw error; // 오류를 호출자에게 던짐
    }
}