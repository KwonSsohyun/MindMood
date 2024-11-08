/**
 * ▶ DiaryEntryChart 컴포넌트
 *
 * 감정 차트 상위 컴포넌트
 * - 각 섹션 관리 : PieChart / LineChart 컴포넌트 렌더링
 */
import React, { useState, useEffect } from 'react';
import { Box, Button, Flex, Text, VStack, Icon } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { FaRegSadCry } from 'react-icons/fa';
import { observer } from 'mobx-react';
import { useStore } from '../../stores';
import dynamic from 'next/dynamic';
import { useSession } from '../../context/SessionContext';

// dynamic import로 설정하여 클라이언트 측에서만 로드
const PieChart = dynamic(() => import('./PieChart'), { ssr: false });
const LineChart = dynamic(() => import('./LineChart'), { ssr: false });


const DiaryEntryChart = observer(() => {

    const { userStore } = useStore();
    const { user } = useSession(); // 세션 정보 가져오기
    const diaries = userStore.diaries; // 전체 일기 목록
    const [currentDate, setCurrentDate] = useState(new Date()); // 현재 날짜 상태

    // 사용자 ID가 있을 경우에만 일기 목록을 가져옵니다.
    useEffect(() => {
        if (user?.userId) {
            userStore.fetchUserData(userStore.userId);
        }
    }, [user, userStore]);

    const handlePrevMonth = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    };

    // 현재 날짜에 해당하는 일기 필터링
    const filteredDiaries = diaries.filter(diary => {
        const diaryDate = new Date(diary.entry_date);
        return diaryDate.getFullYear() === currentDate.getFullYear() && diaryDate.getMonth() === currentDate.getMonth();
    });


    // ▶ 원 그래프 데이터
    const pieChartData = filteredDiaries.reduce((acc, diary) => {
        const existing = acc.find(item => item.id === diary.mood_emoji);
        if (existing) {
            existing.value += 1;
        } else {
            acc.push({ id: diary.mood_emoji, label: diary.mood_emoji, value: 1 });
        }
        return acc;
    }, []);


    // ▶ 선 그래프 데이터
    // 날짜 오름차순
    const sortedDiaries = [...filteredDiaries].sort(
        (a, b) => new Date(a.entry_date).getTime() - new Date(b.entry_date).getTime()
    );
    const lineChartData = [
        {
            id: '감정 추이',
            data: sortedDiaries.map(diary => ({
                x: new Date(diary.entry_date).getDate().toString(),
                y: diary.mood_level,
            })),
        },
    ];


    return <>        
        <VStack spacing={4} align="stretch">
            <Flex justify="space-between" align="center" mb={5}>
                <Button 
                    variant="ghost" 
                    _hover={{ bg: "white" }}
                    _active={{ bg: "white" }}
                    onClick={handlePrevMonth} 
                    leftIcon={<ChevronLeftIcon boxSize={6} />} 
                />
                <Text fontSize="xl" fontWeight="bold">{currentDate.toLocaleString('ko-KR', { year: 'numeric', month: 'long' })}</Text>
                <Button 
                    variant="ghost" 
                    _hover={{ bg: "white" }}
                    _active={{ bg: "white" }}
                    onClick={handleNextMonth} 
                    rightIcon={<ChevronRightIcon boxSize={6} />}
                />
            </Flex>
            {filteredDiaries.length === 0 ? (
                <Flex justify="center" align="center" mt={10}>
                    <Icon as={FaRegSadCry} mr={2} color="gray.500" />
                    <Text color="gray.500" fontWeight="bold" textAlign="center">
                        작성한 일기가 없습니다.
                    </Text>
                </Flex>
            ) : (
                <>
                    <PieChart data={pieChartData} />
                    <LineChart data={lineChartData} />
                </>
            )}
        </VStack>
    </>
});

export default DiaryEntryChart;