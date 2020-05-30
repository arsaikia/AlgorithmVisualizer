import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';

function CircularProgressWithLabel (props) {
	return (
		<Box position="absolute" display="inline-flex">
			<CircularProgress variant="static" {...props} />
			<Box
				top={0}
				left={0}
				bottom={0}
				right={0}
				position="absolute"
				display="flex"
				alignItems="center"
				justifyContent="center"
			>
				<Typography variant="h3" component="div" color="textSecondary">{`${Math.round(
					props.value
				)}%`}</Typography>
			</Box>
		</Box>
	);
}

export default function CircularStatic (props) {
	const [ progress, setProgress ] = React.useState(props.initial);

	React.useEffect(() => {
		const timer = setInterval(() => {
			setProgress(
				(prevProgress) =>
					prevProgress >= 95 ? props.setLoader(100) : prevProgress + Math.floor(Math.random() * 10)
			);
		}, 100);
		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
		<Container>
			<Grid
				container
				spacing={0}
				direction="column"
				alignItems="center"
				justify="center"
				style={{ minHeight: '100vh' }}
			>
				>
				<CircularProgressWithLabel size={props.size} setLoader={props.setLoader} value={progress} />
			</Grid>
		</Container>
	);
}
