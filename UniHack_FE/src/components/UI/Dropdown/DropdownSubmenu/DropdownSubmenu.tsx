import React, { useMemo, useState, MouseEvent } from 'react';

import { useMeasure } from 'hooks';

import { DROPDOWN_ITEM } from 'consts';
import { calculateDistance } from 'helpers';
import { Svgs } from 'environment';
import { Icon } from 'components/UI/Icons';
import { Bounds, Offset } from 'types';

import { DropdownMenu } from '../DropdownMenu';
import { Container, Paragraph } from './DropdownSubmenu.style';

const computeOffset = (bounds: Bounds, openUpwards: boolean, openToLeft?: boolean) => {
	let bottom: number | null = null;

	if (openUpwards) {
		bottom = -28;
	}

	const offset: Offset = {
		top: -8,
		left: bounds.width - bounds.left + 25
	};

	if (openToLeft) {
		delete offset.left;
		offset.right = -bounds.width - bounds.left - 9;
	}

	if (bottom !== null) {
		delete offset.top;
		offset.bottom = bottom;
	}

	return offset;
};

interface Props {
	children: React.ReactNode;
	title: string;
	width?: number;
	left?: boolean;
	small?: boolean;
	smallPadding?: boolean;
	disabled?: boolean;
	detached?: boolean;
	close?: () => void;
}

export function DropdownSubmenu({
	children,
	title,
	width,
	left,
	small,
	smallPadding,
	disabled,
	detached,
	close
}: Props) {
	const [open, setOpen] = useState(false);
	const [_, setCursorXAxix] = useState(0);
	const [ref, bounds] = useMeasure<HTMLDivElement>();

	const onMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
		setCursorXAxix(e.clientX);
		setOpen(true);
	};
	const onMouseLeave = () => {
		setOpen(false);
		setCursorXAxix(0);
	};

	const distance = calculateDistance(ref);

	const enhancedChildren = React.Children.toArray(children)
		.filter(child => child)
		.map(child => React.cloneElement(child as JSX.Element, { close }));

	const itemHeight = DROPDOWN_ITEM.regular.minHeight;
	const defaultOffset = 10;

	const numberOfItems = enhancedChildren.length;
	const itemsHeight = numberOfItems * itemHeight;
	const openUpwards = distance && distance.bottom <= itemsHeight + defaultOffset;
	const scrollableContent = openUpwards && distance && distance.top < itemsHeight;
	const height = scrollableContent ? distance && distance.top - defaultOffset : undefined;

	const offset = useMemo(
		() => computeOffset(bounds, !!openUpwards, left),
		[bounds, openUpwards, left]
	);

	return (
		<Container
			ref={ref}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			disabled={disabled}
			small={small}
			smallPadding={smallPadding}
		>
			<Paragraph>{title}</Paragraph>
			<Icon svg={Svgs.ChevronRight} />
			{open && (
				<DropdownMenu
					button={false}
					width={width}
					height={height}
					offset={offset}
					distance={distance}
					// Leaving this empty until we get design greenlight
					// cursorPosition={cursorXAxix}
					bounds={detached ? bounds : undefined}
					detached={detached}
				>
					{enhancedChildren}
				</DropdownMenu>
			)}
		</Container>
	);
}
