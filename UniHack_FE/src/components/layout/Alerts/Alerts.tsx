import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { DEFAULT_ACTIVITY_TIMEOUT } from "consts";
import { Colors, Svgs } from "environment";

import { Icon, Style } from "./Alerts.style";

interface Props {
  children: React.ReactNode;
}

export function Alerts({ children }: Props) {
  return (
    <Style>
      <ToastContainer
        autoClose={DEFAULT_ACTIVITY_TIMEOUT}
        closeButton={() => (
          <Icon
            colors={{
              color: Colors.white,
            }}
            size={(t) => t.s}
            svg={Svgs.Close}
          />
        )}
        draggable={false}
        newestOnTop
      />
      {children}
    </Style>
  );
}

Alerts.error = toast.error;
Alerts.info = toast.info;
Alerts.success = toast.success;
