import { css } from 'styled-components/macro';

import { getTypographyCSS } from 'components/UI/Typography';

export const StyleGuide = css`
	/* TYPOGRAPHY */
	h1,
	.h1 {
		${getTypographyCSS(t => t.H1)}
	}

	h2,
	.h2 {
		${getTypographyCSS(t => t.H2)}
	}

	h3,
	.h3 {
		${getTypographyCSS(t => t.H3)}
	}

	h4,
	.h4 {
		${getTypographyCSS(t => t.H4)}
	}

	h5,
	.h5 {
		${getTypographyCSS(t => t.H5)}
	}

	h6,
	.h6 {
		${getTypographyCSS(t => t.H6)}
	}

	.paragraph {
		${getTypographyCSS(t => t.Paragraph)}
	}

	.caption {
		${getTypographyCSS(t => t.Caption)}
	}

	.hint {
		${getTypographyCSS(t => t.Hint)}
	}

	.notification {
		${getTypographyCSS(t => t.Notification)}
	}

	.tooltip {
		${getTypographyCSS(t => t.Tooltip)}
	}

	.error {
		${getTypographyCSS(t => t.Error)}
	}
`;
