import React, { forwardRef } from "react";

import { Svgs, ColorsX } from "environment";

import { Icon, OptionalIconProps } from "./Icon";
import { NotificationWrapper, NotificationsCounter } from "./CustomIcons.style";

export const FilterIcon = forwardRef<HTMLDivElement, OptionalIconProps>(
  (props, ref) => (
    <Icon
      {...props}
      ref={ref}
      variant={(v) => v.button}
      svg={Svgs.Filter}
      size={(s) => s.s}
      {...(props.size && { size: props.size })}
      paddingOffset={{ all: 0.4 }}
      {...(props.active && {
        colors: {
          color: ColorsX.chart.darkGreen.dark,
          background: "rgba(38, 208, 124, 0.2)", // #vibrant green, 20%
        },
      })}
    />
  )
);

interface NotificationIconProps extends OptionalIconProps {
  count?: number;
}

export const NotificationIcon = forwardRef<
  HTMLDivElement,
  NotificationIconProps
>(({ count, marginOffset, onClick, ...props }, ref) => {
  return (
    <NotificationWrapper marginOffset={marginOffset}>
      {count !== undefined && count > 0 && (
        <NotificationsCounter onClick={onClick}>{count}</NotificationsCounter>
      )}
      <Icon
        {...props}
        ref={ref}
        variant={(v) => v.buttonActive}
        svg={Svgs.Notifications}
        onClick={onClick}
      />
    </NotificationWrapper>
  );
});
