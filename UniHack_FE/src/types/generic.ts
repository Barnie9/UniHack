import { AlertType } from "types";

import { Action } from "redux";

export type Optional<T> = T | undefined;

export type Map<K extends number | string, V> = { [k in K]: V };

export interface ActionWithPayload<T, P> extends Action<T> {
  payload: P;
}

export type HTMLInput = HTMLInputElement | HTMLTextAreaElement;

export interface Alert {
  uuid: string;
  type: AlertType;
  message: string;
  title?: string;
  timeout?: number;
}

export type Nullable<T> = T | null | undefined;

export type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> &
      Partial<Record<Exclude<Keys, K>, undefined>>;
  }[Keys];

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export type MutableState<S> = S | ((prevState: S) => S | void);
export type SetMutableState<S> = (newValue: MutableState<S>) => void;
export type GetMutableState<S> = () => S;

interface GenericButtonProps {
  label?: string;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export type PrimaryButtonProps =
  | (GenericButtonProps & { warning?: boolean })
  | false;
export type NeutralButtonProps = GenericButtonProps | false;

export interface ScalesLabels {
  labelX?: string;
  labelY?: string;
}

export type SvgComponent = React.FunctionComponent<
  React.SVGProps<SVGSVGElement>
>;

/**
 * This is a generic interface that is used in
 * order to be able to expose more data when using a general component
 * such that we limit the number of props, especially optional props.
 *
 * It builds on the idea of using an Enum in order to choose how a component should behave,
 * but also let's you add functions to those Enums.
 *
 * It could be used with a function, or just with an Enum-like type
 * @example <Select type={s => s.Icon(...args)} />
 * <Select type={s => s.Tag} />
 * @
 *
 * How to use:
 *
 * You will always need 3 things:
 *
 * @example // An Enum with all the possible component types
 * enum SelectTypesE {
 *	Tab,
 * 	Tag,
 *	Icon
 *}
 *	// A type that extends this generic, using said Enum
 * type SelectType<T = {}> = GenericExposer<SelectTypesE, T>;
 *
 *	// And in order to put everything together; a CLASS that will use
	// static variables pointing to certain Enum values in simple cases
	// and static functions with the same name as the Enum value you want to use
	// for the cases that require arguments.
	//
	// IMPORTANT: Be sure to type the return type of the function in order to make it work properly

	export class SelectTypes {
	static Tag: SelectType = { type: SelectTypesE.Tab };

	static Tab = (isActive: boolean): SelectType<boolean> => {
		return { payload: isActive, type: SelectTypesE.Tab };
	};

	static Icon = (icon: JSX.Element): SelectType<JSX.Element> => {
		return { payload: icon, type: SelectTypesE.Icon };
	};
}
@
	Every 'exntended enum' type will always have a payload and a type -> pointing to a value in the original Enum
 *	For any uncertanties, take a look at how <Select> is being implemented and used.
 */

export type FunctionType<T, G> = (type: T) => G;

export interface SelectItem {
  label: string;
  value: string;
}

export interface SelectGroup<T> {
  label: string;
  options: T[];
}

export type SelectItemOrGroup = SelectItem | SelectGroup<SelectItem>;

export type SelectItemsFormatter = (
  formatter: (items: string[]) => SelectItem[]
) => SelectItem[];

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

export interface Bounds {
  left: number;
  top: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
}
