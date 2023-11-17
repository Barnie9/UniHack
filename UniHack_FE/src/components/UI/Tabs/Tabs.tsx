import React, { useState } from "react";

import { TabsItem } from "./TabsItem";
import { TabsContent } from "./TabsContent";

import { Container, Items } from "./Tabs.style";
import { StyleOffset } from "types";

interface Props {
  children?: React.ReactNode;
  labels: string[];
  startIndex?: number;
  maxWidth?: number;
  className?: string;
  tabClassName?: string;
  tabMarginOffset?: StyleOffset;
  onChangeTabs?: (active: number) => void;
}

export function Tabs({
  children,
  labels,
  startIndex = 0,
  maxWidth,
  className,
  tabClassName,
  onChangeTabs,
  tabMarginOffset,
}: Props) {
  const [active, setActive] = useState(startIndex);

  const enhancedChildren = React.Children.toArray(children)
    .filter((child) => child)
    .map((child, index) =>
      React.cloneElement(child as JSX.Element, {
        active: index === active,
      })
    );

  const onChangeTab = (index: number) => {
    setActive(index);

    if (onChangeTabs) {
      onChangeTabs(index);
    }
  };

  return (
    <Container className={className}>
      <Items maxWidth={maxWidth}>
        {labels.map((label, index) => (
          <TabsItem
            key={`tab-item-${label}`}
            active={active === index}
            marginOffset={tabMarginOffset}
            className={tabClassName}
            onChangeTab={() => onChangeTab(index)}
          >
            {label}
          </TabsItem>
        ))}
      </Items>
      {enhancedChildren}
    </Container>
  );
}

Tabs.Content = TabsContent;
