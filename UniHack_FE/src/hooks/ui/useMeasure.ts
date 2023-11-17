import { useLayoutEffect, useRef, useState } from "react";
import useResizeObserver from "@react-hook/resize-observer";

interface Options {
  wait?: number;
  on?: boolean;
}

export function useMeasure<T extends HTMLElement>({
  on = true,
}: Options = {}): [React.RefObject<T>, ClientRect] {
  const ref = useRef<T>(null);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    width: 0,
    height: 0,
  });

  useResizeObserver(ref.current, (entry) => setBounds(entry.contentRect));
  useLayoutEffect(() => {
    if (on && ref.current) {
      setBounds(ref.current.getBoundingClientRect());
    }
  }, [on, ref]);

  //@ts-ignore
  return [ref, bounds];
}
