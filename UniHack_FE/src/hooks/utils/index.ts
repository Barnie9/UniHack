import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import ResizeObserver from "resize-observer-polyfill";
import { cloneDeep, throttle, isEqual } from "lodash";

import { SEARCH_DEBOUNCE_TIME, keyMaps } from "consts";
import { useActiveModals } from "hooks";
import {
  EventType,
  StorageKeys,
  MutableState,
  SetMutableState,
  RequireAtLeastOne,
  Bounds,
} from "types";
import { paginate } from "helpers";

import { ApplicationState } from "store";
import { ThunkDispatch } from "store/types";

export function useCallbackOnce<T extends (...args: never[]) => unknown>(
  callback: T
) {
  return useCallback(callback, []);
}

export function useEffectOnce(effect: React.EffectCallback) {
  useEffect(effect, []);
}

export function useMemoOnce<T>(factory: () => T): T {
  return useMemo<T>(factory, []);
}

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  useEffect(() => void (ref.current = value), [value]);

  return ref.current;
}

export function useOutsideClick(
  callback: React.EffectCallback,
  refs: React.RefObject<HTMLDivElement | HTMLElement | Element>[],
  options?: {
    listen?: boolean;
    eventType?: EventType.Click | EventType.MouseDown;
  }
) {
  const { listen = true, eventType = EventType.MouseDown } = options ?? {};

  useEffect(() => {
    if (!listen) return;

    document.addEventListener(eventType, handler);
    return () => document.removeEventListener(eventType, handler);
  }, [callback, listen]);

  function handler(e: Event) {
    let useCallback = true;

    refs.forEach((ref) => {
      if (!ref.current) return;

      if (ref.current.contains(e.target as Node)) useCallback = false;
    });

    if (useCallback) callback();
  }
}

export function useOutsideBoundsClick(
  callback: React.EffectCallback,
  bounds: { top: number; bottom: number; left: number; right: number },
  options?: {
    listen?: boolean;
    eventType?: EventType.Click | EventType.MouseDown;
  }
) {
  const { listen = true, eventType = EventType.MouseDown } = options ?? {};

  useEffect(() => {
    if (!listen) return;

    document.addEventListener(eventType, handler);
    return () => document.removeEventListener(eventType, handler);
  }, [bounds, listen]);

  function handler(e: any) {
    const mouseX = e.x;
    const mouseY = e.y;

    if (
      mouseX < bounds.left ||
      mouseX > bounds.right ||
      mouseY < bounds.top ||
      mouseY > bounds.bottom
    ) {
      callback();
    }
  }
}

export function useSelector<T>(selector: (state: ApplicationState) => T) {
  return useReduxSelector((state: ApplicationState) => selector(state));
}

export function useDispatch(condition?: boolean) {
  const dispatch = useReduxDispatch();
  async function conditionalDispatch(f: any) {
    if (condition) dispatch(f);
  }

  return condition !== undefined ? conditionalDispatch : dispatch;
}

export function useCompletedAction(
  loading: boolean,
  error: boolean,
  callback: React.EffectCallback,
  errorCallback?: React.EffectCallback
) {
  const wasLoading = usePrevious(loading);

  useEffect(() => {
    if (wasLoading && !loading) {
      if (error) {
        errorCallback?.();

        return;
      }

      callback();
    }
  }, [loading, error]);
}

/**
 * THIS WORKS JUST LIKE `useState` BUT SETING STATE VALUE DOES NOT CAUSE RE-RENDER
 * SHOULD BE USED FOR INSTANT STATE ACCESS RIGHT AFTER SETTING IT
 */
export function useStatic<S>(value: S): [() => S, SetMutableState<S>] {
  const data = useMemoOnce(() => ({ value }));

  function getState() {
    return data.value;
  }

  function setState(value: S) {
    data.value = value;
  }

  function handler(prevState: S, newValue: MutableState<S>) {
    if (typeof newValue === "function") {
      // APPLY MUTATIONS
      // @ts-expect-error
      const newState = newValue(prevState);

      // UPDATE STATE
      setState(newState ?? prevState);
    } else {
      // UPDATE STATE
      setState(newValue);
    }
  }

  const handlerWithState = handler.bind(null, getState());

  return [getState, handlerWithState];
}

/**
 * TRIGGER RENDER ON DEMAND
 */
