import React from "react";
import { Typography } from "components/UI/Typography";

interface Props {
  error?: string;
  className?: string;
  id?: string;
}

export function InputError({ error, className, id }: Props) {
  const errored = !!error;

  return (
    <Typography.Error
      className={className}
      id={id}
      style={{
        transition: "opacity 0.2s",
        opacity: errored ? 1 : 0,
      }}
      marginOffset={errored && { top: 0.2 }}
    >
      {error}
    </Typography.Error>
  );
}
