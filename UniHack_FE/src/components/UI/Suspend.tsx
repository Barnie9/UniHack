import React, { useEffect, useState } from "react";

import { Loader } from "components/UI/Loader";
import { usePrevious } from "hooks";

interface Props {
  children: React.ReactNode;
  loading: boolean;
  loader?: JSX.Element;
  delay?: number;
  immediate?: boolean;
}

export function Suspend({
  children,
  loading,
  loader = <Loader primary />,
  delay = 400,
  immediate = false,
}: Props) {
  const [isLoading, setIsLoading] = useState(immediate || false);
  const [isDeferring, setIsDeferring] = useState(false);

  useEffect(() => {
    if (isDeferring) {
      const timeout = setTimeout(() => setIsDeferring(false), delay);
      return () => clearTimeout(timeout);
    }
  }, [isDeferring]);

  const wasImmediate = usePrevious(immediate);
  useEffect(() => {
    if (wasImmediate !== immediate && immediate !== isLoading)
      setIsLoading(immediate);
  }, [immediate]);

  const wasLoading = usePrevious(loading);
  useEffect(() => {
    if (!isLoading && loading) {
      setIsLoading(true);
      setIsDeferring(true);
    }

    if (isLoading && wasLoading && !loading) {
      setIsLoading(false);
    }
  }, [loading]);

  if (isDeferring) return <>{children}</>;

  if (isLoading) return loader;

  return <>{children}</>;
}
