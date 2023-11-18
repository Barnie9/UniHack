import React from 'react';

// import { useGridContext } from 'hooks';

import { Column, Grid, GridItem, GridItemProps, Row } from './Layout.style';

interface CardGridProps {
	children: React.ReactElement<GridItemProps>[];
}

function CardGrid({ children, ...props }: CardGridProps) {
	// const { gutter } = useGridContext();

	const enhancedChildren = React.Children.map(children, child => {
		const { size, x, y } = child.props;
		return (
			<GridItem size={size} x={x} y={y}>
				{child}
			</GridItem>
		);
	});
// gutter={Math.round(gutter)}
	return (
		<Grid {...props} gutter={1}>
			{enhancedChildren}
		</Grid>
	);
}

export function Layout() {
	return null;
}

Layout.Column = Column;
Layout.Grid = CardGrid;
Layout.Row = Row;
