import debounce from "lodash/debounce";
import { useRef } from "react";

export function useDebounce<I = void>(
  callback: (input?: I) => void,
  wait = 300
) {
  return useRef(debounce(callback, wait)).current;
}
