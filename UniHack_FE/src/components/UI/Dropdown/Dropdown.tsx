import React, { useRef, useState, useCallback } from 'react';

import { DROPDOWN_ITEM } from 'consts';
import { useOutsideClick, useMeasure } from 'hooks';
import { Offset } from 'types';

import { DropdownItem } from './DropdownItem';
import { DropdownMenu } from './DropdownMenu';
import { DropdownSubmenu } from './DropdownSubmenu';
import { DropdownToggle } from './DropdownToggle';

import { Container } from './Dropdown.style';
import { calculateDistance } from 'helpers';

import { InputError } from '../Inputs/InputError';

interface Props {
	error?: string;
	className?: string;
	children: React.ReactNode;
	button?: boolean;
	title?: string;
	titleComponent?: React.ReactNode;
	label?: string;
	disabled?: boolean;
	width?: number;
	offset?: Offset;
	initiallyOpen?: boolean;
	scrollable?: boolean;
	usePortal?: boolean;
	isPopup?: boolean;
	toggleComponent?: (props: {
		ref: React.RefObject<HTMLDivElement>;
		open: boolean;
		toggle: () => void;
	}) => React.ReactNode;
	shouldScrollIntoView?: 'end' | 'start' | 'center' | 'nearest' | boolean;
	onClose?: () => void;
	onOpen?: () => void;
}

export function Dropdown({
	error,
	className,
	children,
	toggleComponent,
	button = false,
	disabled,
	title,
	titleComponent,
	label,
	width,
	offset,
	initiallyOpen = false,
	scrollable = false,
	shouldScrollIntoView,
	usePortal,
	isPopup,
	onClose,
	onOpen
}: Props) {
	const [open, setOpen] = useState(initiallyOpen);
	const [ref, bounds] = useMeasure<HTMLDivElement>();
	const menuRef = useRef<HTMLDivElement>(null);

	const toggle = () => {
		if (disabled) return;

		const newOpen = !open;

		if (newOpen) {
			onOpen && onOpen();
		} else {
			onClose && onClose();
		}
		setOpen(newOpen);
	};

	const close = useCallback(() => {
		if (open) {
			onClose && onClose();
			setOpen(false);
		}
	}, [open, onClose]);

	useOutsideClick(close, [ref, menuRef]);

	// if it's scrollable, show first 5 elements and then add scroll
	const height = scrollable
		? 5 * (button ? DROPDOWN_ITEM.button.minHeight : DROPDOWN_ITEM.regular.minHeight)
		: undefined;
	const enhancedChildren = React.Children.toArray(children)
		.filter(child => child)
		.map(child => React.cloneElement(child as JSX.Element, { close, button }));

	const distance = calculateDistance(ref);

	return (
		<Container className={'custom-dropdown-container ' + className}>
			{toggleComponent ? (
				toggleComponent({ ref, open, toggle })
			) : (
				<DropdownToggle
					ref={ref}
					open={open}
					title={title}
					titleComponent={titleComponent}
					label={label}
					disabled={disabled}
					error={error}
					toggle={toggle}
					id={label?.replaceAll(' ', '').toLowerCase()}
				/>
			)}

			{open && (
				<DropdownMenu
					ref={menuRef}
					isPopup={isPopup}
					detached={usePortal}
					shouldScrollIntoView={shouldScrollIntoView}
					button={button}
					bounds={bounds}
					width={width}
					offset={offset}
					height={height}
					distance={distance}
				>
					{enhancedChildren}
				</DropdownMenu>
			)}

			<InputError error={error} />
		</Container>
	);
}

Dropdown.Item = DropdownItem;
Dropdown.Submenu = DropdownSubmenu;
