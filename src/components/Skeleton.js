import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

export default function Variants () {
	return (
		<div style={{ width: '100vw', height: '100vh' }}>
			<Skeleton />
			<Skeleton animation={false} />
			<Skeleton animation="wave" />
		</div>
	);
}
