import React from "react";
import { generate } from "shortid";

import { Backdrop } from "../Backdrop";
import { Button } from "../Interactables/Button";
import { Typography } from "../Typography";
import { Icon } from "../Icons";
import { Spacer } from "../Spacer";
import { Svgs } from "environment";
import {
  useMemoOnce,
  useActiveModals,
  useEffectOnce,
  useKeyPress,
} from "hooks";
import { NeutralButtonProps, PrimaryButtonProps } from "types";

import {
  Header,
  Container,
  Footer,
  Body,
  Tabs,
  Tab,
  TitleContainer,
} from "./Modal.style";

export enum ModalSizes {
  s = 40,
  m = 60,
  full = -1,
}

export interface Props {
  children?: React.ReactNode;
  visible: boolean;
  className?: string;
  title?: string;
  primary?: PrimaryButtonProps;
  neutral?: NeutralButtonProps;
  close?: boolean;
  closeOnBackdrop?: boolean;
  bodySpacing?: boolean;
  tabs?: {
    labels: string[];
    active: number;
    onClick: (tabIndex: number) => void;
    isDisabed?: (tabIndex: number) => boolean;
  };
  enterAsPrimaryOnClick?: boolean;
  fullSizeConfig?: {
    narrow?: boolean;
    centerTitle?: boolean;
  };
  size?: (type: typeof ModalSizes) => ModalSizes;
  onClose: () => void;
}

export function Modal({
  children,
  visible,
  className,
  title,
  primary,
  neutral,
  close,
  closeOnBackdrop = true,
  bodySpacing = true,
  tabs,
  enterAsPrimaryOnClick,
  fullSizeConfig,
  size,
  onClose,
}: Props) {
  function onBackdropClick() {
    if (closeOnBackdrop) handleClose();
  }

  function handleClose() {
    if (canClose()) onClose();
  }

  function handleButtonsClick(onClick?: () => void) {
    if (canClose()) return onClick;
  }

  /**
   * Disable close modal action when there is an action going on
   */
  function canClose() {
    let close = true;

    if ((primary && primary.loading) || (neutral && neutral.loading)) {
      close = false;
    }

    return close;
  }

  if (!visible) return null;

  const modalSize = size ? size(ModalSizes) : ModalSizes.m;

  return (
    <Backdrop onClick={onBackdropClick} isModal>
      <Controller
        primary={primary}
        enterAsPrimaryOnClick={enterAsPrimaryOnClick}
        handleClose={handleClose}
      />

      <Container
        className={className}
        modalSize={modalSize}
        fullSizeConfig={fullSizeConfig}
        data-test-id="modal"
      >
        {/* HEADER */}
        {(title || close) && (
          <Header className="modal-header">
            {title && (
              <TitleContainer className="modal-header__title-container">
                <Typography.H6
                  className="modal-header__title"
                  title={title}
                  ellipsis
                >
                  {title}
                </Typography.H6>
              </TitleContainer>
            )}
            {close && (
              <Icon
                className="modal-header__close-icon"
                svg={Svgs.Close}
                size={(s) => s.m}
                marginOffset={{ top: 0.6 }}
                onClick={handleClose}
              />
            )}
          </Header>
        )}

        {/* SUB HEADER WITH TABS */}
        {tabs && (
          <>
            {!title && !close && <Spacer size={(s) => s.s} />}
            <Tabs>
              {tabs.labels.map((label, index) => (
                <Tab
                  key={label}
                  id={label}
                  active={tabs.active === index}
                  disabled={tabs.isDisabed?.(index)}
                  onClick={() =>
                    !tabs.isDisabed?.(index) && tabs.onClick(index)
                  }
                >
                  <Typography.Paragraph>{label}</Typography.Paragraph>
                </Tab>
              ))}
            </Tabs>
          </>
        )}

        {/* BODY */}
        <Body className="modal-body" bodySpacing={bodySpacing}>
          {children}
        </Body>

        {/* FOOTER */}
        {(primary || neutral) && (
          <Footer className="modal-footer" data-test-id={title}>
            {neutral && (
              <Button
                className="modal-footer__neutral-button"
                variant={(v) => v.secondary}
                title={neutral.label ?? ""}
                loading={neutral.loading}
                disabled={neutral.disabled}
                marginOffset={primary && { right: 2.4 }}
                onClick={handleButtonsClick(neutral.onClick)}
              />
            )}
            {primary && (
              <Button
                className="modal-footer__primary-button"
                variant={(v) => (primary.warning ? v.warning : v.primary)}
                title={primary.label ?? ""}
                loading={primary.loading}
                disabled={primary.disabled}
                onClick={handleButtonsClick(primary.onClick)}
              />
            )}
          </Footer>
        )}
      </Container>
    </Backdrop>
  );
}

interface ControllerProps {
  primary?: PrimaryButtonProps;
  enterAsPrimaryOnClick?: boolean;
  handleClose: () => void;
}

function Controller({
  primary,
  enterAsPrimaryOnClick,
  handleClose,
}: ControllerProps) {
  const modalId = useMemoOnce(() => generate());
  const [activeModals, { addModal, removeModal }] = useActiveModals();

  useEffectOnce(() => {
    // ADD MODAL TO STORE ON MOUNT
    addModal({ modalId });

    // REMOVE MODAL FROM STORE ON UNMOUNT
    return () => removeModal({ modalId });
  });

  const lastModalId = activeModals.data[activeModals.data.length - 1];
  const enableShortcuts = modalId === lastModalId;

  useKeyPress(
    {
      // ENTER KEY PRESSED - TRIGGER `primary.onClick`
      onEnterKeyPress: handlePrimaryOnClick,
    },
    { listen: enableShortcuts }
  );

  useKeyPress(
    {
      // ESC KEY PRESSED - CLOSE LAST OPENED MODAL
      onEscapeKeyPress: handleClose,
    },
    { listen: enableShortcuts, noInputFocused: false }
  );

  function handlePrimaryOnClick() {
    if (!(enterAsPrimaryOnClick && primary && primary.onClick)) return;

    if (primary.loading || primary.disabled) return;

    primary.onClick();
  }

  return null;
}
