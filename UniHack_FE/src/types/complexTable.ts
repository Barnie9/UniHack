import { TableFilterType } from './enums';
import { GenericMap } from './maps';

export interface ComplexTableColumn {
	name: string;
	label: string;
	isOptional?: boolean;
	filterType?: TableFilterType;
	hasCheckboxSearch?: boolean; // applies to checkbox filters
	disableSort?: boolean; // removes sorting property from this column
}

export type ComplexTableRow = { id: string } & {
	[key: string]: string | number;
};

export type CustomCellType = GenericMap<GenericMap<string | JSX.Element>>;

export type ExtraCellsType = GenericMap<JSX.Element>;
