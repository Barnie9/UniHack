import { useCallback } from "react";

import { OperationResult } from "hooks/store/types";
import { useActivity } from "hooks/store/utils";
import { useDispatch } from "hooks/utils";
import { ActionType, removeUser } from "store/data/account";

export function useRemoveUser(): OperationResult<
  null,
  (input: number) => void
> {
  const dispatch = useDispatch();
  const [{ loading, error }] = useActivity(ActionType.REMOVE_USER);

  const handler = useCallback(
    (input: number) => {
      dispatch(removeUser(input));
    },
    [dispatch]
  );

  return [{ error, loading, data: null }, handler];
}
