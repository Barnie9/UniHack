import { Offset } from "./styles";

export type Position = "bottom" | "top" | "left" | "right";

export interface GridProps {
  columnsPerRow: number;
  gutter: number;
  itemHeight: number;
  itemWidths: WidthsMap;
  offset: Offset;
  resizing: boolean;
}

export type WidthsMap = {
  [columns: number]: number;
};

export type SearchType =
  | "building"
  | "floor"
  | "room"
  | "aggregation"
  | "cell"
  | "metric"
  | "device"
  | "equipment-model"
  | "equipment-name"
  | "device-type";

export interface PlacementProps {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}
export interface LayoutStyleProps {
  height?: number | string;
  margin?: PlacementProps;
  padding?: PlacementProps;
  width?: number | string;
}

export interface LayoutFlexProps {
  flex?: number | string;
  justify?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  align?: "flex-start" | "center" | "flex-end" | "baseline";
}

export interface Payload {
  payload: {
    type: string;
    user_id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    role_id: number;
    status: boolean;
    temporary_password: string;
    last_password_change_date: string;
  };
  accessToken: string;
  refreshToken: string;
}
