/**
 * ▶ TopButton 컴포넌트
 *
 * 공통 탑 버튼 레이아웃
 */
import React, { useEffect, useState } from 'react';
import { IconButton, useBreakpointValue } from '@chakra-ui/react';
import { ChevronUpIcon } from '@chakra-ui/icons';

export default function TopButton() {

    const [isVisible, setIsVisible] = useState(false);

    // 모바일과 비모바일에서 다른 위치 설정
    const bottomPosition = useBreakpointValue({ base: "30px", md: "50px" });
    const rightPosition = useBreakpointValue({ base: "20px", md: "50px" });

    // 스크롤 위치에 따라 버튼 표시
    const toggleVisibility = () => {
        setIsVisible(window.scrollY > 200);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);


    return <>
        {isVisible && (
            <IconButton
                aria-label="Scroll to top"
                icon={<ChevronUpIcon />}
                position="fixed"
                bottom={bottomPosition}
                right={rightPosition}
                size="lg"
                bg="#2b8552"
                color="white"
                onClick={scrollToTop}
                _hover={{ bg: "#2C6E49" }}
            />
        )}  
    </>
};