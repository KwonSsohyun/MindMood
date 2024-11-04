import { UserStore } from './UserStore';
import { DiaryStore } from './DiaryStore';

// ▶ MobX 스토어 인스턴스 생성
const userStore = new UserStore();
const diaryStore = new DiaryStore(userStore);

// ▶ 여러 MobX 스토어를 객체로 묶습니다.
const useStore = () => ({
    userStore,
    diaryStore,
});

// ▶ MobX 스토어 객체 내보내기
export { useStore };