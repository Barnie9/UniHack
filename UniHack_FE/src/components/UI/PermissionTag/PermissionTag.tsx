import React from "react";
import { Typography } from "components/UI/Typography";
import { ColorsX } from "environment";
import { SpacingOffsets } from "types";

import { Container } from "./PermissionTag.style";

interface Props extends SpacingOffsets {
  title: string;
}

export function PermissionTag({ title, marginOffset, paddingOffset }: Props) {
  return (
    <Container
      className="permission-tag"
      marginOffset={marginOffset}
      paddingOffset={paddingOffset}
    >
      <Typography.Caption
        title={title}
        fontweight={(w) => w.medium}
        color={ColorsX.text.main}
      >
        {title}
      </Typography.Caption>
    </Container>
  );
}
