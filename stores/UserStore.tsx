/**
 * ▶ UserStore 스토어
 *
 * 사용자 전체일기 데이터 상태관리
 * - 사용자 날짜별 일기 데이터를 중앙 관리
 * - 일기 항목 추가, 수정, 삭제 기능 제공
 * - MobX의 관찰 가능 상태로 UI 자동 업데이트
 * - 리액트 컴포넌트와 실시간 연동
 */
import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';
import { Diary } from '../types/diary';
import { DiaryStore } from './DiaryStore';

export class UserStore {
    private user_id: string;
    private user_diaries: Diary[] = [];
    private user_existingDates: string[] = [];
    public diaryStore: DiaryStore; // DiaryStore의 참조

    constructor(diaryStore: DiaryStore) {

        this.diaryStore = diaryStore; // DiaryStore 인스턴스를 전달받아 초기화
        makeAutoObservable(this);

        // 페이지 로드 시 LocalStorage에서 데이터 불러오기
        if (typeof window !== 'undefined') {
            this.loadFromLocalStorage();
        }
    }

    // Local Storage에 데이터 저장
    saveToLocalStorage() {
        if (typeof window !== 'undefined') {
            localStorage.setItem('userStore', JSON.stringify({
                user_id: this.user_id,
                user_diaries: this.user_diaries,
                user_existingDates: this.user_existingDates,
            }));
        }
    }

    // LocalStorage에서 데이터 불러오기
    loadFromLocalStorage() {
        if (typeof window !== 'undefined') {
            const storedData = localStorage.getItem('userStore');
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                this.user_id = parsedData.user_id;
                this.user_diaries = parsedData.user_diaries;
                this.user_existingDates = parsedData.user_existingDates;

                if (this.diaryStore) {
                    this.diaryStore.setUserId(this.user_id);
                }
            }
        }
    }

    // DiaryStore와 user_id 동기화 메서드
    setUserId(userId: string) {
        this.user_id = userId;
        this.diaryStore?.setUserId(userId); // DiaryStore에도 설정
        this.saveToLocalStorage();
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
        this.setUserId(userId); // DiaryStore와 동기화
    }

    set userExistingDates(userExistingDates: string[]) {
        this.user_existingDates = userExistingDates;
    }

    // ▶ 전체 일기 데이터 호출 메서드
    async fetchUserData(userId: string) {
        const response = await axios.get(`/api/getDiaries?userId=${userId}`, {
            headers: { 'Cache-Control': 'no-cache' }
        });
        runInAction(() => {
            this.user_diaries = response.data;
            this.setUserId(userId); // DiaryStore와 동기화
        });

    } catch (error) {
        console.error('사용자 데이터 가져오기 실패:', error);
        throw error; // 오류를 호출자에게 던짐
    }


    // ▶ 작성된 날짜 목록 가져오기 메서드
    async getExistingDates(userId: string) {
        try {
            const response = await axios.get(`/api/getExistingDates`, {
                params: { userId }
            });
            this.user_existingDates = response.data.existingDates;
            // console.log("userExistingDates : ", this.user_existingDates);

        } catch (error) {
            console.error('작성된 날짜 조회 실패:', error);
            throw new Error('작성된 날짜를 조회하는 중 오류가 발생했습니다.');
        }
    }
}