import invariant from "invariant";
import { createContext, useContext } from "react";

interface ContextValue {
  [key: string]: {
    onToggle: (id?: any) => void;
    open: boolean;
  };
}

export const FacilityModalsContext = createContext<ContextValue>({
  // these 3 need to always have a value because the component that accesses these is rendered in 2 places for different reasons;
  editDeviceLocation: {
    onToggle: () => null,
    open: false,
  },
  editDeviceDetails: {
    onToggle: () => null,
    open: false,
  },
  removeDevice: {
    onToggle: () => null,
    open: false,
  },
});

export function useFacilityModalsContext() {
  const context = useContext(FacilityModalsContext);
  invariant(
    context,
    "useFacilityModalsContext must be used within a DrawerContext.Provider"
  );
  return context;
}
