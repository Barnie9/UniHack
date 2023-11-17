import React from 'react';

interface Props {
	children: React.ReactNode;
}

export default React.memo<Props>(function({ children }) {
	return <>{children}</>;
});
