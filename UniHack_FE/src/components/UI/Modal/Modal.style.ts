import styled, { css } from 'styled-components/macro';

import { ColorsX } from 'environment';

import { ModalSizes } from './Modal';
import { FontWeights, Typography } from '../Typography';

interface ContainerProps {
	modalSize: number;
	fullSizeConfig?: {
		narrow?: boolean;
		centerTitle?: boolean;
	};
}

export const Container = styled.div<ContainerProps>`
	${({ modalSize, fullSizeConfig }) => css`
		display: flex;
		flex-direction: column;
		position: relative;
		z-index: 999;
		width: 100%;
		max-width: ${modalSize}rem;
		max-height: 70.8rem;
		border-radius: 0.4rem;
		background-color: ${ColorsX.white};

		${modalSize === ModalSizes.full
			? css`
					height: 100%;
					max-height: 100vh;
					max-width: 100vw;
					border-radius: unset;

					${fullSizeConfig?.narrow &&
					css`
						${fullSizeConfig?.centerTitle &&
						css`
							${Header} h6 {
								text-align: center;
							}

							${Tabs} > div {
								width: 100%;

								::after {
									width: 74%;
								}
							}
						`}

						${TitleContainer} {
							max-width: 65.2rem;
							margin: auto;
						}

						${Tabs}, ${Body}, ${Footer} {
							max-width: 70rem;
							margin: auto;
						}
					`}
			  `
			: css`
					${modalSize === ModalSizes.s &&
					css`
						${Body} {
							overflow: unset;
						}
					`}

					${modalSize === ModalSizes.m &&
					css`
						height: 100%;
					`}

				@media (max-width: ${modalSize * 10 + 100}px) {
						height: 100%;
						max-height: calc(100vh - 2rem);
						max-width: calc(100vw - 2rem);
					}

					@keyframes enterAnimationModal {
						from {
							transform: translate(0, 0.4rem);
						}
						to {
							transform: unset;
						}
					}

					animation: enterAnimationModal 0.15s;
			  `}
	`}
`;

export const Header = styled.div`
	width: 100%;
	min-height: 6rem;
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	padding: 1.6rem 2.4rem;
	position: relative;

	.modal-header__close-icon {
		position: absolute;
		top: 1.6rem;
		right: 2.4rem;
	}
`;

export const TitleContainer = styled.div`
	width: 100%;
	/* in order for ellipsis to work */
	min-width: 0;
	/* give "close-icon" some treshold when ellipsis hits on "modal-title" */
	padding-right: 2.4rem;
`;

export const Footer = styled.div`
	width: 100%;
	display: flex;
	justify-content: flex-end;
	padding: 1.6rem 2.4rem;
`;

export const Body = styled.div<{ bodySpacing: boolean }>`
	width: 100%;
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	overflow: auto;

	/* for Firefox */
	min-height: 0;

	${({ bodySpacing }) =>
		bodySpacing &&
		css`
			padding: 2.4rem;
		`}
`;

export const Tabs = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	padding: 0 2.4rem;
`;

interface TabProps {
	active?: boolean;
	disabled?: boolean;
}
export const Tab = styled.div<TabProps>`
	${({ active, disabled }) => css`
		display: flex;
		cursor: pointer;
		justify-content: center;
		align-items: center;
		height: 4rem;
		min-width: 14rem;
		width: 14rem;
		transition: 0.1s;
		position: relative;
		text-decoration: none;
		user-select: none;

		::after {
			display: block;
			content: '';
			width: 6.8rem;
			height: 0.2rem;
			border-radius: 0 0 0.4rem 0.4rem;
			background-color: ${ColorsX.primary.normal};
			position: absolute;
			bottom: 0;
			opacity: 0;
		}

		${active &&
		css`
			text-decoration: none;

			&::after {
				opacity: 1;
			}

			${Typography.Paragraph} {
				color: ${ColorsX.primary.normal};
				font-weight: ${FontWeights.medium};
			}
		`}

		:hover {
			border-color: ${ColorsX.primary.normal}!important;
			text-decoration: none;

			${Typography.Paragraph} {
				color: ${ColorsX.primary.normal};
			}
		}

		&:visited {
			${!active &&
			css`
				border-color: ${ColorsX.transparent};
				text-decoration: none;
			`}
		}

		${disabled &&
		css`
			cursor: unset;

			${Typography.Paragraph} {
				color: ${ColorsX.text.disabled};
			}

			:hover {
				${Typography.Paragraph} {
					color: ${ColorsX.text.disabled};
				}
			}
		`}
	`}
`;
