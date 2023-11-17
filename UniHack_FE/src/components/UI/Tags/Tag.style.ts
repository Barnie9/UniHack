import styled, { css } from 'styled-components/macro';

import { ColorsX } from 'environment/theme/ColorsX';
import { generateSpacingOffsets } from 'helpers';
import { StyleOffsets } from 'types';

interface Props {
	disabled?: boolean;
	active?: boolean;
	paddingOffset?: StyleOffsets;
	marginOffset?: StyleOffsets;
	clickable?: boolean;
}

export const TagWrapper = styled.div<Props>`
	${({ disabled, active, paddingOffset, marginOffset, clickable }) => css`
		border-radius: 0.4rem;
		display: flex;
		align-items: center;
		padding: 0.2rem 0.8rem;
		width: fit-content;
		background-color: ${active ? ColorsX.primary.disabled : ColorsX.background.disabled};

		${disabled &&
		css`
			background-color: ${ColorsX.background.disabled};
		`};

		${clickable &&
		!disabled &&
		css`
			cursor: pointer;
		`};

		/* SPACING OFFSETS */
		${generateSpacingOffsets({ paddingOffset, marginOffset })}
	`}
`;
