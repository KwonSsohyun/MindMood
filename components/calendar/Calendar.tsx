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
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/ko';
import styles from '../../styles/calendar.module.css';

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
                variant="solid" // 버튼의 스타일을 solid으로 변경
                bg="#4C956C"
                color="white"
                _hover={{ bg: "#2C6E49" }}
                mr={4} // 오른쪽 여백 추가
            >
                오늘
            </Button>
            <IconButton
                aria-label="이전"
                icon={<ChevronLeftIcon color="#2C6E49"/>}
                onClick={() => onNavigate('PREV')} // 이전 버튼 클릭 시 'PREV'로 탐색
                variant="ghost"
                _hover={{ bg: "#F5F3F5" }}
            />
            <Text fontSize="lg" fontWeight="bold" mx={4}>{label}</Text> {/* 달 이름 표시 */}
            <IconButton
                aria-label="다음"
                icon={<ChevronRightIcon color="#2C6E49"/>}
                onClick={() => onNavigate('NEXT')} // 다음 버튼 클릭 시 'NEXT'로 탐색
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
    console.log("diaries : ", diaries);

    // 일기 데이터를 Calendar 이벤트 형식으로 변환
    const events = diaries.map(diary => ({
        title: diary.mood_emoji, // 이모지 사용 (예: 😊)
        start: new Date(diary.entry_date), // 일기 작성일을 시작일로 설정
        end: new Date(diary.entry_date), // 일기 작성일을 종료일로 설정
    }));

    return <>
        <Box p={5} boxShadow="md" borderRadius="lg">
        <BigCalendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            views={['month']}  // 월 보기만 유지
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