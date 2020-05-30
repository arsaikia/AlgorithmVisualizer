import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { ButtonGroup } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import LocalFloristTwoToneIcon from '@material-ui/icons/LocalFloristTwoTone';
import styled from 'styled-components';

const useStyles = makeStyles((theme) => ({
	root       : {
		flexGrow : 1
	},
	menuButton : {
		marginRight : theme.spacing(2)
	},
	title      : {
		flexGrow : 1
	}
}));

export default function ButtonAppBar ({
	bubbleSort,
	selectionSort,
	InsertionSort,
	mergeSort,
	quickSort,
	setReinitialize,
	notify,
	SET_ANIMATION_SPEED_MS
}) {
	const classes = useStyles();
	const [ isDisabled, setIsDisabled ] = useState(false);

	// const onClick1 = () => {
	// 	bubbleSort();
	// 	setIsDisabled(true);
	// 	setReinitialize(true);
	// };

	const onClickHandler = (e) => {
		switch (e.currentTarget.value) {
			case 'bubbleSort':
				bubbleSort();

				break;
			case 'selectionSort':
				selectionSort();
				break;
			case 'InsertionSort':
				InsertionSort();
				break;
			case 'mergeSort':
				mergeSort();
				break;
			case 'quickSort':
				quickSort();
				break;
			default:
				break;
		}
		

		setIsDisabled(true);
		setReinitialize(true);
	};

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<IconButton edge="start" color="inherit">
						<LocalFloristTwoToneIcon />
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						Algorithm Visualizer
					</Typography>

					<textContainer>
						<Button
							color="inherit"
							value="bubbleSort"
							onClick={(e) => onClickHandler(e, 'value')}
							disabled={isDisabled}
						>
							Bubble Sort
						</Button>
						<Button
							color="inherit"
							value="selectionSort"
							onClick={(e) => onClickHandler(e, 'value')}
							disabled={isDisabled}
						>
							Selection Sort
						</Button>
						<Button
							color="inherit"
							value="InsertionSort"
							onClick={(e) => onClickHandler(e, 'value')}
							disabled={isDisabled}
						>
							Insertion Sort
						</Button>
						<Button
							color="inherit"
							value="mergeSort"
							onClick={(e) => onClickHandler(e, 'value')}
							disabled={isDisabled}
						>
							Merge Sort
						</Button>
						<Button
							color="inherit"
							value="quickSort"
							onClick={(e) => onClickHandler(e, 'value')}
							disabled={isDisabled}
						>
							Quick Sort
						</Button>
					</textContainer>
				</Toolbar>
			</AppBar>
		</div>
	);
}
