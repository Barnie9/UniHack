import React, { useEffect, useState, useRef, RefObject } from "react";
import { useSpring } from "react-spring";

import { Icon } from "components/UI/Icons";
import { Svgs } from "environment";
import { getElementBounds } from "helpers";
import { useAlerts, useOutsideClick, useEffectOnce } from "hooks";
import { Offset, Nullable, InputType, SpacingOffsets } from "types";

import {
  Container,
  IconWrapper,
  Text,
  TokenText,
  Tooltip,
  TooltipWrapper,
} from "./InfoTooltip.style";

interface Props {
  iconVisible?: boolean;
  text: Nullable<string>;
  disabled?: boolean;
  inline?: boolean;
  offset?: Offset;
  tokenCode?: boolean;
  renderIcons?: React.ReactNode;
  closeOnMouseLeave?: boolean;
  zIndex?: number;
}

export function InfoTooltip({
  iconVisible,
  text,
  disabled = false,
  inline = false,
  offset,
  marginOffset,
  tokenCode = false,
  renderIcons,
  closeOnMouseLeave,
  zIndex,
}: Props & SpacingOffsets) {
  const [done, setDone] = useState(false);
  const [rendered, setRendered] = useState(false);

  const iconRef = useRef<HTMLDivElement>(null);

  function onMouseLeaveAction() {
    setDone(false);
    setRendered(false);
  }

  useEffect(() => {
    if (!iconVisible) {
      setDone(false);
      setRendered(false);
    }
  }, [iconVisible]);

  useEffect(() => {
    if (rendered) {
      setDone(true);
    }
  }, [rendered]);

  function handleIconClick(e: React.MouseEvent) {
    if (!disabled) {
      e.stopPropagation();
      rendered && done && setDone(false);
      setTimeout(() => setRendered((state) => !state), rendered ? 250 : 0);
    }
  }

  return (
    <Container
      inline={inline}
      onMouseLeave={() => closeOnMouseLeave && setRendered(false)}
    >
      {text && (
        <IconWrapper
          marginOffset={marginOffset}
          iconVisible={rendered || iconVisible}
          tokenCode={tokenCode}
          ref={iconRef}
          onClick={handleIconClick}
        >
          <Icon
            svg={Svgs.Information}
            disabled={disabled}
            propagate={true}
            customSize={1.8}
          />
        </IconWrapper>
      )}
      {rendered && text && (
        <ToolTip
          text={text}
          offset={offset}
          tokenCode={tokenCode}
          renderIcons={renderIcons}
          zIndex={zIndex}
          done={done}
          iconRef={iconRef}
          onMouseLeaveAction={onMouseLeaveAction}
        />
      )}
    </Container>
  );
}

interface ToolTipProps {
  text: Nullable<string>;
  offset?: Offset;
  tokenCode?: boolean;
  renderIcons?: React.ReactNode;
  zIndex?: number;
  done: boolean;
  iconRef: RefObject<HTMLDivElement>;
  onMouseLeaveAction: () => void;
}

function ToolTip({
  text,
  offset,
  tokenCode = false,
  renderIcons,
  zIndex,
  done,
  iconRef,
  onMouseLeaveAction,
}: ToolTipProps) {
  const { setNotification } = useAlerts();

  const [tooltipWidth, setTooltipWidth] = useState(0);
  const [left, setLeft] = useState(0);
  const [bottom, setBottom] = useState<boolean | null>(null);

  const tooltipRef = useRef<HTMLDivElement>(null);

  // close on click away
  useOutsideClick(() => {
    onMouseLeaveAction();
  }, [tooltipRef, iconRef]);

  function computePosition() {
    const OFFSET = 15;
    const LEFT_BOUND = 90;
    const RIGHT_BOUND = window.innerWidth;

    const { width, top, left } = getElementBounds(tooltipRef);

    // Check if header exists and account for it's height
    const header = document.querySelector(".header-main");

    let topBuffer = 0;

    if (header) {
      topBuffer = header.getBoundingClientRect().height;
    }

    setBottom(top < topBuffer ? true : false);

    if (!tooltipWidth) {
      setTooltipWidth(width);
    }

    const icon = getElementBounds(iconRef);

    if (left - width / 2 <= LEFT_BOUND) {
      setLeft(-LEFT_BOUND);
    } else if (icon.right + width / 2 >= RIGHT_BOUND) {
      setLeft(icon.right + width / 2 - RIGHT_BOUND + OFFSET);
    } else {
      setLeft(0);
    }
  }

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(text ? text : "");
    setNotification({
      message: "Copied to clipBoard",
    });
  };

  useEffectOnce(() => {
    computePosition();
  });

  const style = useSpring({
    opacity: done ? 1 : 0,
    config: { duration: 25 },
  });

  return (
    <TooltipWrapper
      zIndex={zIndex ?? null}
      style={style}
      width={tooltipWidth}
      left={left}
      bottom={bottom}
      hide={bottom === null}
      offset={offset}
      tokenCode={tokenCode}
    >
      <Tooltip
        tokenCode={tokenCode}
        ref={tooltipRef}
        bottom={bottom}
        left={left}
      >
        {!tokenCode && <Text>{text}</Text>}
        {tokenCode && (
          <>
            <TokenText
              type={InputType.Text}
              value={text ?? ""}
              onChange={() => undefined}
            />
            <Icon
              svg={Svgs.FileText}
              title={"copyToClipboard"}
              variant={(v) => v.button}
              marginOffset={{ left: 1 }}
              onClick={handleCopyToClipboard}
            />
          </>
        )}
        {renderIcons && <>{renderIcons}</>}
      </Tooltip>
    </TooltipWrapper>
  );
}
