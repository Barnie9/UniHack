import { PrimaryButtonProps, NeutralButtonProps } from 'types';

type ButtonProps = {
	primary: Exclude<PrimaryButtonProps, false>;
	neutral?: Exclude<NeutralButtonProps, false>;
};

export function initButtonProps(constructor: (input: ButtonProps) => void): ButtonProps {
	/**
	 * Init data structure
	 */
	const buttonProps: ButtonProps = {
		primary: {},
		neutral: {}
	};

	/**
	 * Apply changes from the `constructor` callback
	 */
	constructor(buttonProps);

	return buttonProps;
}
