import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";

import LoaderAnimation from "environment/theme/animations/loader_animation.json";
import LoaderAnimationWhite from "environment/theme/animations/loader_animation_white.json";
import LoaderAnimationPrimary from "environment/theme/animations/loader_animation_primary.json";

import { getHeaderHeight } from "helpers";
import { SpacingOffsets } from "types";

import { Container, Wrapper, PageLoader, BasicLoader } from "./Loader.style";

interface Props extends SpacingOffsets {
  className?: string;
  size?: number;
  primary?: boolean;
  center?: boolean;
  offset?: number;
  color?: (c: typeof LoaderColor) => LoaderColor;
}

enum LoaderColor {
  grey = "grey",
  white = "white",
  primary = "primary",
}

export function Loader({
  className,
  size = 3.2,
  primary,
  center,
  offset,
  color = (c) => c.grey,
  // SPACING OFFSETS
  paddingOffset,
  marginOffset,
}: Props) {
  const loaderRef = useRef<HTMLDivElement>(null);

  function getAnimation() {
    switch (color(LoaderColor)) {
      case LoaderColor.grey:
        return LoaderAnimation;
      case LoaderColor.white:
        return LoaderAnimationWhite;
      case LoaderColor.primary:
        return LoaderAnimationPrimary;
      default:
        return LoaderAnimation;
    }
  }

  useEffect(() => {
    if (loaderRef.current)
      lottie.loadAnimation({
        container: loaderRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: getAnimation(),
      });
  }, [loaderRef]);

  if (primary) {
    const computedOffset = offset ?? getHeaderHeight().rem;

    return (
      <Container className={className} offset={computedOffset}>
        <PageLoader ref={loaderRef} />
      </Container>
    );
  }

  return (
    <Wrapper
      className={className}
      center={center}
      marginOffset={marginOffset}
      paddingOffset={paddingOffset}
    >
      <BasicLoader ref={loaderRef} size={size} />
    </Wrapper>
  );
}
