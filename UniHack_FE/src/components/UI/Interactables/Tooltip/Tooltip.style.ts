import styled from "styled-components/macro";

import { ColorsX } from "environment";
import { getTypographyCSS } from "components/UI/Typography";

export const Container = styled.div`
  .react-tooltip {
    /* resetters */
    border: unset;

    &.show {
      opacity: 1;
    }

    padding: 0.4rem 0.8rem;
    border-radius: 0.4rem;
    background-color: ${ColorsX.text.main};
    max-width: 32rem;
    width: max-content;
    transition: opacity 0.15s ease-out;

    ${getTypographyCSS((t) => t.Tooltip)}
  }
`;
