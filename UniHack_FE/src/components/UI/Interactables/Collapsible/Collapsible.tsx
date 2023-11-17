import React, { useEffect, useState } from "react";

import { Icon } from "components/UI/Icons";
import { Typography } from "components/UI/Typography";
import { Svgs } from "environment";

import { Container, Content, Header } from "./Collapsible.style";

interface Props {
  children: React.ReactNode;
  title?: string;
  expanded?: boolean;
  className?: string;
  titleComponent?: React.ReactNode;
  onChange?: (value: boolean) => void;
}

export function Collapsible({
  children,
  title,
  expanded,
  className,
  titleComponent: TitleComponent,
  onChange,
}: Props) {
  const [open, setOpen] = useState(expanded ?? false);

  useEffect(() => {
    if (expanded !== undefined && expanded !== open) {
      setOpen(expanded);
    }
  }, [expanded]);

  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    // CONTROLLED
    if (expanded !== undefined) {
      if (onChange) onChange(!expanded);
    }
    // UNCONTROLLED
    else {
      setOpen((state) => !state);
    }
  };

  return (
    <Container onClick={(e) => e.stopPropagation()} className={className}>
      <Header onClick={onClick}>
        <Icon
          svg={Svgs.ChevronDown}
          rotate={open ? 180 : 0}
          marginOffset={{ right: 0.8 }}
          onClick={onClick}
        />
        {title && (
          <Typography.Paragraph title={title}>{title}</Typography.Paragraph>
        )}
        {TitleComponent && <>{TitleComponent}</>}
      </Header>
      {open && <Content>{children}</Content>}
    </Container>
  );
}
