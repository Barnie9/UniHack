import { ContextType, useCallback, useContext, useEffect } from "react";
import type { Blocker, History, Transition } from "history";
import {
  Navigator as BaseNavigator,
  UNSAFE_NavigationContext as NavigationContext,
} from "react-router-dom";

interface Navigator extends BaseNavigator {
  block: History["block"];
}

type NavigationContextWithBlock = ContextType<typeof NavigationContext> & {
  navigator: Navigator;
};

function useBlocker(blocker: Blocker, when = true) {
  const { navigator } = useContext(
    NavigationContext
  ) as NavigationContextWithBlock;

  useEffect(() => {
    if (!when) return;

    const unblock = navigator.block((tx: Transition) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          unblock();
          tx.retry();
        },
      };

      blocker(autoUnblockingTx);
    });

    return unblock;
  }, [navigator, blocker, when]);
}

export function usePrompt(
  response: (
    location: Transition["location"],
    action: Transition["action"]
  ) => boolean,
  when = true
) {
  const blocker = useCallback(
    (tx: Transition) => {
      if (response(tx.location, tx.action)) tx.retry();
    },
    [response]
  );
  return useBlocker(blocker, when);
}
