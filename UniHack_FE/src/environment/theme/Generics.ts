import { css } from 'styled-components/macro';

export const ScrollBarStyle = css`
	scrollbar-width: thin;
	scrollbar-color: #748394 transparent;

	scrollbar-width: thin;
	scrollbar-color: #748394 rgba(0, 0, 0, 0);

	::-webkit-scrollbar {
		-webkit-appearance: none;
		width: 7px;
		height: 7px;
	}

	::-webkit-scrollbar-thumb {
		border-radius: 10px;
		background-color: #748394;
		box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
	}

	::-webkit-scrollbar-track {
		background: rgba(0, 0, 0, 0);
	}
`;
