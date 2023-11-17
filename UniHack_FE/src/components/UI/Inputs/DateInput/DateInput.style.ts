import Picker, { DatePickerProps } from 'react-date-picker';
import styled, { css } from 'styled-components/macro';

import { getTypographyCSS } from 'components/UI/Typography';
import { ColorsX, Shadows } from 'environment';

interface Props extends DatePickerProps {
	open: boolean;
	value: Date | null;
	error?: boolean;
	readOnly?: boolean;
	prevLabel?: JSX.Element | null;
	prev2Label?: JSX.Element | null;
	nextLabel?: JSX.Element | null;
	next2Label?: JSX.Element | null;
	isOnDatasetPage?: boolean;
	openDownwards?: boolean;
	id?: string;
	onChange?: (e: Date) => void;
}

export const DatePicker = styled(Picker)<Props>`
	.react-calendar__navigation__label__labelText.react-calendar__navigation__label__labelText--from {
		white-space: nowrap;
	}
	${({ open, disabled, readOnly, error, isOnDatasetPage, openDownwards }) => css`
		height: 4rem;
		width: 100%;
		border-radius: 0.4rem;

		.react-calendar {
			padding: 1.6rem;
		}

		.react-calendar__navigation {
			margin-bottom: 1.6rem;
			background-color: ${ColorsX.white} !important;

			button {
				background-color: ${ColorsX.white} !important;
			}
		}

		.react-calendar__navigation__arrow {
			min-width: 2.4rem;
			padding: 0;
		}

		.react-calendar__navigation__label {
			/* H5 */
			font-size: 2rem;
			line-height: 1.6;
			font-weight: 700;
		}

		.react-date-picker__inputGroup__month {
			font-size: 1.4rem;
		}

		.react-calendar__month-view__weekdays {
			margin-bottom: 0.4rem;
		}

		.react-calendar__month-view__weekdays__weekday {
			padding: 0;
		}

		.react-calendar__month-view__days__day {
			/* TYPOGRAPHY SETTER */
			${getTypographyCSS(t => t.Paragraph)}
		}

		.react-date-picker__inputGroup__input {
			padding: 0;
		}

		.react-date-picker__inputGroup__leadingZero {
			/* TYPOGRAPHY SETTER */
			${getTypographyCSS(t => t.Paragraph)}

			margin-left: 0;
			margin-right: 0.7rem;
		}

		.react-date-picker__inputGroup__divider {
			/* TYPOGRAPHY SETTER */
			${getTypographyCSS(t => t.Paragraph)}
		}

		.react-date-picker__wrapper {
			display: flex;
			align-items: center;
			width: 100%;
			padding: 0.8rem;
			border: 0.12rem solid
				${error
					? ColorsX.text.error
					: open
					? ColorsX.primary.normal
					: ColorsX.text.disabled};
			border-radius: 0.4rem;
			background-color: ${ColorsX.white};
			transition: 0.1s;
			cursor: pointer;
		}

		.react-date-picker__button {
			padding: 0;
			outline: none;
		}

		.react-date-picker__clear-button {
			margin-right: 0.8rem;
			display: flex;
		}

		.react-date-picker__inputGroup {
			min-width: 14rem;
			align-items: center;
			padding: 0;
		}

		.react-date-picker__calendar {
			width: 100%;
			transform: translateY(0.2rem);
		}

		.react-date-picker__calendar--open {
			overflow: hidden;
			border-radius: 0.4rem;
			box-shadow: ${Shadows.hover};
			/* offset for when its rendered above */
			margin-bottom: 0.5rem;
		}

		.react-date-picker__calendar.react-date-picker__calendar--open {
			min-width: 29rem !important;
			height: initial !important;

			${(isOnDatasetPage || openDownwards) &&
			// Force calendar to always open downwards in dataset
			css`
				top: 104% !important;
				bottom: initial !important;
			`}
		}

		.react-calendar {
			width: 100%;
			background-color: ${ColorsX.white};
			border: none;
			border-radius: 0.4rem;
		}

		.react-calendar__century-view,
		.react-calendar__decade-view,
		.react-calendar__year-view {
			padding: 1rem;
			padding-top: 0;
		}
		.react-calendar__month-view__weekdays {
			text-transform: capitalize;
			font-size: 1rem;
		}

		.react-calendar__month-view__weekdays__weekday {
			cursor: default;

			abbr {
				font-size: 1rem;
				line-height: 1.6;
				font-weight: 400;
				cursor: default;
			}
		}

		.react-calendar__month-view__days__day--weekend {
			color: ${ColorsX.text.main};
		}

		.react-calendar__tile {
			/* TYPOGRAPHY SETTER */
			${getTypographyCSS(t => t.Paragraph)}

			padding: 0;
			height: 3.2rem;
			overflow: hidden;
			border-radius: 0.4rem;
			border: 0.1rem solid ${ColorsX.transparent};
		}

		.react-calendar__tile:enabled:hover {
			border: 0.1rem solid ${ColorsX.primary.normal};
			background-color: ${ColorsX.white};
		}

		.react-calendar__tile:disabled {
			color: ${ColorsX.text.disabled} !important;
			background-color: ${ColorsX.white};
		}

		.react-calendar__tile--now {
			background-color: ${ColorsX.white};
			color: ${ColorsX.primary.normal};
			font-weight: 700;
		}

		.react-calendar__tile--active,
		.react-calendar__tile--active:enabled:hover,
		.react-calendar__tile--active:enabled:focus {
			background-color: ${ColorsX.primary.normal};
			color: ${ColorsX.white};
			font-weight: 400;
			border-color: ${ColorsX.primary.normal};
		}

		.react-calendar__tile--hasActive,
		.react-calendar__tile--hasActive:hover {
			color: ${ColorsX.white};
			background-color: ${ColorsX.primary.normal};
		}

		.react-calendar__month-view__days__day--neighboringMonth {
			color: ${ColorsX.text.disabled} !important;
		}

		.react-calendar__tile .react-calendar__month-view__days__day {
			/* TYPOGRAPHY SETTER */
			${getTypographyCSS(t => t.Paragraph)}
		}

		input {
			color: ${ColorsX.text.main};
			font-size: 1.4rem;
			font-weight: normal;
			padding: 0 0.5rem;
			outline: none;

			&:invalid {
				background-color: ${ColorsX.transparent};
			}
		}

		input[type='date'] {
			top: 0px !important;
			left: 0px !important;
		}

		abbr {
			border: none;
			text-decoration: none;
		}

		select {
			color: ${ColorsX.text.main};
			pointer-events: none;
			outline: none;
			appearance: none;
			text-indent: 1px;
			text-overflow: '';
		}

		.react-date-picker__inputGroup__input {
			::placeholder,
			::-webkit-input-placeholder {
				color: ${ColorsX.text.caption};
			}
		}

		.react-date-picker__inputGroup__input:invalid {
			background: unset;
		}

		${readOnly &&
		css`
			pointer-events: none;

			.react-date-picker__wrapper {
				border-color: ${ColorsX.text.disabled};
				background-color: ${ColorsX.background.disabled};
			}

			.react-date-picker__clear-button {
				display: none;
			}
		`};

		${disabled &&
		css`
			pointer-events: none;

			.react-date-picker__wrapper {
				border-color: ${ColorsX.background.disabled};
				background-color: ${ColorsX.background.disabled};
			}

			.react-date-picker__inputGroup__input {
				background: ${ColorsX.background.disabled};
			}

			.react-date-picker__clear-button {
				display: none;
			}

			.react-date-picker__calendar-button svg {
				color: ${ColorsX.text.disabled};
			}

			.react-date-picker__inputGroup__year,
			.react-date-picker__inputGroup__month,
			.react-date-picker__inputGroup__day,
			.react-date-picker__inputGroup__divider,
			.react-date-picker__inputGroup__leadingZero {
				color: ${ColorsX.text.disabled};

				::placeholder,
				::-webkit-input-placeholder {
					color: ${ColorsX.text.disabled};
				}
			}
		`};
	`}
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
