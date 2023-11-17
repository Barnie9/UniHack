import styled, { css } from 'styled-components/macro';

import { DROPDOWN_ITEM } from 'consts';
import { ColorsX } from 'environment';
import { Disabled } from 'helpers';
import { Typography } from 'components/UI/Typography';
import { Checkbox } from 'components/UI/Interactables/Checkbox/Checkbox.style';
import { Container as IconContainer } from 'components/UI/Icons/Icon.style';
interface ContainerProps extends Disabled {
	button?: boolean;
}
interface TextProps {
	active: boolean;
}

export const Text = styled(Typography.Paragraph)<TextProps>`
	color: ${({ active }) => (active ? ColorsX.primary.normal : ColorsX.text.main)};
	user-select: none;
`;

export const Container = styled.div<ContainerProps>`
	${({ disabled, button }) => css`
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;

		/* THIS NEEDS TO BE REVISED */
		/* min-height: ${button
			? DROPDOWN_ITEM.button.minHeight + 'px'
			: DROPDOWN_ITEM.regular.minHeight + 'px'}; */

		min-height: 3rem;
		padding: 0.4rem 0.8rem;
		cursor: pointer;

		${Checkbox} {
			transition: all 0s;
		}

		${!disabled &&
		css`
			:hover {
				background-color: ${ColorsX.primary.normal};

				${Text}, * {
					color: ${ColorsX.white};
				}

				${Checkbox} {
					border-color: ${ColorsX.white};
					background: ${ColorsX.primary.normal};
				}

				.checked {
					${Checkbox} {
						border-color: ${ColorsX.white};
						background: ${ColorsX.white};

						${IconContainer} * {
							color: ${ColorsX.primary.normal};
						}
					}
				}
			}
		`};

		${disabled &&
		css`
			pointer-events: none;

			${Text}, * {
				color: ${ColorsX.text.disabled};
			}

			${Checkbox} {
				border-color: ${ColorsX.text.disabled};
				background: ${ColorsX.white};
			}

			.checked {
				${Checkbox} {
					border-color: ${ColorsX.primary.disabled};
					background: ${ColorsX.primary.disabled};

					${IconContainer} * {
						color: ${ColorsX.white};
					}
				}
			}
		`}
	`}
`;
