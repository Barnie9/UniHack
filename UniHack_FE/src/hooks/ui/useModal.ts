import { useState } from "react";

import { Props } from "components/UI/Modal/Modal";
import { useCallbackOnce } from "hooks";

export function useModal(defaultOpen = false): [Props, () => void] {
  const [open, setOpen] = useState(defaultOpen);

  const handleToggle = useCallbackOnce(() => {
    setOpen((o) => !o);
  });

  const handleClose = useCallbackOnce(() => {
    setOpen(false);
  });

  return [{ visible: open, onClose: handleClose }, handleToggle];
}
