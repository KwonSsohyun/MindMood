import { DiaryStore } from './diaryStore';

// ▶ MobX 스토어 인스턴스 생성
const diaryStore = new DiaryStore();

// ▶ 여러 MobX 스토어를 객체로 묶습니다.
const useStore = () => ({
    diaryStore, 
});

// ▶ MobX 스토어 객체 내보내기
export { useStore };