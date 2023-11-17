import styled, { css } from 'styled-components/macro';

import { ColorsX } from 'environment';
import { generateSpacingOffsets } from 'helpers';
import { SpacingOffsets } from 'types';

export const Container = styled.div<SpacingOffsets>`
	border: 0.1rem solid ${ColorsX.text.disabled};
	border-radius: 0.4rem;
	padding: 0.2rem 0.8rem;
	background-color: ${ColorsX.background.disabled};
	cursor: help;

	${({ paddingOffset, marginOffset }) => css`
		/* SPACING OFFSETS */
		${generateSpacingOffsets({ paddingOffset, marginOffset })}
	`};
`;
