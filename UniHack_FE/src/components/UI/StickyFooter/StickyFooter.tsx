import React from "react";
import { useInView } from "react-intersection-observer";

import { Button } from "components/UI/Interactables/Button";
import { NeutralButtonProps } from "types";

import {
  Footer,
  Container,
  IntersectRefDiv,
  Group,
} from "./StickyFooter.style";
import useAdjustFooter from "hooks/ui/useAdjustFooter";

interface Props {
  primary?: NeutralButtonProps;
  neutral?: NeutralButtonProps;
  danger?: NeutralButtonProps;
  maxWidth?: number;
  fixedBottom?: boolean;
  alignButtonsLeft?: boolean;
  dynamicMarginBottom?: boolean;
  adjustFooterDeps?: React.DependencyList;
}

export const DEFAULT_FOOTER_MARGIN_TOP = 100;

export function StickyFooter({
  primary,
  neutral,
  danger,
  maxWidth = 58,
  fixedBottom = false,
  alignButtonsLeft = false,
  dynamicMarginBottom = true,
  adjustFooterDeps,
}: Props) {
  const [ref, inView] = useInView({
    threshold: 0,
    rootMargin: "0px 0px -110px 0px",
  });

  const { marginTop } = useAdjustFooter(adjustFooterDeps);

  return (
    <>
      {!fixedBottom && <IntersectRefDiv ref={ref} />}
      <Footer
        shadow={fixedBottom ? fixedBottom : !inView}
        marginTop={
          dynamicMarginBottom && marginTop
            ? marginTop
            : DEFAULT_FOOTER_MARGIN_TOP
        }
        className="sticky-footer"
      >
        <Container maxWidth={maxWidth}>
          {danger && (
            <Button
              variant={(v) => v.link}
              title={danger.label ?? ""}
              loading={danger.loading}
              disabled={danger.disabled}
              onClick={danger.onClick}
              marginOffset={(neutral || primary) && { right: 2 }}
            />
          )}
          <Group alignLeft={alignButtonsLeft}>
            {neutral && (
              <Button
                variant={(v) => v.secondary}
                title={neutral.label ?? ""}
                loading={neutral.loading}
                disabled={neutral.disabled}
                marginOffset={primary && { right: 2 }}
                onClick={neutral.onClick}
              />
            )}
            {primary && (
              <Button
                title={primary.label ?? ""}
                loading={primary.loading}
                disabled={primary.disabled}
                onClick={primary.onClick}
              />
            )}
          </Group>
        </Container>
      </Footer>
    </>
  );
}
