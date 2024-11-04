/**
 * ▶ DiaryList 컴포넌트
 *
 * 감정 일기 목록
 * - 최근 한 달간의 일기 목록
 * - 각 일기 선택 시 DiaryDetail 컴포넌트로 이동
 */
import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Text, VStack, Tag, Icon } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { FaRegSadCry, FaRegSmile, FaUserCircle } from 'react-icons/fa';
import { useStore } from '../../../stores';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';

const DiaryList = observer(() => {
    const { userStore } = useStore();
    const diaries = userStore.diaries; // 전체 일기 목록
    const router = useRouter();
    const [currentDate, setCurrentDate] = useState(new Date()); // 현재 날짜 상태

    // 사용자 ID가 있을 경우에만 일기 목록을 가져옵니다.
    useEffect(() => {
        if (userStore.userId) {
            userStore.fetchUserData(userStore.userId);
        }
    }, [userStore]);

    const handleDiaryClick = (diarySeq) => {
        router.push(`/diary/${diarySeq}`); // 클릭한 일기의 상세 페이지로 이동
    };

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
                filteredDiaries.map(diary => (
                    <Box borderWidth="1px" w="100%"
                        key={diary.diary_seq}
                        borderRadius="md"
                        p={4}
                        onClick={() => handleDiaryClick(diary.diary_seq)}
                        cursor="pointer"
                        _hover={{ bg: "#eef6f1", border: "1px solid #4C956C" }}
                    >
                        <Flex direction="column">
                            <Flex align="center" mb={2}>
                                <Text fontSize="4xl" mr={2}>{diary.mood_emoji}</Text>
                                <Text fontWeight="bold" color="gray.500"> 
                                    {new Date(diary.entry_date).toLocaleDateString('ko-KR', { 
                                        weekday: 'long', month: 'long', day: 'numeric' 
                                    })}
                                </Text>
                            </Flex>
                            <Flex>
                                <Text mb={5} px={2} fontWeight="bold" noOfLines={1}>
                                    {diary.event_info.length > 50 ? diary.event_info.slice(0, 50) + '...' : diary.event_info}
                                </Text>
                            </Flex>
                            <Flex align="center" wrap="wrap">
                                <Tag 
                                    bg="white" 
                                    color="gray.500"
                                    border="1px solid #D6E7DB"
                                    borderRadius={100}
                                    fontWeight="bold"
                                    fontSize={'sm'}
                                    px={4}
                                    h={35}
                                    mr={2} 
                                    mb={2}
                                > 
                                    <FaRegSmile style={{ marginRight: 7, color: "#4C956C"}} />
                                    감정 강도 : {diary.mood_level}
                                </Tag>
                                <Tag 
                                    bg="white" 
                                    color="gray.500"
                                    border="1px solid #D6E7DB"
                                    borderRadius={100}
                                    fontWeight="bold"
                                    fontSize={'sm'}
                                    px={4}
                                    h={35}
                                    mr={2} 
                                    mb={2}
                                > 
                                    <FaUserCircle style={{ marginRight: 7, color: "#4C956C"}} />
                                    함께한 사람 : {diary.event_with}
                                </Tag>
                            </Flex>
                        </Flex>
                    </Box>
                ))
            )}
        </VStack>
    </>
});

export default DiaryList;