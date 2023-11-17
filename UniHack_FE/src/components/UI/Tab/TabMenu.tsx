import React from "react";
import { Tab } from "./Tab";

import { Container } from "./TabMenu.style";

interface Props {
  items: any;
  vertical?: boolean;
}

export function TabMenu({ items, vertical }: Props) {
  const links: any[] = [];
  for (const link in items) {
    links.push({
      label: link,
      link: items[link],
    });
  }

  return (
    <Container vertical={vertical}>
      {links.map((link, i) => (
        <Tab
          key={`tab_${link}_${i}`}
          vertical={vertical}
          link={link.link}
          label={link.label}
        />
      ))}
    </Container>
  );
}
