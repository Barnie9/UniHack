import React from "react";
import styled from "styled-components/macro";

import { ColorsX } from "environment";

interface Props {
  className?: string;
}

export function Separator({ className }: Props) {
  return <Line className={className} />;
}

const Line = styled.div`
  height: 0.1rem;
  width: 100%;
  background-color: ${ColorsX.pale};
  margin: 2rem 0;
`;
