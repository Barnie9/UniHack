import React, { useState } from "react";
import styled from "styled-components/macro";

import { Slide } from "./Slide";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function Slider({ children, className }: Props) {
  const [activeSlide, setActiveSlide] = useState(0);
  const changeSlide = (index: number) => setActiveSlide(index);

  const enhancedChildren = React.Children.toArray(children)
    .filter((child) => child)
    .map((child, index) =>
      React.cloneElement(child as JSX.Element, {
        index,
        activeSlide,
        changeSlide,
      })
    );

  return <Container className={className}>{enhancedChildren}</Container>;
}

Slider.Slide = Slide;

const Container = styled.div`
  position: relative;
`;
