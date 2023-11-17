import { useCallback } from "react";
import { User } from "api";
import { Nullable } from "types";

import { OperationResult } from "hooks/store/types";
import { useActivity } from "hooks/store/utils";
import { useDispatch, useSelector } from "hooks/utils";
import { ActionType, getOne, selectOne } from "store/data/account";

export function useGetUser(
  input: number
): OperationResult<Nullable<User>, (input: number) => void> {
  const dispatch = useDispatch();
  const [{ loading, error }] = useActivity(ActionType.GET_ONE);
  const data = useSelector((state) => selectOne(state.data.account, input));

  const handler = useCallback(
    (input: number) => {
      dispatch(getOne(input));
    },
    [dispatch]
  );

  return [{ loading, loaded: !!data, error, data }, handler];
}
