import styled, { css } from 'styled-components/macro';

import { ColorsX } from 'environment';
import { RadioButtonUncontrolled as DefaultRadioButtonUncontrolled } from 'components/UI/Interactables/Uncontrolled/RadioButton';
import { disableableComponent, Disabled } from 'helpers';
import { Typography } from 'components/UI/Typography';

export const Container = styled.div`
	display: flex;
	flex-direction: column;

	/* show tooltip on hover */
	:hover .tooltip__icon {
		visibility: visible;
	}
`;

interface AlignmentProps {
	isVertical?: boolean;
}
export const Alignment = styled.div<AlignmentProps>`
	display: flex;
	flex-wrap: wrap;
	align-items: flex-start;

	${({ isVertical }) =>
		isVertical &&
		css`
			flex-direction: column;

			> div {
				margin-bottom: 0.8rem;
			}
		`};
`;

export const RadioButtonUncontrolled = styled(DefaultRadioButtonUncontrolled)`
	width: auto;
	max-width: 100%;
	margin-right: 2.4rem;
`;

export const Wrapper = styled.div`
	display: flex;
	max-width: 100%;
`;

export const NewValueWrapper = styled.div`
	display: flex;
	max-width: 22rem;
	align-items: flex-start;
`;

export const AddNewValue = styled.div<Disabled>`
	cursor: pointer;

	:hover {
		text-decoration: underline;
	}

	${({ disabled }) => disableableComponent({ disabled })}
`;

export const CancelButton = styled(Typography.Paragraph)`
	cursor: pointer;
	padding: 0.8rem;
	color: ${ColorsX.primary.normal};

	:hover {
		text-decoration: underline;
	}
`;

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
