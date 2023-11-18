import React, { useState } from 'react';

import { BaseTooltip, BaseTooltipProps } from './BaseTooltip';
import { Text } from './BaseTooltip.style';

export function HoverTooltip({ disabled, ...props }: BaseTooltipProps) {
	const [visible, setVisible] = useState(false);

	function handleMouseOut() {
		if (visible) setVisible(false);
	}

	function handleMouseOver() {
		if (!visible) setVisible(true);
	}

	return (
		<BaseTooltip
			{...props}
			disabled={disabled}
			visible={visible}
			onMouseOut={handleMouseOut}
			onMouseOver={handleMouseOver}
		/>
	);
}

HoverTooltip.Text = Text;
