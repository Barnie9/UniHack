import React from "react";
import { Asterisk } from "components/UI/Asterisk";
import { Typography } from "components/UI/Typography";
import { ColorsX } from "environment";

interface Props {
  required?: boolean;
  disabled?: boolean;
  label?: string | React.ReactNode;
  marginBottom?: number;
  className?: string;
  // error?: string;
}

export function InputLabel({
  required,
  disabled,
  label,
  marginBottom,
  className,
}: // error
Props) {
  if (!label) return null;

  const color = disabled ? ColorsX.text.disabled : ColorsX.text.main;

  return (
    <Typography.Caption
      className={className}
      color={color}
      marginOffset={{ bottom: marginBottom ?? 0.4 }}
      fontweight={(w) => w.medium}
    >
      {label}
      {required && <Asterisk />}
      {/* {error && (
				<Icon
					svg={Svgs.Information}
					colors={{
						color: ColorsX.text.error
					}}
					marginOffset={{ left: 0.6 }}
					size={s => s.m}
				/>
			)} */}
    </Typography.Caption>
  );
}
