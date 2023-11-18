import styled, { css } from "styled-components/macro";
import { Images, Layers, Colors } from "environment";
import { Icon } from "components/UI/Icons";
import { Link as link } from "components/UI/Link";

interface ContainerProps {
  free?: boolean;
}

export const Container = styled.nav<ContainerProps>`
  z-index: ${Layers.nav};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 6.4rem;
  left: 0;
  top: 0;
  bottom: 0;
  position: fixed;
  padding-top: 1.2rem;
  padding-bottom: 4rem;
  background-color: ${Colors.gray.lightest};
  > div {
    margin-bottom: 2rem;
  }

  .nav-link-active::before {
    content: "";
    position: absolute;
    background-color: #00ce7c;
    width: 0.2rem;
    height: 4rem;
    left: -2rem;
    top: -0.8rem;
  }

  .nav-account-link-active::before {
    content: "";
    position: absolute;
    background-color: #00ce7c;
    width: 0.2rem;
    height: 4rem;
    left: -1.2rem;
    top: -0.8rem;
  }

  ${({ free = false }) =>
    free &&
    css`
      ::before {
        content: "FREE Account";
        position: absolute;
        bottom: 20rem;
        left: -4.4rem;
        font-size: 1.6rem;
        transform: rotate(-90deg);
        background: ${Colors.green};
        color: #fff;
        padding: 0 0.8rem;
        white-space: nowrap;
      }
    `}
`;

export const Bottom = styled.div`
  margin-top: auto;
`;

// export const Logo = styled(Images.Logo)`
// 	position: absolute;
// 	left: 4rem;
// 	height: 4rem;
// 	width: 16.3rem;

// 	path {
// 		fill: ${({ theme }) => theme.logo};
// 	}
// `;

export const Right = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 4rem;
`;

export const Separator = styled.div`
  width: 5.6rem;
  height: 1px;
  margin: 0.8rem 0 2rem 0 !important;
`;

export const LogoContainer = styled.img`
  margin-bottom: 2rem;
  width: 4.5rem;
  height: 4.5rem;
`;

export const Link = styled(link)`
  height: ${({ isActive }) => (isActive ? "true" : "false")};
`;
