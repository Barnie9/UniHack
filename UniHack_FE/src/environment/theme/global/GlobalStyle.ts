import { createGlobalStyle, css } from 'styled-components/macro';

import { ScrollBarStyle } from 'environment';
import { isOnWindows } from 'helpers';

import { StyleGuide } from './StyleGuide';

interface GlobalStyleProps {
	showBrowserWarning: boolean;
}

export const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
	* {
		box-sizing: border-box;
		/* Without this option we can't set backgrounds on divs on print mode */
		-webkit-print-color-adjust: exact !important;
	}

	html, body {
		height: 100%;

		${
			isOnWindows() &&
			css`
				overflow: auto;

				${ScrollBarStyle}

				div {
					${ScrollBarStyle}
				}
			`
		};
	}

	html.is-touch {
		.showOnTouchDevices {
			visibility: visible;
		}
	}

	div#root {
		min-height: 100%;
	}

	html {
		/* SET rem BASE TO 10px */
		font-size: 10px;
		padding-right: env(safe-area-inset-right);
	}

	html * {
		font-family: DMSans, 'DM Sans', sans-serif;
	}

	body {
		margin: 0;
		padding: 0;
	}

	/* CSS resetters */
	h1, h2, h3, h4, h5, h6, p, label {
		margin: 0;
	}

	table {
		border-spacing: 0;
	}

	${({ showBrowserWarning }) =>
		showBrowserWarning &&
		css`
			.header-main {
				top: 4.8rem;
			}
		`}

	${StyleGuide}

	.pulse-vibrant-green {
		animation: pulse 1s ease-out;
	}

	@keyframes pulse {
		15%, 90% {
			background-color: rgba(38, 208, 124, 0.3); /* #vibrant green, 30% */
		}
	}
`;
