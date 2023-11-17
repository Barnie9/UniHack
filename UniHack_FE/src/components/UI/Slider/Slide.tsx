import React, { useEffect } from "react";
import { animated, useSpring } from "react-spring";
import styled from "styled-components/macro";

interface Props {
  children: React.ReactNode;
  active?: boolean;
  index?: number;
  className?: string;
  activeSlide?: number;
  changeSlide?: (index: number) => void;
}

const LEFT_BOUND = -50;
const CENTER_BOUND = 0;
const RIGHT_BOUND = 50;

export function Slide({
  children,
  active = false,
  index = 0,
  activeSlide = 0,
  changeSlide = () => undefined,
  className,
}: Props) {
  useEffect(() => {
    if (active && index !== activeSlide) {
      changeSlide(index);
    }
  }, [active]);

  const style = useSpring({
    opacity: active ? 1 : 0,
    transform: `translateX(${
      active ? CENTER_BOUND : activeSlide < index ? RIGHT_BOUND : LEFT_BOUND
    }vw)`,
    display: active ? "block" : "none",
    config: { duration: 200 },
  });

  if (active && index === activeSlide) {
    return (
      <Content style={style} className={className}>
        {children}
      </Content>
    );
  }

  return <></>;
}

const Container = styled.div`
  position: absolute;
  width: 100%;
`;
const Content = animated(Container);
