/**
 * ▶ Header 컴포넌트
 *
 * 공통 헤더 레이아웃
 */
import React, { useEffect } from 'react';
import { Box, Flex, Text, Link, IconButton, Button, useToast, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { Spinner, Center } from '@chakra-ui/react';
import { FiLogOut, FiMenu } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { useSession } from '../../context/SessionContext';

export default function Header() {

    const router = useRouter();
    const toast = useToast();
    const { isOpen, onClose, onOpen } = useDisclosure();
    const { user, loading, setUser } = useSession();

    const handleLogout = async () => {
        try {
            const response = await fetch('/api/session', {
                method: 'DELETE', // 로그아웃 처리
            });

            if (response.ok) {
                setUser(null); // 세션에서 사용자 정보 삭제
                toast({
                    title: "로그아웃 성공",
                    description: "로그아웃되었습니다.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                // 로그인 페이지로 이동
                router.push('/login');

            } else {
                const errorData = await response.json();
                toast({
                    title: "로그아웃 실패",
                    description: errorData.message,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error('로그아웃 오류:', error);
            toast({
                title: "오류",
                description: "로그아웃 중 오류가 발생했습니다.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    // 로딩 중일 경우 표시할 컴포넌트
    if (loading) {
        return (
            <Center height="100vh">
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="#F5F3F5"
                    color="#4C956C"
                    size="xl"
                />
            </Center>
        );
    }

    return <>
        <Box as="header" position="fixed" top="0" left="0" width="100%" bg="white" boxShadow="md" zIndex="1000">
            <Flex justify={{ base: "space-between", md: "space-around" }} ml={{ base: 4, md: 0 }} align="center" p={4}>
                <Link 
                    _hover={{ color: "#2C6E49", textDecoration: "none" }} 
                    onClick={(e) => {
                        if (!user) {
                            e.preventDefault(); // 링크 클릭 시 기본 동작 방지
                        } else {
                            router.push('/'); // 세션이 있을 때 페이지 이동
                        }
                    }}
                >
                    <Text fontSize="xl" fontWeight="bold">MindMood</Text>
                </Link>
                <Flex align="center" justify="center" display={{ base: "block", md: "none" }}> {/* 모바일에서만 표시 */}
                    {/* 세션이 있을 때만 로그아웃 버튼 표시 */}
                    {user && ( 
                    <IconButton
                            icon={<FiMenu />}
                            aria-label="Menu"
                            variant="ghost"
                            alignSelf="center" 
                            onClick={onOpen}
                            display={{ base: "block", md: "none" }}
                            _hover={{ bg: 'transparent' }} // 마우스 오버 시 배경색을 투명하게 설정
                            _active={{ bg: 'transparent' }} // 클릭할 때 배경색을 투명하게 설정
                    />
                    )}
                </Flex>
                <Flex display={{ base: "none", md: "flex" }} fontWeight="bold" align="center"> {/* 데스크탑에서만 표시 */}
                    <Flex align="center">
                        <Flex align="center">
                            {user && ( // user가 존재할 때만 메뉴 표시
                            <>
                            <Link 
                                mx={10} 
                                fontSize="lg" 
                                textDecoration="none" // 밑줄 없애기
                                color="black" // 기본 색상 설정
                                _hover={{ color: user ? "#2C6E49" : "black"}}
                                onClick={(e) => {
                                    if (!user) {
                                        e.preventDefault(); // 링크 클릭 시 기본 동작 방지
                                    } else {
                                        router.push('/diary/ListDiary'); // 세션이 있을 때 페이지 이동
                                    }
                                }}
                            >
                                일기 목록
                            </Link>
                            <Link 
                                mx={10} 
                                fontSize="lg" 
                                textDecoration="none" 
                                color="black" 
                                _hover={{ color: user ? "#2C6E49" : "black"}}
                                onClick={(e) => {
                                    if (!user) {
                                        e.preventDefault(); // 링크 클릭 시 기본 동작 방지
                                    } else {
                                        router.push('/diary/NewDiary'); // 세션이 있을 때 페이지 이동
                                    }
                                }}
                            >
                                일기 작성
                            </Link>
                            <Link 
                                mx={10} 
                                fontSize="lg" 
                                textDecoration="none" 
                                color="black" 
                                _hover={{ color: user ? "#2C6E49" : "black"}}
                                onClick={(e) => {
                                    if (!user) {
                                        e.preventDefault(); // 링크 클릭 시 기본 동작 방지
                                    } else {
                                        router.push('/chart'); // 세션이 있을 때 페이지 이동
                                    }
                                }}
                            >
                                감정 차트
                            </Link>
                            </>
                            )}
                        </Flex>
                        <Flex align="center">
                            {/* 세션이 있을 때만 로그아웃 버튼 표시 */}
                            {user && ( 
                                <Button
                                    aria-label="Logout"
                                    leftIcon={<FiLogOut />}
                                    onClick={handleLogout}
                                    ml={4}
                                    variant="outline"
                                    color="#D68C45"
                                    borderColor="#D68C45"
                                    fontWeight="bold"
                                    _hover={{ bg: "#D68C45", color: "white" }}
                                >
                                    {user.user_id} 로그아웃
                                </Button>
                            )}
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Box>      
        
        {/* 드로어 추가 */}
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>메뉴</DrawerHeader>
                    <DrawerBody>
                        <Flex direction="column" justify="space-between" height="100%">
                            <Flex direction="column" mb={4}>
                                {user && ( // user가 존재할 때만 메뉴 표시
                                <>
                                <Link 
                                    mb={6} 
                                    fontSize="2xl" 
                                    fontWeight="bold"
                                    textDecoration="none" // 밑줄 없애기
                                    color="black" // 기본 색상 설정
                                    _hover={{ color: user ? "#2C6E49" : "black"}}
                                    onClick={(e) => {
                                        if (!user) {
                                            e.preventDefault(); // 링크 클릭 시 기본 동작 방지
                                        } else {
                                            router.push('/diary/ListDiary'); // 세션이 있을 때 페이지 이동
                                            onClose(); // 드로어 닫기
                                        }
                                    }}
                                >
                                    일기 목록
                                </Link>
                                <Link 
                                    mb={6} 
                                    fontSize="2xl" 
                                    fontWeight="bold"
                                    textDecoration="none" 
                                    color="black" 
                                    _hover={{ color: user ? "#2C6E49" : "black"}}
                                    onClick={(e) => {
                                        if (!user) {
                                            e.preventDefault(); // 링크 클릭 시 기본 동작 방지
                                        } else {
                                            router.push('/diary/NewDiary'); // 세션이 있을 때 페이지 이동
                                            onClose(); // 드로어 닫기
                                        }
                                    }}
                                >
                                    일기 작성
                                </Link>
                                <Link 
                                    mb={20} 
                                    fontSize="2xl" 
                                    fontWeight="bold"
                                    textDecoration="none" 
                                    color="black" 
                                    _hover={{ color: user ? "#2C6E49" : "black"}}
                                    onClick={(e) => {
                                        if (!user) {
                                            e.preventDefault(); // 링크 클릭 시 기본 동작 방지
                                        } else {
                                            router.push('/chart'); // 세션이 있을 때 페이지 이동
                                            onClose(); // 드로어 닫기
                                        }
                                    }}
                                >
                                    감정 차트
                                </Link>
                            </>
                            )}
                            </Flex>
                            <Flex direction="column" mb={10}>
                            {user && ( 
                                <Button
                                    onClick={() => {
                                        handleLogout(); // 로그아웃 처리
                                        onClose(); // 드로어 닫기
                                    }}
                                    leftIcon={<FiLogOut />}
                                    variant="outline"
                                    color="#D68C45"
                                    borderColor="#D68C45"
                                    fontWeight="bold"
                                    _hover={{ bg: "#D68C45", color: "white" }}
                                >
                                    {user.user_id} 로그아웃
                                </Button>
                            )}
                            </Flex>
                        </Flex>
                    </DrawerBody>
                </DrawerContent>
        </Drawer>

    </>
}