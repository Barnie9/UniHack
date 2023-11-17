import styled, { css } from 'styled-components/macro';

interface UserAvatarProps {
	size: number;
	background: string;
	cursor?: string;
}

export const UserAvatar = styled.div<UserAvatarProps>`
	${({ cursor, size, background }) => css`
		cursor: ${cursor};
		border-radius: 50%;
		overflow: hidden;
		display: flex;
		justify-content: center;

		background-color: ${background};

		width: ${size}rem;
		height: ${size}rem;
		min-width: ${size}rem;
		max-width: ${size}rem;
		min-height: ${size}rem;
		max-height: ${size}rem;
	`}
`;

export const AvatarImage = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;