export function useRender(): [null, () => void] {
  const [render, setRender] = useState<null>(Object.create(null));

  function triggerRender() {
    setRender(Object.create(null));
  }

  return [render, triggerRender];
}

/**
 * TOGGLE BOOLEAN VALUE
 */
export function useToggle(initialState = false): [boolean, () => void] {
  const [value, setValue] = useState(initialState);

  function toggle() {
    setValue((state) => !state);
  }

  return [value, toggle];
}

/**
 * Get storage item by key - similar API as for `useState`
 * @param key storage key
 *
 * @returns [getter, setter, remove]
 *
 * @example const [item, setItem, removeItem] = useLSItem(key)
 */
export function useLSItem(
  key: StorageKeys
): [() => string | null, (value: string) => void, (value: string) => void] {
  function getItem() {
    return localStorage.getItem(key);
  }

  function setItem(value: string) {
    return localStorage.setItem(key, value);
  }

  function removeItem() {
    return localStorage.removeItem(key);
  }

  return [getItem, setItem, removeItem];
}

/**
 * A normal `useState` hook that works just like `produce` from immerJS.
 * State can be modified directly in the return function; see @example
 *
 * @param value initial state value
 *
 * @returns [state, setState]
 *
 * @example
 * const [state, setState] = useMutableState([1, 2, 3]);
 *
 * // push `4` to the state
 * setState(prevState => prevState.push(4));
 * // result: [1, 2, 3, 4]
 */
export function useMutableState<S>(value: S): [S, SetMutableState<S>] {
  const [state, setState] = useState(value);

  function handler(prevState: S, newValue: MutableState<S>) {
    if (typeof newValue === "function") {
      // APPLY MUTATIONS
      // @ts-expect-error
      const newState = newValue(prevState);

      // UPDATE STATE
      setState(newState ?? prevState);
    } else {
      // UPDATE STATE
      setState(newValue);
    }
  }

  const handlerWithState = handler.bind(null, cloneDeep(state));

  return [state, handlerWithState];
}

export function useKeyPress(
  callbacks: RequireAtLeastOne<{
    onEscapeKeyPress?: () => any;
    onEnterKeyPress?: () => any;
    onBackspaceKeyPress?: () => any;
    onTabKeyPress?: () => any;
    onArrowLeftKeyPress?: () => any;
    onArrowRightKeyPress?: () => any;
    onArrowUpKeyPress?: () => any;
    onArrowDownKeyPress?: () => any;
    onDeleteKeyPress?: () => any;
    onBackSlashKeyPress?: () => any;
    onForwardSlashKeyPress?: () => any;
    onCommaKeyPress?: () => any;
    onLetterCKeyPress?: () => any;
  }>,
  options?: RequireAtLeastOne<{
    listen?: boolean;
    noModalsOpened?: boolean;
    noInputFocused?: boolean;
    throttleTime?: number;
  }>
) {
  const {
    listen = true,
    noModalsOpened = false,
    noInputFocused = true,
    throttleTime = 250,
  } = options ?? {};

  const [activeModals] = useActiveModals();
  // @ts-ignore
  const areModalsOpened = activeModals.length > 0;

  useEffect(() => {
    if (!listen) return;

    if (noModalsOpened && areModalsOpened) return;

    document.addEventListener(EventType.KeyDown, handleKeyPressThrottled);

    return () =>
      document.removeEventListener(EventType.KeyDown, handleKeyPressThrottled);
  }, [
    callbacks,
    listen,
    noModalsOpened,
    noInputFocused,
    areModalsOpened,
    document.activeElement,
  ]);

  const handleKeyPressThrottled = throttle(handleKeyPress, throttleTime, {
    leading: true,
    trailing: false,
  });

  function handleKeyPress(e: KeyboardEvent) {
    if (noInputFocused) {
      if (document.activeElement) {
        const focusedElement = document.activeElement;
        const focusedElementType = focusedElement.nodeName.toLowerCase();
        const isInputElementTypes = ["input", "textarea", "select"];
        const isInputElement = isInputElementTypes.includes(focusedElementType);

        if (isInputElement) return;
      }
    }

    // ESC
    if (keyMaps.escape.includes(e.key)) callbacks.onEscapeKeyPress?.();
    // ENTER
    if (keyMaps.enter.includes(e.key)) callbacks.onEnterKeyPress?.();
    // BACKSPACE
    if (keyMaps.backspace.includes(e.key)) callbacks.onBackspaceKeyPress?.();
    // TAB
    if (keyMaps.tab.includes(e.key)) callbacks.onTabKeyPress?.();
    // ARROW LEFT
    if (keyMaps.arrowLeft.includes(e.key)) callbacks.onArrowLeftKeyPress?.();
    // ARROW RIGHT
    if (keyMaps.arrowRight.includes(e.key)) callbacks.onArrowRightKeyPress?.();
    // ARROW UP
    if (keyMaps.arrowUp.includes(e.key)) callbacks.onArrowUpKeyPress?.();
    // ARROW DOWN
    if (keyMaps.arrowDown.includes(e.key)) callbacks.onArrowDownKeyPress?.();
    // DELETE
    if (keyMaps.delete.includes(e.key)) callbacks.onDeleteKeyPress?.();
    // BACK SLASH
    if (keyMaps.backSlash.includes(e.key)) callbacks.onBackSlashKeyPress?.();
    // FORWARD SLASH
    if (keyMaps.forwardSlash.includes(e.key))
      callbacks.onForwardSlashKeyPress?.();
    // COMMA
    if (keyMaps.comma.includes(e.key)) callbacks.onCommaKeyPress?.();
    // LETTER C
    if (keyMaps.letter.c.includes(e.key)) callbacks.onLetterCKeyPress?.();
  }
}

