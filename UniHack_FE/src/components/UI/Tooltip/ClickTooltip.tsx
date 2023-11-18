import React, { useState } from 'react';

import { BaseTooltip, BaseTooltipProps } from './BaseTooltip';
import { Text } from './BaseTooltip.style';

interface Props {
	onClick?: (e: React.MouseEvent) => void;
}

export function ClickTooltip({ disabled, onClick, ...props }: Props & BaseTooltipProps) {
	const [visible, setVisible] = useState(false);

	function handleClick() {
		setVisible(state => !state);
	}

	function handleTooltipClick(e: React.MouseEvent) {
		if (!disabled && onClick) {
			onClick(e);
			setVisible(false);
		}
	}

	return (
		<BaseTooltip
			{...props}
			disabled={disabled}
			tabIndex={!disabled && onClick ? 0 : undefined}
			visible={visible}
			onClick={handleClick}
			onTooltipClick={handleTooltipClick}
		/>
	);
}

ClickTooltip.Text = Text;
