import { ActivityError } from "store/ui/activities";
import { Nullable } from "types";

export interface OperationParams {
  lazy?: boolean;
}

interface OperationResultData<D> {
  data: D;
  error: Nullable<ActivityError>;
  loaded?: boolean;
  loading: boolean;
  // metadata?: Metadata;
}

export type OperationResult<D = null, H = () => void> = [
  OperationResultData<D>,
  H
];

export type LocalOperationResult<D = null, H = () => void> = [{ data: D }, H];

export type ActivityResult<H = () => void> = [
  {
    loading: boolean;
    error: Nullable<ActivityError>;
  },
  H
];

export type Operation<H = () => void> = [
  { loading: boolean; error: boolean },
  H
];

export type LocalOperation<H = () => void> = H;

export type ApiOperation<D, H = () => void> = [
  {
    data: D;
    loading: boolean;
    error: boolean;
    fetched: boolean;
  },
  // HANDLER
  H,
  // RESETTER
  () => void
];

export type AnalysisResult = {
  loading: boolean;
  error: boolean;
};

export interface HookOptions {
  lazy?: boolean;
}
