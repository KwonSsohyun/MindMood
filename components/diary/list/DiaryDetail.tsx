/**
 * ▶ DiaryDetail 컴포넌트
 *
 * 감정 일기 상세
 * - 일기 항목 세부 정보 표시
 * - 수정 및 삭제 버튼
 */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Flex, IconButton, HStack, Box, Text, Center, Spinner, Button } from '@chakra-ui/react';
import { FaArrowLeft, FaRegEdit, FaRegTrashAlt, FaSave } from 'react-icons/fa';
import { useStore } from '../../../stores';
import DiaryEdit from './DiaryEdit';


export default function DiaryDetail() {
    const router = useRouter();
    const { id } = router.query; // URL에서 ID 추출
    const { userStore } = useStore();
    const [diary, setDiary] = useState(null);
    const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태

    useEffect(() => {
        if (id) {
            // userStore에서 해당 ID의 일기 데이터 가져오기
            const diaryEntry = userStore.diaries.find(d => d.diary_seq === Number(id));

            if (diaryEntry) { // diaryEntry가 존재하는지 확인
                setDiary(diaryEntry);
            }
        }
    }, [id, userStore.diaries]);

    const handleDelete = () => {
        // 삭제 로직 구현
        console.log(`Delete diary with ID: ${id}`);
    };

    const handleSave = () => {
        // 저장 로직 구현
        console.log(`Save diary with ID: ${id}`);
        setIsEditing(false); // 수정 모드 종료
    };

    if (!diary) {
        return <>
            <Center height="100vh">
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="#F5F3F5"
                    color="#4C956C"
                    size="xl"
                />
            </Center>
        </>
    }

    return <>
            <Flex justify="space-between" align="center" mb={4}>
                <IconButton
                    icon={<FaArrowLeft />} // 아이콘 설정
                    onClick={() => router.push('/diary/ListDiary')} // 뒤로 가기
                    aria-label="뒤로 가기"
                />
                <HStack spacing={2}>
                    {isEditing ? (
                        <IconButton
                            icon={<FaSave />}
                            onClick={handleSave} // 저장
                            aria-label="저장"
                        />
                    ) : (
                        <IconButton
                            icon={<FaRegEdit />}
                            onClick={() => setIsEditing(true)} // 수정 모드 전환
                            aria-label="수정"
                        />
                    )}
                    <IconButton
                        icon={<FaRegTrashAlt />}
                        onClick={handleDelete} // 삭제
                        aria-label="삭제"
                        colorScheme="red"
                    />
                </HStack>
            </Flex>

            {/* 수정 모드일 경우 DiaryEdit 컴포넌트를 렌더링 */}
            {isEditing ? (
                <DiaryEdit diary={diary} />
            ) : (
                <Box>
                    <Flex direction="column" p={4} mb={3}>
                        <Text fontSize="xl" fontWeight="bold">{new Date(diary.entry_date).toLocaleDateString('ko-KR')}</Text>
                    </Flex>

                    {/* 01. 오늘의 기분 점검 */}
                    <Flex direction="column" p={4} mb={3}>
                        <Flex>
                            <Text fontSize="2xl" fontWeight="bold" color="#2C6E49" mb={5}>오늘의 기분 점검</Text>
                        </Flex>
                        <Flex>
                            <Box borderWidth="2px" borderRadius="lg" p={10} px={7} mb={4} w="100%">
                                <Text fontSize="lg" fontWeight="bold" mb={5}>감정 이모지</Text>
                                <Text fontSize="2xl">{diary.mood_emoji}</Text>
                            </Box>
                        </Flex>
                        <Flex>
                            <Box borderWidth="2px" borderRadius="lg" p={10} px={7} mb={4} w="100%">
                                <Text fontSize="lg" fontWeight="bold" mb={5}>감정 강도</Text>
                                <Text fontSize="medium" fontWeight="bold" color="gray.600">{diary.mood_level}</Text>
                            </Box>
                        </Flex>
                    </Flex>

                    {/* 02. 사건 기록 */}
                    <Flex direction="column" p={4} mb={3}>
                        <Flex>
                            <Text fontSize="2xl" fontWeight="bold" color="#2C6E49" mb={5}>사건 기록</Text>
                        </Flex>
                        <Flex>
                            <Box borderWidth="2px" borderRadius="lg" p={10} px={7} mb={4} w="100%">
                                <Text fontSize="lg" fontWeight="bold" mb={5}>주요 사건</Text>
                                <Text fontSize="sm" fontWeight="bold" color="gray.600">{diary.event_info}</Text>
                            </Box>
                        </Flex>
                        <Flex>
                            <Box borderWidth="2px" borderRadius="lg" p={10} px={7} mb={4} w="100%">
                                <Text fontSize="lg" fontWeight="bold" mb={5}>함께한 사람</Text>
                                <Text fontSize="sm" fontWeight="bold" color="gray.600">{diary.event_with}</Text>
                            </Box>
                        </Flex>
                    </Flex>

                    {/* 03. 감정 탐구 */}
                    <Flex direction="column" p={4} mb={3}>
                        <Flex>
                            <Text fontSize="2xl" fontWeight="bold" color="#2C6E49" mb={5}>감정 탐구</Text>
                        </Flex>
                        <Flex>
                            <Box borderWidth="2px" borderRadius="lg" p={10} px={7} mb={4} w="100%">
                                <Text fontSize="lg" fontWeight="bold" mb={5}>주요 감정</Text>
                                <Text fontSize="sm" fontWeight="bold" color="gray.600">{diary.emotion_type}</Text>
                            </Box>
                        </Flex>
                        <Flex>
                            <Box borderWidth="2px" borderRadius="lg" p={10} px={7} mb={4} w="100%">
                                <Text fontSize="lg" fontWeight="bold" mb={5}>감정 이유</Text>
                                <Text fontSize="sm" fontWeight="bold" color="gray.600">{diary.emotion_detail}</Text>
                            </Box>
                        </Flex>
                    </Flex>

                    {/* 04. 행동/반응 분석 */}
                    <Flex direction="column" p={4} mb={3}>
                        <Flex>
                            <Text fontSize="2xl" fontWeight="bold" color="#2C6E49" mb={5}>행동/반응 분석</Text>
                        </Flex>
                        <Flex>
                            <Box borderWidth="2px" borderRadius="lg" p={10} px={7} mb={4} w="100%">
                                <Text fontSize="lg" fontWeight="bold" mb={5}>행동 기록</Text>
                                <Text fontSize="sm" fontWeight="bold" color="gray.600">{diary.behavior_style}</Text>
                            </Box>
                        </Flex>
                        <Flex>
                            <Box borderWidth="2px" borderRadius="lg" p={10} px={7} mb={4} w="100%">
                                <Text fontSize="lg" fontWeight="bold" mb={5}>행동 영향</Text>
                                <Text fontSize="sm" fontWeight="bold" color="gray.600">{diary.behavior_effect}</Text>
                            </Box>
                        </Flex>
                        <Flex>
                            <Box borderWidth="2px" borderRadius="lg" p={10} px={7} mb={4} w="100%">
                                <Text fontSize="lg" fontWeight="bold" mb={5}>미표현 이유</Text>
                                <Text fontSize="sm" fontWeight="bold" color="gray.600">{diary.behavior_reason}</Text>
                            </Box>
                        </Flex>
                    </Flex>

                    {/* 05. 결과 평가 */}
                    <Flex direction="column" p={4} mb={3}>
                        <Flex>
                            <Text fontSize="2xl" fontWeight="bold" color="#2C6E49" mb={5}>결과 평가</Text>
                        </Flex>
                        <Flex>
                            <Box borderWidth="2px" borderRadius="lg" p={10} px={7} mb={4} w="100%">
                                <Text fontSize="lg" fontWeight="bold" mb={5}>결과</Text>
                                <Text fontSize="sm" fontWeight="bold" color="gray.600">{diary.result_outcome}</Text>
                            </Box>
                        </Flex>
                        <Flex>
                            <Box borderWidth="2px" borderRadius="lg" p={10} px={7} mb={4} w="100%">
                                <Text fontSize="lg" fontWeight="bold" mb={5}>원하는 행동</Text>
                                <Text fontSize="sm" fontWeight="bold" color="gray.600">{diary.result_plan}</Text>
                            </Box>
                        </Flex>
                    </Flex>

                    {/* 06. 자기 제안 */}
                    <Flex direction="column" p={4} mb={3}>
                        <Flex>
                            <Text fontSize="2xl" fontWeight="bold" color="#2C6E49" mb={5}>자기 제안</Text>
                        </Flex>
                        <Flex>
                            <Box borderWidth="2px" borderRadius="lg" p={10} px={7} mb={4} w="100%">
                                <Text fontSize="lg" fontWeight="bold" mb={5}>느낀점 및 다짐</Text>
                                <Text fontSize="sm" fontWeight="bold" color="gray.600">{diary.self_goal}</Text>
                            </Box>
                        </Flex>
                    </Flex>
                </Box>
            )}
    </>
}