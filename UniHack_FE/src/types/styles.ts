export interface Offset {
	top?: number;
	bottom?: number;
	left?: number;
	right?: number;
}

export interface StyleOffset extends Offset {
	x?: number;
	y?: number;
	all?: number;
	custom?: number | string;
}

export type StyleOffsets = StyleOffset | false;

export interface SpacingOffsets {
	marginOffset?: StyleOffsets;
	paddingOffset?: StyleOffsets;
}

export interface StyleColors {
	color?: string;
	background?: string;
	hover?: string;
	hoverBackground?: string;
	active?: string;
	activeBackground?: string;
	disabled?: string;
	disabledBackground?: string;
}
