import { useParams } from "react-router-dom";
import { RouteParams } from "types";

export function useRouteParams() {
  // @ts-ignore
  return useParams<RouteParams>();
}
