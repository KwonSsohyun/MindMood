/**
 * ▶ Calendar 컴포넌트
 *
 * 감정 달력
 * - 메인 페이지
 * - 현재 연도의 월 표시
 * - 각 날짜에 감정 이모지 표시(작성 안 한 날짜는 빈 칸)
 */
import React from 'react';
import { useStore } from '../../stores';
import { IconButton, Box, Flex, Text, Button } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import { useRouter } from 'next/router';
import moment from 'moment';
import 'moment/locale/ko';


// Moment.js의 로컬라이저를 한국어로 설정
moment.locale('ko');
const localizer = momentLocalizer(moment);


// 통합된 커스텀 툴바 컴포넌트
function CustomToolbar({ label, onNavigate }) {
    return (
        <Flex justify="center" align="center" mb={4}>
            <Button
                aria-label="오늘"
                onClick={() => onNavigate('TODAY')} // 오늘 버튼 클릭 시 오늘로 이동
                variant="solid"
                bg="#4C956C"
                color="white"
                _hover={{ bg: "#2C6E49" }}
                mr={4}
            >
                오늘
            </Button>
            <IconButton
                aria-label="이전"
                icon={<ChevronLeftIcon color="#2C6E49"/>}
                onClick={() => onNavigate('PREV')} // 이전 버튼 클릭 시 'PREV'
                variant="ghost"
                _hover={{ bg: "#F5F3F5" }}
            />
            <Text fontSize="lg" fontWeight="bold" mx={4}>{label}</Text> {/* 달 이름 표시 */}
            <IconButton
                aria-label="다음"
                icon={<ChevronRightIcon color="#2C6E49"/>}
                onClick={() => onNavigate('NEXT')} // 다음 버튼 클릭 시 'NEXT'
                variant="ghost"
                _hover={{ bg: "#F5F3F5" }}
            />
        </Flex>
    );
}


export default function Calendar() {

    // ▶ MobX 스토어 인스턴스 가져오기
    const { userStore } = useStore();
    const diaries = userStore.diaries;
    // console.log("diaries : ", diaries);

    const router = useRouter();

    // ▶ 로컬 시간대 기준 오늘 날짜
    const today = new Date();

    // ▶ 일기 데이터를 Calendar 이벤트 형식으로 변환
    const events = diaries.map(diary => ({
        title: diary.mood_emoji, // 이모지 사용 (예: 😊)
        start: new Date(diary.entry_date), // 일기 작성일을 시작일로 설정
        end: new Date(diary.entry_date), // 일기 작성일을 종료일로 설정
    }));

    // ▶ 날짜 선택 시 유효성 검사 함수
    const isValidDate = (date) => {
        return date instanceof Date && !isNaN(date.getTime());
    };

    // ▶ 날짜 선택 시 실행될 함수
    const handleSelectDate = async (date) => {
        // date가 없거나 유효하지 않으면 로그 출력 후 종료
        if (!date || !isValidDate(date)) {
            console.warn("유효하지 않은 날짜가 선택되었습니다:", date);
            return;
        }

        // 오늘 날짜 확인 (오늘 이후의 날짜 선택 방지)
        const today = new Date();
        if (date > today) {
            console.warn("미래의 날짜는 선택할 수 없습니다:", date);
            return;
        }

        const existingDiary = diaries.find(diary =>
            new Date(diary.entry_date).toDateString() === date.toDateString()
        );

        // 한국 시간 기준의 날짜 문자열 생성
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const localDateString = `${year}-${month}-${day}`;

        try {
            if (router.isReady) {
                if (existingDiary) {
                    await router.push(`/diary/${existingDiary.diary_seq}`);
                } else {
                    await router.push(`/diary/NewDiary?date=${localDateString}`);
                }
            }
        } catch (error) {
            console.error("라우팅 중 오류가 발생했습니다:", error);
        }
    };

    return <>
        <Box p={5} boxShadow="md" borderRadius="lg">
        <BigCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            views={['month']}  // 월 보기만 유지
            selectable={true}
            onSelectEvent={(event) => {
                // 선택된 날짜가 오늘 이전인지 확인
                if (event && isValidDate(event.start) && event.start <= today) {
                    // console.log("선택된 이벤트 정보:", event);
                    handleSelectDate(event.start);
                } else {
                    console.warn("유효하지 않은 이벤트가 선택되었습니다:", event);
                }
            }}
            onSelectSlot={(slotInfo) => {
                // 선택된 날짜가 오늘 이전인지 확인
                if (slotInfo && isValidDate(slotInfo.start) && slotInfo.start <= today) {
                    // console.log("선택된 슬롯 정보:", slotInfo);
                    handleSelectDate(slotInfo.start);
                } else {
                    console.warn("유효하지 않은 슬롯이 선택되었습니다:", slotInfo);
                }
            }}
            longPressThreshold={1} // 터치 반응 민감도 낮춤
            components={{
                toolbar: CustomToolbar, // 툴바 커스터마이징
            }}
            formats={{
                monthHeaderFormat: (date, culture, localizer) => 
                    localizer.format(date, 'YYYY년 M월', culture),  // "YYYY년 M월" 형식
            }}
        />
        </Box>
    </>
}