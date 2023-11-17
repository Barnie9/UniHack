import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { Modal } from "../Modal";
import { Typography } from "../Typography";
import { usePrevious, useNavigation } from "hooks";
import { usePrompt } from "hooks/navigation/usePromp";

interface Props {
  savingTitle?: string;
  savingMessage?: string;
  customComponent?: React.ReactNode;
  saving: boolean;
  when: boolean;
  onSave: () => void;
  onDiscard: () => void;
  onClose?: () => void;
}

export function PromptToSave({
  savingTitle,
  savingMessage,
  customComponent,
  saving,
  when,
  onSave,
  onDiscard,
  onClose,
}: Props) {
  const { navigate } = useNavigation();
  const currentLocation = useLocation();

  const [modalVisible, setModalVisible] = useState(false);
  const [nextNavLocation, setNextNavLocation] = useState("");
  const [allowNavigation, setAllowNavigation] = useState(false);
  const [showSavingMessage, setShowSavingMessage] = useState(false);

  usePrompt((nextLocation) => {
    const sameLocation = currentLocation.pathname === nextLocation.pathname;

    if (sameLocation) return true;

    if (!allowNavigation && when) {
      /**
       * reset showSavingMessage in case modal was
       * previously open and closed while saving
       */
      if (!saving) setShowSavingMessage(false);

      setNextNavLocation(nextLocation.pathname);
      setModalVisible(true);

      return false;
    }

    return true;
  }, when);

  const wasSaving = usePrevious(saving);
  useEffect(() => {
    if (wasSaving && !saving && modalVisible) setAllowNavigation(true);

    // in case it's saving show the showSavingMessage. 'saving' flag cannot
    // be used directly because it changes from 'true' to 'false' before modal closes
    if (saving) setShowSavingMessage(true);
  }, [saving]);

  const prevAllowNavigation = usePrevious(allowNavigation);
  useEffect(() => {
    if (!prevAllowNavigation && allowNavigation) {
      navigateToNextPageHandler();
    }
  }, [allowNavigation]);

  function navigateToNextPageHandler() {
    navigate(nextNavLocation);
  }

  function handleDiscard() {
    setAllowNavigation(true);
    onDiscard();
  }

  function handleClose() {
    setModalVisible(false);

    if (onClose) onClose();
  }

  return (
    <Modal
      visible={modalVisible}
      title={showSavingMessage && savingTitle ? savingTitle : "Save"}
      primary={{
        label: "Save",
        loading: saving,
        onClick: onSave,
      }}
      neutral={{
        label: "Discard",
        onClick: handleDiscard,
      }}
      onClose={handleClose}
      size={(s) => s.s}
      enterAsPrimaryOnClick
      close
    >
      <Typography.Paragraph>
        {showSavingMessage && savingMessage ? savingMessage : "Unsaved changes"}
      </Typography.Paragraph>

      {customComponent}
    </Modal>
  );
}