export function usePaginate<T>(
  items: T[],
  options: { threshold: number; pageSize: number; startPageIndex?: number }
) {
  const shouldPaginate = items.length > options.threshold;

  const [pageSize, setPageSize] = useState(options.pageSize);
  const [pageIndex, setPageIndex] = useState(options.startPageIndex ?? 0);

  const pagesCount = getPageCount({ items, pageSize });
  const lastPageIndex = pagesCount - 1;

  const [getCache, setCache] = useStatic<T[][] | null>(null);

  const depList = {
    shouldPaginate,
    pagesCount,
    pageSize,
    items,
  };
  const prevDepList = usePrevious(depList);

  const pages = useMemo(() => {
    if (isEqual(prevDepList, depList)) {
      /**
       * Cache will be initialized here already due to `prevDepList` being undefined at first
       */
      return getCache() ?? [];
    }

    const pages = getPages();

    setCache(cloneDeep(pages));

    return pages;
  }, [shouldPaginate, pagesCount, pageSize, items]);

  const page = shouldPaginate ? pages[pageIndex] ?? [] : items;

  const canPrevPage = pageIndex > 0;
  const canNextPage = pageIndex < lastPageIndex;

  /**
   * Reset `pageIndex` if out of bounds
   */
  useEffect(() => {
    if (pageIndex > lastPageIndex) setPageIndex(lastPageIndex);
  }, [pageIndex, lastPageIndex]);

  function getPages(): T[][] {
    const pages: T[][] = [];

    if (shouldPaginate) {
      for (let index = 0; index < pagesCount; index++) {
        /*
         * COLUMNS
         */
        const page = paginate(items, pageSize, index);

        pages.push(page);
      }
    }

    return pages;
  }

  function getPageCount(input: { items: T[]; pageSize: number }): number {
    const { items, pageSize } = input;

    return Math.ceil(items.length / pageSize);
  }

  function handleChangePageSize(size: number) {
    if (size === pageSize) return;

    setPageSize(size);
    resetPage();
  }

  function handleChangePage(index: number) {
    if (index === pageIndex) return;

    let computedIndex = index;

    if (index < 0) {
      computedIndex = 0;
    } else if (index > lastPageIndex) {
      computedIndex = lastPageIndex;
    }

    setPageIndex(computedIndex);
  }

  function resetPage() {
    setPageIndex(0);
  }

  function firstPage() {
    setPageIndex(0);
  }

  function lastPage() {
    setPageIndex(lastPageIndex);
  }

  function prevPage() {
    handleChangePage(pageIndex - 1);
  }

  function nextPage() {
    handleChangePage(pageIndex + 1);
  }

  return {
    pageIndex,
    pageSize,
    pagesCount,
    ////////////
    shouldPaginate,
    ////////////
    page,
    pages,
    //////////////////////
    canPrevPage,
    canNextPage,
    //////////////////////
    firstPage,
    lastPage,
    prevPage,
    nextPage,
    //////////////////////
    changePage: handleChangePage,
    changePageSize: handleChangePageSize,
    resetPage,
  };
}
