import { Action } from 'store/types';
import { SelectItemsFormatter } from 'types';
export interface SelectItem {
	label: string;
	value?: string;
	items?: SelectItem[];
}

export type NewItems = SelectItem[] | SelectItemsFormatter;

export enum SelectTypesE {
	Tag,
	Tab,
	Icon
}

export type Tag = Action<SelectTypesE.Tag>;

export type Tab = Action<
	SelectTypesE.Tab,
	{
		isActive: boolean;
	}
>;

export type Icon = Action<
	SelectTypesE.Icon,
	{
		icon: JSX.Element;
	}
>;

export type SelectTypesA = Tag | Tab | Icon;

export class SelectTypes {
	static Tag: Tag = { type: SelectTypesE.Tag };

	static Tab = (isActive: boolean): Tab => {
		return { payload: { isActive }, type: SelectTypesE.Tab };
	};

	static Icon = (icon: JSX.Element): Icon => {
		return { payload: { icon }, type: SelectTypesE.Icon };
	};
}
