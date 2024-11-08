import { UserStore } from './UserStore';
import { DiaryStore } from './DiaryStore';

// ▶ MobX 스토어 인스턴스 생성 (순환 참조 설정)
const userStore = new UserStore(null as unknown as DiaryStore); // 일단 null로 초기화
const diaryStore = new DiaryStore(userStore); // DiaryStore에 userStore 전달

// 이제 userStore에 diaryStore를 연결
userStore.diaryStore = diaryStore;

// ▶ 여러 MobX 스토어를 객체로 묶습니다.
const useStore = () => ({
    userStore,
    diaryStore,
});

// ▶ MobX 스토어 객체 내보내기
export { useStore };