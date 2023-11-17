import React from "react";
import ReactDOM from "react-dom";
import styled, { createGlobalStyle, css } from "styled-components/macro";

import { isPageScrollable } from "helpers";

interface Props {
  children: React.ReactNode;
  local?: boolean;
  isModal?: boolean;
  onClick: () => void;
}

export function Backdrop({ children, local, isModal, onClick }: Props) {
  function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (e && e.target === e.currentTarget) onClick();
  }

  if (local) {
    return (
      <Container isModal={isModal} onMouseDown={handleClick}>
        <GlobalStyle isPageScrollable={!!isPageScrollable()}></GlobalStyle>
        {children}
      </Container>
    );
  }

  return ReactDOM.createPortal(
    <Container isModal={isModal} onMouseDown={handleClick}>
      <GlobalStyle isPageScrollable={!!isPageScrollable()}></GlobalStyle>
      {children}
    </Container>,
    document.body
  );
}

interface GlobalStyleProps {
  isPageScrollable: boolean;
}

const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
${(props) =>
  props.isPageScrollable &&
  css`
    body {
      overflow: hidden;
      margin-right: 1.5rem;
    }
  `}
`;

interface ContainerProps {
  isModal?: boolean;
}

const Container = styled.div<ContainerProps>`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: flex-end;

  ${({ isModal }) =>
    isModal &&
    css`
      justify-content: center;
      align-items: center;
    `};

  height: 100%;
  width: 100%;
  max-width: 100vw;
  cursor: default;
  background-color: rgba(37, 37, 58, 0.5);
  z-index: 1001;

  @keyframes enterAnimationBackdrop {
    from {
      background-color: rgba(37, 37, 58, 0.25);
    }
    to {
      background-color: rgba(37, 37, 58, 0.5);
    }
  }

  animation: enterAnimationBackdrop 0.15s;
`;
