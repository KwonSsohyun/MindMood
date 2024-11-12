/**
 * ▶ DiaryDetail 컴포넌트
 *
 * 감정 일기 상세
 * - 일기 항목 세부 정보 표시
 * - 수정 및 삭제 버튼
 */
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { Flex, IconButton, HStack, Box, Text, Center, Spinner, useMediaQuery } from '@chakra-ui/react';
import { Button, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from '@chakra-ui/react';
import { FaArrowLeft, FaRegEdit, FaRegTrashAlt, FaSave } from 'react-icons/fa';
import { useStore } from '../../../stores';
import DiaryEdit, { DiaryEditRef } from './DiaryEdit';


export default function DiaryDetail() {

    const diaryEditRef = useRef<DiaryEditRef>(null);
    const cancelRef = useRef();
    const [isDialogOpen, setIsDialogOpen] = useState(false); // 수정 팝업 상태
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // 삭제 팝업 상태

    const [isMobile] = useMediaQuery("(max-width: 480px)"); // 모바일 크기 기준

    const router = useRouter();
    const { id } = router.query; // URL에서 ID 추출
    const { userStore, diaryStore } = useStore();
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


    // ▶ 일기 데이터 수정
    const handleSave = async () => {
        setIsDialogOpen(false); // 팝업 닫기

        // 자식 컴포넌트의 onSave 호출
        if (diaryEditRef.current) {
            diaryEditRef.current.onSave(); 
        }

        try {
            // MobX 스토어 updateDiaryEntry 호출
            await diaryStore.updateDiaryEntry();
            // console.log('Diary updated successfully');
            
        } catch (error) {
            console.error('Failed to update diary:', error);
        }        

        setIsEditing(false); // 수정 모드 종료
    };


    // ▶ 일기 데이터 삭제
    const handleDelete = async () => {
        try {
            // MobX 스토어 deleteDiaryEntry 호출
            await diaryStore.deleteDiaryEntry(id);
            // console.log(`Diary with ID: ${id} deleted successfully`);
            router.push('/diary/ListDiary'); // 목록 페이지로 이동

        } catch (error) {
            console.error('Failed to delete diary:', error);
        }        
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
                            onClick={() => setIsDialogOpen(true)} // 저장
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
                        onClick={() => setIsDeleteDialogOpen(true)} // 삭제
                        aria-label="삭제"
                        colorScheme="red"
                    />
                </HStack>
            </Flex>

            {/* 삭제 확인 팝업 */}
            <AlertDialog
                isOpen={isDeleteDialogOpen}
                leastDestructiveRef={cancelRef}
                onClose={() => setIsDeleteDialogOpen(false)}
            >
                <AlertDialogOverlay
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <AlertDialogContent
                        margin="0 auto" // 수평 중앙 정렬
                        top="40%" // 수직 중앙을 위해 50% 이동
                        transform="translateY(-50%)" // 정확한 수직 중앙 배치
                        position="relative" // 위치 조정
                        {...(isMobile && { maxWidth: "90%", width: "80%" })} // 모바일일 때만 maxWidth와 width 적용
                    >
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            일기 삭제
                        </AlertDialogHeader>
                        <AlertDialogBody color="gray.600">
                            삭제한 일기는 복구할 수 없습니다.
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={() => setIsDeleteDialogOpen(false)}>
                                아니오
                            </Button>
                            <Button colorScheme="red" onClick={handleDelete} ml={3}>
                                삭제
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>


            {/* 수정 안내 팝업 */}
            <AlertDialog
                isOpen={isDialogOpen}
                leastDestructiveRef={cancelRef}
                onClose={() => setIsDialogOpen(false)}
            >
                <AlertDialogOverlay
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <AlertDialogContent
                        margin="0 auto" // 수평 중앙 정렬
                        top="40%" // 수직 중앙을 위해 50% 이동
                        transform="translateY(-50%)" // 정확한 수직 중앙 배치
                        position="relative" // 위치 조정
                        {...(isMobile && { maxWidth: "90%", width: "80%" })} // 모바일일 때만 maxWidth와 width 적용
                    >
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            일기 수정
                        </AlertDialogHeader>
                        <AlertDialogBody color="gray.600">
                            일기를 수정하시겠습니까?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={() => setIsDialogOpen(false)}>
                                아니오
                            </Button>
                            <Button colorScheme="green" onClick={handleSave} ml={3}>
                                수정하기
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>


            {/* 수정 모드일 경우 DiaryEdit 컴포넌트를 렌더링 */}
            {isEditing ? (
                <DiaryEdit diary={diary} ref={diaryEditRef} />
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
                                <Text fontSize="sm" fontWeight="bold" color="gray.600" whiteSpace="pre-line">{diary.event_info}</Text>
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
                                <Text fontSize="sm" fontWeight="bold" color="gray.600" whiteSpace="pre-line">{diary.emotion_type}</Text>
                            </Box>
                        </Flex>
                        <Flex>
                            <Box borderWidth="2px" borderRadius="lg" p={10} px={7} mb={4} w="100%">
                                <Text fontSize="lg" fontWeight="bold" mb={5}>감정 이유</Text>
                                <Text fontSize="sm" fontWeight="bold" color="gray.600" whiteSpace="pre-line">{diary.emotion_detail}</Text>
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
                                <Text fontSize="sm" fontWeight="bold" color="gray.600" whiteSpace="pre-line">{diary.behavior_style}</Text>
                            </Box>
                        </Flex>
                        <Flex>
                            <Box borderWidth="2px" borderRadius="lg" p={10} px={7} mb={4} w="100%">
                                <Text fontSize="lg" fontWeight="bold" mb={5}>행동 영향</Text>
                                <Text fontSize="sm" fontWeight="bold" color="gray.600" whiteSpace="pre-line">{diary.behavior_effect}</Text>
                            </Box>
                        </Flex>
                        <Flex>
                            <Box borderWidth="2px" borderRadius="lg" p={10} px={7} mb={4} w="100%">
                                <Text fontSize="lg" fontWeight="bold" mb={5}>미표현 이유</Text>
                                <Text fontSize="sm" fontWeight="bold" color="gray.600" whiteSpace="pre-line">{diary.behavior_reason}</Text>
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
                                <Text fontSize="sm" fontWeight="bold" color="gray.600" whiteSpace="pre-line">{diary.result_outcome}</Text>
                            </Box>
                        </Flex>
                        <Flex>
                            <Box borderWidth="2px" borderRadius="lg" p={10} px={7} mb={4} w="100%">
                                <Text fontSize="lg" fontWeight="bold" mb={5}>원하는 행동</Text>
                                <Text fontSize="sm" fontWeight="bold" color="gray.600" whiteSpace="pre-line">{diary.result_plan}</Text>
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
                                <Text fontSize="sm" fontWeight="bold" color="gray.600" whiteSpace="pre-line">{diary.self_goal}</Text>
                            </Box>
                        </Flex>
                    </Flex>
                </Box>
            )}
    </>
}