import { useCallback } from "react";
import { UpdateUserInput, User } from "api";

import { OperationResult } from "hooks/store/types";
import { useActivity } from "hooks/store/utils";
import { useDispatch } from "hooks/utils";
import { ActionType, updateUserAd } from "store/data/account";

export function useUpdateUserByAd(): OperationResult<
  null,
  (input: UpdateUserInput) => void
> {
  const dispatch = useDispatch();
  const [{ loading, error }] = useActivity(ActionType.UPDATE_USER_AD);

  const handler = useCallback(
    (input: UpdateUserInput) => {
      dispatch(updateUserAd(input));
    },
    [dispatch]
  );

  return [{ loading, error, data: null }, handler];
}
