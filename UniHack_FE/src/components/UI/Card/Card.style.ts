import styled, { css } from "styled-components/macro";

import { Icon } from "../Icons";
import { Typography } from "../Typography";
import { ColorsX, Shadows } from "environment";
import { getMultilineEllipsisCSS } from "helpers";

const isOnTouchDevice = "ontouchstart" in document.documentElement;

const MultilineEllipsis = getMultilineEllipsisCSS(3);

export const Title = styled(Typography.Paragraph)`
  font-weight: bold;

  ${MultilineEllipsis}
`;

export const TitleIcon = styled(Icon)`
  margin-right: 0.8rem;
  transition: unset;
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Description = styled(Typography.Hint)`
  ${MultilineEllipsis}
`;

interface ContainerProps {
  menuVisible: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 22.8rem;
  padding: 1.6rem;
  padding-top: 2rem;
  border-radius: 0.4rem;
  background-color: ${ColorsX.white};
  box-shadow: ${Shadows.normal};
  transition: box-shadow 0.05s;
  text-decoration: none;

  .custom-dropdown-container > div {
    color: ${!isOnTouchDevice && ColorsX.background.disabled};
  }

  .custom-dropdown-container:hover > div {
    color: initial;
  }

  ${({ menuVisible }) =>
    menuVisible &&
    css`
      box-shadow: ${Shadows.hover};
      background-color: ${ColorsX.primary.normal};

      .custom-dropdown-container > div {
        color: ${ColorsX.primary.normal};
      }

      /* make text white on hover so its visible on "ColorsX.primary.normal" background */
      ${Title}, ${Description}, ${TitleIcon} {
        color: ${ColorsX.background.disabled};
      }
    `}

  ${isOnTouchDevice &&
  css`
    .card-more-icon {
      visibility: visible;
    }
  `}

	:hover {
    cursor: pointer;
    box-shadow: ${Shadows.hover};
    background-color: ${ColorsX.primary.normal};

    .card-more-icon {
      visibility: visible;
    }

    ${({ menuVisible }) =>
      menuVisible &&
      css`
        .custom-dropdown-container > div {
          color: ${ColorsX.primary.normal};
        }
      `}

    ${isOnTouchDevice &&
    css`
      .custom-dropdown-container > div {
        color: ${ColorsX.background.disabled};
      }

      .custom-dropdown-container:hover > div {
        color: initial;
      }
    `}

		/* make text white on hover so its visible on "ColorsX.primary.normal" background */
		${Title}, ${Description}, ${TitleIcon} {
      color: ${ColorsX.background.disabled};
    }
  }
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

interface MoreIconContainerProps {
  visible: boolean;
}
export const MoreIconContainer = styled.div<MoreIconContainerProps>`
  visibility: ${({ visible }) => !visible && "hidden"};
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
`;

export const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const FooterWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  min-height: 2.4rem;
`;
