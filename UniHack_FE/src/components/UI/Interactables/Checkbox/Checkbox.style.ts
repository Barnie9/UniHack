import styled, { css } from 'styled-components/macro';

import {
	borderActive,
	borderActiveDisabled,
	// borderDefault,
	borderDisabled,
	Disabled,
	generateSpacingOffsets
} from 'helpers';
import { ColorsX } from 'environment';
import { Typography } from 'components/UI/Typography';
import { Icon as DefaultIcon } from 'components/UI/Icons/Icon';
import { SpacingOffsets } from 'types';

import { borderDefault } from 'helpers/cssGenerators';

interface IContainer extends Disabled, SpacingOffsets {
	isInList?: boolean;
	checked?: boolean;
}

interface CheckboxProps {
	checked?: boolean;
}

export const HiddenInput = styled.input`
	width: 0;
	height: 0;
	border: 0;
	margin: 0;
	padding: 0;
	opacity: 0;
	display: block;
	position: absolute;
`;

export const Checkbox = styled.div<CheckboxProps>`
	height: 1.6rem;
	width: 1.6rem;
	min-width: 1.6rem;
	max-width: 1.6rem;

	transition: 0.2s;

	${borderDefault}

	border-radius: 0.2rem;

	display: flex;
	justify-content: center;
	align-items: center;

	${({ checked }) =>
		checked &&
		css`
			cursor: pointer;
		`}
`;

export const CheckIcon = styled(DefaultIcon)`
	display: none;
`;

export const Container = styled.div<IContainer>`
	width: 100%;
	min-height: 2.4rem;
	display: flex;
	user-select: none;
	align-items: flex-start;
	cursor: pointer;

	${({ isInList }) =>
		isInList
			? css`
					margin-right: 1rem;
			  `
			: null};

	${({ disabled }) =>
		disabled &&
		css`
			pointer-events: none;
		`}
	:hover {
		${Checkbox} {
			${borderActive}
		}
	}

	${({ checked }) =>
		checked &&
		css`
			${Checkbox} {
				${borderActive}
				background: ${ColorsX.primary.normal};
			}
			${CheckIcon} {
				display: flex;
			}
		`}

	${({ disabled, checked }) => {
		if (disabled)
			return css`
				pointer-events: none;
				${Checkbox} {
					${checked ? borderActiveDisabled : borderDisabled}
					background: ${checked ? ColorsX.primary.disabled : `transparent`};
				}

				${Typography.Paragraph} {
					color: ${ColorsX.text.disabled};
				} ;
			`;
	}}

	/* SPACING OFFSETS */
	${({ marginOffset, paddingOffset }) => css`
		${generateSpacingOffsets({ paddingOffset, marginOffset })}
	`}
`;

export const Wrapper = styled.div<Disabled>`
	${CheckIcon} {
		display: none;
	}

	input:checked ~ label > div > div > ${Checkbox} {
		${borderActive}
		background: ${ColorsX.primary.normal};

		${CheckIcon} {
			display: flex;
		}
	}

	${({ disabled }) => {
		if (disabled)
			return css`
				pointer-events: none;
				${Checkbox} {
					${borderDisabled}
				}
				${Typography.Paragraph} {
					color: ${ColorsX.text.disabled};
				}

				input:checked ~ label > div > div > ${Checkbox} {
					${borderActiveDisabled}
					background: ${ColorsX.primary.disabled};
				}
			`;
	}}
`;

export const CheckboxWrapper = styled.div`
	padding: 0.4rem;
`;
