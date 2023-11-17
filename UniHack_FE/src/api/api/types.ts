export type Nullable<T> = T | null;

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
	{
		[K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
	}[Keys];

export enum CellStatus {
	Critical,
	Warning,
	Optimal,
	None
}

export enum CellStatusLevel {
	CriticalHigh,
	CriticalLow,
	WarningHigh,
	WarningLow,
	Optimal,
	None
}

export enum ThresholdsColorScheme {
	Default,
	Temperature
}

export interface BaseFacility {
	//uuid: string;
	id: number;
	name: string;
}

export interface DataPoint {
	x: number;
	y: number;
	min?: number;
	max?: number;
	cnt?: number;
}
export interface Metadata {
	count: Nullable<number>;
	previous: Nullable<string>;
	next: Nullable<string>;
}

export interface Suggestion<I extends number | string> {
	id: I;
	name: string;
	breadcrumbs?: string;
}

export enum ReportsStatus {
	Missing,
	Starting,
	Generating,
	Ready,
	Error,
	NoValues
}
