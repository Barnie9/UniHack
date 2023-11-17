import React, { forwardRef } from "react";

import ReactTooltip, { TooltipProps } from "react-tooltip";

import { Container } from "./Tooltip.style";

export const Tooltip = forwardRef<ReactTooltip, TooltipProps>((props, ref) => (
  <Container>
    <ReactTooltip
      ref={ref}
      className="react-tooltip"
      effect="solid"
      {...props}
    />
  </Container>
));
