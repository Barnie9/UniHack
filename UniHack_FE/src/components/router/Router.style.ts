import styled from "styled-components/macro";
import { Icon } from "components/UI/Icons";

interface HandleProps {
  open: boolean;
}

export const Main = styled.main`
  background-color: ${({ theme }) => theme.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  min-height: 100vh;
`;

export const StashHandle = styled.div<HandleProps>`
  cursor: pointer;
  position: fixed;
  top: 42.5%;
  margin-right: 0;
  transition: ${({ open }) =>
    open ? `margin 0.3s ease-in-out` : `margin 0.2s ease-in-out`};
  margin-right: ${({ open }) => (open ? "46.4rem" : 0)};
  border-top-left-radius: 0.4rem;
  border-bottom-left-radius: 0.4rem;
  padding: 1.6rem 0.4rem;
  width: 3.4rem;
  height: 16rem;
  background: ${({ theme }) => theme.stashDrawer.background};
  z-index: 105;
`;
export const Arrow = styled(Icon)<HandleProps>`
  position: absolute;
  left: -0.4rem;
  top: 1.6rem;
  svg {
    transition: transform 0.2s ease-in-out;
    transform: ${({ open }) => (open ? "rotate(180deg)" : "rotate(0)")};
  }
`;

export const CardsCount = styled.div`
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  color: ${({ theme }) => theme.h3};
`;
