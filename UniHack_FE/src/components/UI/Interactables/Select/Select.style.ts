import styled, { css } from 'styled-components/macro';

import { ColorsX } from 'environment';
import { DropdownItem } from 'components/UI/Dropdown/DropdownItem';
import { FontWeights, Typography } from 'components/UI/Typography';

interface ToggleProps {
	open: boolean;
	disabled?: boolean;
	active?: boolean;
}

export const Toggle = styled.div<ToggleProps>`
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-radius: 0.4rem;
	padding: 0 0.8rem;
	height: 4rem;
	width: 100%;
	transition: all 0.2s;

	${({ open }) =>
		open
			? css`
					border: 0.12rem solid ${ColorsX.primary.normal};
			  `
			: css`
					border: 0.12rem solid ${ColorsX.text.disabled};
			  `}

	${({ disabled }) =>
		disabled
			? css`
					opacity: 0.5;
			  `
			: css`
					cursor: pointer;
			  `}
`;

export const Title = styled(Typography.Paragraph)`
	flex: 1;
`;

export const ToggleIcon = styled.div`
	width: 0;
	height: 0;
	border-left: 0.4rem solid transparent;
	border-right: 0.4rem solid transparent;
	border-top: 0.4rem solid ${ColorsX.primary.normal};
	margin-left: 0.4rem;
	transition: transform 0.15s;
`;

export const DropdownTagToggle = styled.div<ToggleProps>`
	cursor: pointer;
	width: max-content;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 0.8rem;
	border-radius: 0.4rem;

	${Typography.Caption} {
		color: ${ColorsX.primary.normal};
	}

	:hover {
		background: ${ColorsX.primary.disabled};
	}

	${({ open }) =>
		open &&
		css`
			background: ${ColorsX.primary.disabled};
		`};

	${({ disabled }) =>
		disabled &&
		css`
			pointer-events: none;
			background: ${ColorsX.background.disabled};

			${Typography.Caption} {
				color: ${ColorsX.text.disabled};
			}

			${ToggleIcon} {
				border-top: 4px solid ${ColorsX.text.disabled};
			}
		`};
`;

export const DropdownSubmenuItem = styled(DropdownItem)`
	min-width: 15rem;
`;

export const TabWrapper = styled.div`
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const Tab = styled.div<ToggleProps>`
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: 0.1s;
	position: relative;
	text-decoration: none;
	user-select: none;
	margin-right: 0.5rem;

	/* INITIAL */

	::after {
		display: block;
		content: '';
		width: 3.6rem;
		height: 0.2rem;
		border-radius: 0 0 0.4rem 0.4rem;
		background-color: ${ColorsX.primary.normal};
		position: absolute;
		bottom: 0;
		opacity: 0;
	}

	${Typography.Paragraph} {
		color: ${ColorsX.text.main};
		font-weight: ${FontWeights.normal};
	}

	~ ${ToggleIcon} {
		border-top: 0.4rem solid ${ColorsX.text.main};
	}

	/* INITIAL */

	:hover {
		${Typography.Paragraph} {
			color: ${ColorsX.primary.normal};
		}
		~ ${ToggleIcon} {
			border-top: 0.4rem solid ${ColorsX.primary.normal};
		}
	}

	${({ open, active }) =>
		(open || active) &&
		css`
			&::after {
				opacity: 1;
			}
			${Typography.Paragraph} {
				color: ${ColorsX.primary.normal};
				font-weight: ${FontWeights.medium};
			}
			~ ${ToggleIcon} {
				border-top: 4px solid ${ColorsX.primary.normal};
			}

			${open &&
			css`
				~ ${ToggleIcon} {
					transform: rotate(180deg);
				}
			`}
		`};

	${({ disabled }) =>
		disabled &&
		css`
			pointer-events: none;
			&::after {
				opacity: 0;
			}
			${Typography.Paragraph} {
				color: ${ColorsX.text.disabled};
				font-weight: ${FontWeights.normal};
			}
			~ ${ToggleIcon} {
				border-top: 4px solid ${ColorsX.text.disabled};
			}
		`}
`;
