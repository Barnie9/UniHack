import styled from 'styled-components/macro';

import { ColorsX } from 'environment';
import { getMarginOffset } from 'helpers';
import { StyleOffsets } from 'types';

interface NotificationWrapperProps {
	marginOffset?: StyleOffsets;
}

export const NotificationWrapper = styled.div<NotificationWrapperProps>`
	position: relative;
	display: flex;

	${({ marginOffset }) => getMarginOffset(marginOffset)}
`;

export const NotificationsCounter = styled.div`
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	top: 5px;
	right: 6px;
	background-color: ${ColorsX.text.errorHover};
	color: ${ColorsX.white};
	font-size: 8px;
	font-weight: bold;
	line-height: 1.25;
	width: 1.2rem;
	height: 1.2rem;
	border-radius: 50%;
	pointer-events: none;
`;
