import { useCallback } from "react";

import { OperationResult } from "hooks/store/types";
import { useActivity } from "hooks/store/utils";
import { useDispatch, useSelector } from "hooks/utils";
import { ActionType, getUsers, selectUsers } from "store/data/account";

export function useGetUsers(): OperationResult<number[], () => void> {
  const dispatch = useDispatch();
  const [{ loading, error }] = useActivity(ActionType.GET_USERS);
  const data = useSelector((state) => selectUsers(state.data.account));

  const handler = useCallback(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return [{ loading, loaded: !!data, error, data }, handler];
}
