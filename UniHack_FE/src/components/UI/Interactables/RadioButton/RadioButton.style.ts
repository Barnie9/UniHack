import styled, { css } from 'styled-components/macro';

import { ColorsX } from 'environment';
import { Typography } from 'components/UI/Typography';
import {
	// borderDefault,
	borderActive,
	borderActiveDisabled,
	borderDisabled,
	Disabled
} from 'helpers';

import { borderDefault } from 'helpers/cssGenerators';

interface ContainerProps {
	disabled?: boolean;
	selected?: boolean;
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

interface TextProps {
	error?: string;
}

export const Text = styled(Typography.Paragraph)<TextProps>`
	width: initial;
	overflow: hidden;
	text-overflow: ellipsis;
`;

export const RadioButtonCheck = styled.div`
	height: 0.8rem;
	width: 0.8rem;

	border-radius: 50%;

	background: ${ColorsX.primary.normal};
`;

export const RadioButton = styled.div`
	flex: 1;

	display: flex;
	justify-content: center;
	align-items: center;

	height: 1.6rem;
	width: 1.6rem;
	min-width: 1.6rem;
	max-width: 1.6rem;
	margin-right: 0.8rem;

	transition: 0.2s;

	${borderDefault};
	border-radius: 50%;
`;

export const Container = styled.div<ContainerProps>`
	display: flex;
	align-items: center;
	width: 100%;
	user-select: none;
	cursor: ${({ disabled }) => (disabled ? 'unset' : 'pointer')};

	:hover {
		${RadioButton} {
			${borderActive}
		}
	}
	${({ selected }) => {
		if (selected)
			return css`
				${RadioButton} {
					${borderActive}
				}
				${RadioButtonCheck} {
					background: ${ColorsX.primary.normal};
				}
			`;
	}}

	${({ disabled, selected }) => {
		if (disabled)
			return css`
				pointer-events: none;
				${RadioButton} {
					${selected ? borderActiveDisabled : borderDisabled}
				}
				${RadioButtonCheck} {
					background: ${selected ? ColorsX.primary.disabled : ColorsX.text.disabled};
				}
				${Text} {
					color: ${ColorsX.text.disabled};
				}
			`;
	}}
`;

export const Wrapper = styled.div<Disabled>`
	${RadioButtonCheck} {
		display: none;
	}

	input:checked ~ label > div > ${RadioButton} {
		${borderActive}

		${RadioButtonCheck} {
			display: flex;
		}
	}

	${({ disabled }) =>
		disabled &&
		css`
			pointer-events: none;

			${RadioButton} {
				${borderDisabled}
			}
			${RadioButtonCheck} {
				background: ${ColorsX.text.disabled};
			}
			${Text} {
				color: ${ColorsX.text.disabled};
			}

			input:checked ~ label > div > ${RadioButton} {
				${borderActiveDisabled}

				${RadioButtonCheck} {
					background: ${ColorsX.primary.disabled};
				}
			}
		`}
`;
