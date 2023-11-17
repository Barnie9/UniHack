import { useDispatch } from "hooks";
import { LocalOperationResult } from "hooks/store/types";
import { useSelector } from "hooks/utils";
import {
  addModal,
  removeModal,
  selectActiveModals,
  AddRemoveModalAction,
} from "store/ui/states";
import { ActionPayload } from "store/types";

interface Handlers {
  addModal: (payload: ActionPayload<AddRemoveModalAction>) => void;
  removeModal: (payload: ActionPayload<AddRemoveModalAction>) => void;
}

export function useActiveModals(): LocalOperationResult<string[], Handlers> {
  const dispatch = useDispatch();

  // @ts-ignore
  const data = useSelector((state) => selectActiveModals(state.ui.states));

  function addModalHandler(payload: ActionPayload<AddRemoveModalAction>) {
    dispatch(addModal(payload));
  }

  function removeModalHandler(payload: ActionPayload<AddRemoveModalAction>) {
    dispatch(removeModal(payload));
  }

  const handlers: Handlers = {
    addModal: addModalHandler,
    removeModal: removeModalHandler,
  };

  return [{ data: data }, handlers];
}
