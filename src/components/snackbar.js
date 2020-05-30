import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default function SimpleSnackbar ({ stateVal, v = 'top', h = 'center', msg = 'LOADING...', duration='6000' }) {
	const [ open, setOpen ] = React.useState(stateVal);

	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = (event, reason) => {
	
		setOpen(false);
	};

	useEffect(
		() => {
			setOpen((open) => !open);
		},
		[ stateVal ]
	);

	return (
		<div>
			<Button onClick={handleClick} />
			<Snackbar
				anchorOrigin={{
					vertical   : v,
					horizontal : h
				}}
				open={open}
				autoHideDuration={duration}
				onClose={handleClose}
				message={msg}
				action={
					<React.Fragment>
						<Button color="secondary" size="small" onClick={handleClose}>
							OK
						</Button>
					</React.Fragment>
				}
			/>
		</div>
	);
}
