import React, { useState, useRef, useEffect } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaGlasses, FaDesktop, FaChild, FaEye } from "react-icons/fa";
import { keyframes } from "@emotion/react";

// Add keyframes for ticker animation
const ticker = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`;

const NavScroll = () => {
  const [activeItem, setActiveItem] = useState("EYEGLASSES");
  const [contentWidth, setContentWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimeout = useRef(null);
  const tickerRef = useRef(null);
  const containerRef = useRef(null);

  const items = [
    { name: "EYEGLASSES", icon: <FaGlasses />, mainCategory: "GLASSES", subCategory: "EYEGLASSES"},
    { name: "COMPUTER GLASSES", icon: <FaDesktop />, mainCategory: "GLASSES", subCategory: "COMPUTER_GLASSES"},
    { name: "KIDS GLASSES", icon: <FaChild />, mainCategory: "GLASSES", subCategory: "EYEGLASSES", personCategory: "kids" },
    { name: "CONTACT LENSES", icon: <FaEye />, mainCategory: "CONTACT_LENSES", subCategory: "CONTACT_LENSES"}
  ];

  // Use ResizeObserver for accurate width
  useEffect(() => {
    const updateWidth = () => {
      if (tickerRef.current) {
        setContentWidth(tickerRef.current.offsetWidth);
      }
    };
    updateWidth();
    let observer;
    if (tickerRef.current && window.ResizeObserver) {
      observer = new window.ResizeObserver(updateWidth);
      observer.observe(tickerRef.current);
    } else {
      window.addEventListener('resize', updateWidth);
    }
    return () => {
      if (observer && tickerRef.current) observer.disconnect();
      window.removeEventListener('resize', updateWidth);
    };
  }, [items]);

  // Animation keyframes using dynamic width
  const tickerAnim = `@keyframes tickerAnim { 0% { transform: translateX(0); } 100% { transform: translateX(-${contentWidth}px); } }`;

  // Pause/resume logic
  const pauseAndResume = () => {
    setIsPaused(true);
    if (pauseTimeout.current) clearTimeout(pauseTimeout.current);
    pauseTimeout.current = setTimeout(() => {
      setIsPaused(false);
      // Reset scroll position to start for seamless animation
      if (containerRef.current) containerRef.current.scrollLeft = 0;
    }, 2000);
  };
  useEffect(() => () => { if (pauseTimeout.current) clearTimeout(pauseTimeout.current); }, []);

  // Listen for manual scroll/drag/touch
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onScroll = () => pauseAndResume();
    const onMouseDown = () => pauseAndResume();
    const onTouchStart = () => pauseAndResume();
    container.addEventListener('scroll', onScroll);
    container.addEventListener('mousedown', onMouseDown);
    container.addEventListener('touchstart', onTouchStart);
    return () => {
      container.removeEventListener('scroll', onScroll);
      container.removeEventListener('mousedown', onMouseDown);
      container.removeEventListener('touchstart', onTouchStart);
    };
  }, []);

  return (
    <Box
      ref={containerRef}
      display={{ base: "block", xl: "none" }}
      overflowX="auto"
      overflowY="hidden"
      whiteSpace="nowrap"
      css={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
        cursor: 'grab',
      }}
      py={2}
      px={2}
      mt={4}
      position="relative"
      width="100%"
      background="white"
      onMouseEnter={pauseAndResume}
      onMouseLeave={pauseAndResume}
      onTouchStart={pauseAndResume}
      onTouchEnd={pauseAndResume}
    >
      {/* Inject dynamic keyframes */}
      <style>{tickerAnim}</style>
      <Box
        display="flex"
        width={contentWidth ? `${contentWidth * 2}px` : 'auto'}
        style={{
          animation: contentWidth && !isPaused ? `tickerAnim 20s linear infinite` : undefined,
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        {/* First set */}
        <Flex gap={4} as="div" minW="max-content" ref={tickerRef}>
          {items.map((item) => {
            let query = `mainCategory=${item.mainCategory}&subCategory=${item.subCategory}`;
            if (item.personCategory) {
              query += `&personCategory=${item.personCategory}`;
            }
            return (
              <Link
                to={`/products?${query}`}
                key={item.name + '-1'}
              >
                <Flex
                  align="center"
                  position="relative"
                  onClick={() => setActiveItem(item.name)}
                  px={1}
                  gap={2}
                >
                  <Box 
                    fontSize="20px" 
                    color={activeItem === item.name ? "black" : "gray.400"}
                  >
                    {item.icon}
                  </Box>
                  <Text
                    fontSize="12px"
                    fontWeight="500"
                    _hover={{ color: "blue.500" }}
                    minW="max-content"
                    color={activeItem === item.name ? "black" : "gray.400"}
                  >
                    {item.name}
                  </Text>
                  {activeItem === item.name && (
                    <Box
                      position="absolute"
                      bottom="-2px"
                      left="0"
                      right="0"
                      height="2px"
                      bg="black"
                    />
                  )}
                </Flex>
              </Link>
            );
          })}
        </Flex>
        {/* Second set (duplicate) */}
        <Flex gap={4} as="div" minW="max-content">
          {items.map((item) => {
            let query = `mainCategory=${item.mainCategory}&subCategory=${item.subCategory}`;
            if (item.personCategory) {
              query += `&personCategory=${item.personCategory}`;
            }
            return (
              <Link
                to={`/products?${query}`}
                key={item.name + '-2'}
              >
                <Flex
                  align="center"
                  position="relative"
                  onClick={() => setActiveItem(item.name)}
                  px={1}
                  gap={2}
                >
                  <Box 
                    fontSize="20px" 
                    color={activeItem === item.name ? "black" : "gray.400"}
                  >
                    {item.icon}
                  </Box>
                  <Text
                    fontSize="12px"
                    fontWeight="500"
                    _hover={{ color: "blue.500" }}
                    minW="max-content"
                    color={activeItem === item.name ? "black" : "gray.400"}
                  >
                    {item.name}
                  </Text>
                  {activeItem === item.name && (
                    <Box
                      position="absolute"
                      bottom="-2px"
                      left="0"
                      right="0"
                      height="2px"
                      bg="black"
                    />
                  )}
                </Flex>
              </Link>
            );
          })}
        </Flex>
      </Box>
    </Box>
  );
};

export default NavScroll; 