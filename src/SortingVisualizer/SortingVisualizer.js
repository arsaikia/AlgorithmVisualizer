import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react';
import './SortingVisualizer.css';
import { getMergeSortAnimations } from '../SortingAlgorithms/MergeSort';
import { getQuickSortAnimations } from '../SortingAlgorithms/QuickSort';
import { getInsertionSortAnimations } from '../SortingAlgorithms/InsertionSort';
import { getSelectionSortAnimations } from '../SortingAlgorithms/SelectionSort';
import { getBubbleSortAnimations } from '../SortingAlgorithms/BubbleSort';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import InputSlider from '../components/InputSlider';
import 'react-notifications-component/dist/theme.css';
import { Button, makeStyles, Fade } from '@material-ui/core';
import ButtonAppBar from '../components/AppBar';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { store } from 'react-notifications-component';
import SimpleSnackbar from '../components/snackbar';

const useStyles = makeStyles((theme) => ({
	root        : {
		flexGrow : 1
	},
	container   : {
		padding   : 0,
		margin    : 0,
		maxHeight : '100vh',
		minHeight : '100vh',
		overflow  : 'hidden'
	},

	mycontainer : {
		paddingLeft  : '15px',
		paddingRight : '15px',
		marginLeft   : '1vw',
		marginRight  : '1vw',
		height       : '100vh',

		overflow     : 'hidden'
	},

	mySlider    : {
		flexGrow   : '2',
		marginLeft : '10vw',
		marginTop  : '1vh',
		position   : 'absolute',
		float      : 'right'
	}
}));

//Changing width,height accordingly with the browser
let WINDOW_WIDTH = window.innerWidth;
let WINDOW_HEIGHT = window.innerHeight;
let NUMBER_OF_ARRAY_BARS = parseInt((WINDOW_WIDTH - 250) / 9);

function reportWindowSize () {
	WINDOW_WIDTH = window.innerWidth;
	WINDOW_HEIGHT = window.innerHeight;
	NUMBER_OF_ARRAY_BARS = parseInt((WINDOW_WIDTH - 250) / 9);
}
window.onresize = reportWindowSize; //TBD -> find a way to update state also when resized

const PRIMARY_COLOR = '#557A95'; //Normal color of bars
const SECONDARY_COLOR = '#fe4a49'; //Color of bars when they are being compared
//Animation Speed (how fast color changes, how fast height gets overwritten)

//Tooltips for buttons
const DISABLED_BUTTON = 'Currently Disabled';
const ENABLED_BUTTON = { dummy: 'currently enabled' };

const SortingVisualizer = (props) => {
	const classes = useStyles();
	const [ msg, setMsg ] = useState('Welcome');
	const [ ANIMATION_SPEED_MS, SET_ANIMATION_SPEED_MS ] = useState(10);
	const [ buttonText, setButtonText ] = useState('RANDOMIZE ARRAY');
	const [ reinitialize, setReinitialize ] = useState(false);
	const [ popup, setPopup ] = useState(reinitialize);
	const [ stopAllExec, setStopAllExec ] = useState(false);
	const [ barArray, setBarArray ] = useState([]);
	const [ sliderValue, setSliderValue ] = useState((NUMBER_OF_ARRAY_BARS / 4) >> 0); //(NUMBER_OF_ARRAY_BARS / 4) >> 0
	const [ barWidth, setBarWidth ] = useState((0.8 * WINDOW_WIDTH / sliderValue) >> 0); // (WINDOW_WIDTH / sliderValue *500) >> 0
	const [ isSorted, setIsSorted ] = useState(false);

	const showNotification = (title, message, type, duration = 5000) => {
		store.addNotification({
			title        : title,
			message      : message,
			type         : type,
			insert       : 'top',
			container    : 'top-right',
			animationIn  : [ 'animated', 'fadeIn' ],
			animationOut : [ 'animated', 'fadeOut' ],
			dismiss      : {
				duration : duration,
				onScreen : true
			}
		});
	};
	function useWindowSize () {
		const [ size, setSize ] = useState([ 0, 0 ]);
		useLayoutEffect(() => {
			function updateSize () {
				setSize([ window.innerWidth, window.innerHeight ]);
			}
			window.addEventListener('resize', updateSize);
			updateSize();
			return () => window.removeEventListener('resize', updateSize);
		}, []);
		return size;
	}

	const size = useWindowSize();

	useEffect(
		() => {
			console.log(ANIMATION_SPEED_MS);
		},
		[ ANIMATION_SPEED_MS ]
	);

	useEffect(
		() => {
			resetArray();
			console.log(barArray, sliderValue);
		},
		[ sliderValue, size ]
	);
	useEffect(
		() => {
			console.log(WINDOW_WIDTH, sliderValue);
			setBarWidth((0.8 * WINDOW_WIDTH / sliderValue) >> 0); //(WINDOW_WIDTH / barArray.length) >> 0
		},
		[ barArray ]
	);

	//Generates new random array
	const resetArray = () => {
		const arr = [];
		for (let i = 0; i < sliderValue; i++) {
			arr.push(randomIntFromInterval(50, WINDOW_HEIGHT - 650 / 2));
		}
		setBarArray(arr);
		setBarWidth((0.8 * WINDOW_WIDTH / sliderValue) >> 0);
	};

	const disableSortButtons = () => {
		return;
	};
	const restoreStoreButtons = () => {
		return;
	};
	//Sorting Algorithms
	const mergeSort = () => {
		setMsg('Sorting using Merge Sort');
		const [ animations, sortArray ] = getMergeSortAnimations(barArray);
		for (let i = 0; i < animations.length; i++) {
			const isColorChange = i % 3 !== 2;
			const arrayBars = document.getElementsByClassName('array-bar');
			if (isColorChange === true) {
				const [ barOneIndex, barTwoIndex ] = animations[i];
				const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
				const barOneStyle = arrayBars[barOneIndex].style;
				const barTwoStyle = arrayBars[barTwoIndex].style;
				//If we don't multiply by the index then every animations[i] wait for exactly ANIMATION_SPEED_MS and immediately change into final state
				setTimeout(() => {
					barOneStyle.backgroundColor = color;
					barTwoStyle.backgroundColor = color;
				}, i * ANIMATION_SPEED_MS);
			}
			else {
				setTimeout(() => {
					const [ barOneIdx, newHeight ] = animations[i];
					const barOneStyle = arrayBars[barOneIdx].style;
					barOneStyle.height = `${newHeight}px`;
				}, i * ANIMATION_SPEED_MS);
			}
		}
		// this.setState({array: sortArray})
		const RESTORE_TIME = parseInt(ANIMATION_SPEED_MS * animations.length / 2 + 3000);
		setTimeout(() => setMsg('Sorting Done'), RESTORE_TIME);
	};
	const quickSort = () => {
		setMsg('Sorting using Qucik Sort');

		const [ animations, sortArray ] = getQuickSortAnimations(barArray);
		for (let i = 0; i < animations.length - 1; i++) {
			const isColorChange = i % 6 === 0 || i % 6 === 1;
			const arrayBars = document.getElementsByClassName('array-bar');
			if (isColorChange === true) {
				const color = i % 6 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
				const [ barOneIndex, barTwoIndex ] = animations[i];
				if (barOneIndex === -1) {
					continue;
				}
				const barOneStyle = arrayBars[barOneIndex].style;
				const barTwoStyle = arrayBars[barTwoIndex].style;
				setTimeout(() => {
					barOneStyle.backgroundColor = color;
					barTwoStyle.backgroundColor = color;
				}, i * ANIMATION_SPEED_MS);
			}
			else {
				const [ barIndex, newHeight ] = animations[i];
				if (barIndex === -1) {
					continue;
				}
				const barStyle = arrayBars[barIndex].style;
				setTimeout(() => {
					barStyle.height = `${newHeight}px`;
				}, i * ANIMATION_SPEED_MS);
			}
		}
		// this.setState({array: sortArray})
		const RESTORE_TIME = parseInt(ANIMATION_SPEED_MS * animations.length / 2 + 3000);
		setTimeout(() => setMsg('Sorting Done'), RESTORE_TIME);
	};

	const bubbleSort = () => {
		setMsg('Sorting using Bubble Sort');
		const [ animations, sortArray ] = getBubbleSortAnimations(barArray);
		for (let i = 0; i < animations.length; i++) {
			const isColorChange = i % 4 === 0 || i % 4 === 1;
			const arrayBars = document.getElementsByClassName('array-bar');
			if (isColorChange === true) {
				const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
				const [ barOneIndex, barTwoIndex ] = animations[i];
				const barOneStyle = arrayBars[barOneIndex].style;
				const barTwoStyle = arrayBars[barTwoIndex].style;
				setTimeout(() => {
					barOneStyle.backgroundColor = color;
					barTwoStyle.backgroundColor = color;
				}, i * ANIMATION_SPEED_MS);
			}
			else {
				const [ barIndex, newHeight ] = animations[i];
				if (barIndex === -1) {
					continue;
				}
				const barStyle = arrayBars[barIndex].style;
				setTimeout(() => {
					barStyle.height = `${newHeight}px`;
				}, i * ANIMATION_SPEED_MS);
			}
		}
		// this.setState({array: sortArray})
		const RESTORE_TIME = parseInt(ANIMATION_SPEED_MS * animations.length / 2 + 3000);
		setTimeout(() => restoreStoreButtons(), RESTORE_TIME);
	};

	const insertionSort = () => {
		setMsg('Sorting using Insertion Sort');
		const [ animations, sortArray ] = getInsertionSortAnimations(barArray);
		for (let i = 0; i < animations.length; i++) {
			const isColorChange = animations[i][0] === 'comparision1' || animations[i][0] === 'comparision2';
			const arrayBars = document.getElementsByClassName('array-bar');
			if (isColorChange === true) {
				const color = animations[i][0] === 'comparision1' ? SECONDARY_COLOR : PRIMARY_COLOR;
				const [ temp, barOneIndex, barTwoIndex ] = animations[i];
				const barOneStyle = arrayBars[barOneIndex].style;
				const barTwoStyle = arrayBars[barTwoIndex].style;
				setTimeout(() => {
					barOneStyle.backgroundColor = color;
					barTwoStyle.backgroundColor = color;
				}, i * ANIMATION_SPEED_MS);
			}
			else {
				const [ temp, barIndex, newHeight ] = animations[i];
				const barStyle = arrayBars[barIndex].style;
				setTimeout(() => {
					barStyle.height = `${newHeight}px`;
				}, i * ANIMATION_SPEED_MS);
			}
		}
		// this.setState({array: sortArray})
		const RESTORE_TIME = parseInt(ANIMATION_SPEED_MS * animations.length / 2 + 3000);
		setTimeout(() => restoreStoreButtons(), RESTORE_TIME);
	};

	const selectionSort = () => {
		setMsg('Sorting using Selection Sort');
		const [ animations, sortArray ] = getSelectionSortAnimations(barArray);
		for (let i = 0; i < animations.length; i++) {
			const isColorChange = animations[i][0] === 'comparision1' || animations[i][0] === 'comparision2';
			const arrayBars = document.getElementsByClassName('array-bar');
			if (isColorChange === true) {
				const color = animations[i][0] === 'comparision1' ? SECONDARY_COLOR : PRIMARY_COLOR;
				const [ temp, barOneIndex, barTwoIndex ] = animations[i];
				const barOneStyle = arrayBars[barOneIndex].style;
				const barTwoStyle = arrayBars[barTwoIndex].style;
				setTimeout(() => {
					barOneStyle.backgroundColor = color;
					barTwoStyle.backgroundColor = color;
				}, i * ANIMATION_SPEED_MS);
			}
			else {
				const [ temp, barIndex, newHeight ] = animations[i];
				const barStyle = arrayBars[barIndex].style;
				setTimeout(() => {
					barStyle.height = `${newHeight}px`;
				}, i * ANIMATION_SPEED_MS);
			}
		}
		// this.setState({array: sortArray})
		const RESTORE_TIME = parseInt(ANIMATION_SPEED_MS * animations.length / 2 + 3000);
		setTimeout(() => restoreStoreButtons(), RESTORE_TIME);
	};

	const heapSort = () => {
		return console.log('Not Implemented!');
	};
	const array = barArray;
	const SORT_BUTTONS = 6;
	const TOTAL_BUTTONS = 1 + SORT_BUTTONS;

	const reinitializeEverything = () => {
		reinitialize ? window.location.reload() : resetArray();
	};

	useEffect(
		() => {
			setButtonText(() => (reinitialize ? '  REINITIALIZE  ' : 'RANDOMIZE ARRAY'));
		},
		[ reinitialize ]
	);

	useEffect(
		() => {
			reinitializeEverything();
		},
		[ isSorted ]
	);

	return (
		<Fragment>
			<Fade in={true} timeout={'1500'}>
				<Container
					className={classes.container}
					maxWidth="xs"
					maxWidth="xl"
					style={{ backgroundColor: '#cfe8fc' }}
				>
					<ButtonAppBar
						SET_ANIMATION_SPEED_MS={SET_ANIMATION_SPEED_MS}
						reinitializeEverything={reinitializeEverything}
						notify={showNotification}
						setReinitialize={setReinitialize}
						bubbleSort={bubbleSort}
						selectionSort={selectionSort}
						InsertionSort={insertionSort}
						mergeSort={mergeSort}
						quickSort={quickSort}
					/>

					<Container
						className={classes.mycontainer}
						maxWidth="xs"
						maxWidth="l"
						style={{
							position        : 'relative',
							backgroundColor : '#96ceb4', //#00B4AB
							maxWidth        : '98vw',
							maxHeight       : '85vh'
						}}
					>
						{array.map((value, idx) => (
							<div
								className="array-bar"
								key={idx}
								style={{
									position        : 'relative',
									backgroundColor : PRIMARY_COLOR,
									height          : `${value}px`,
									width           : `${barWidth}px`
								}}
							/>
						))}
					</Container>

					<div style={{ width: '100%' }}>
						<Box display="flex" p={1} alignContent="center" marginBottom="10px">
							<Box p={1} flexGrow={1}>
								<Container>
									<InputSlider
										sliderValue={sliderValue}
										min={10}
										maxValue={NUMBER_OF_ARRAY_BARS}
										setSliderValue={setSliderValue}
										isSliderDisabled={reinitialize}
										onChange={setSliderValue}
									/>
									<Typography id="range-slider" variant="h7" color="inherit">
										Select Array Size
									</Typography>
								</Container>
							</Box>
							<Box p={1} flexGrow={1}>
								<Button
									variant="contained"
									color={!reinitialize ? 'primary' : 'secondary'}
									onClick={reinitializeEverything}
								>
									{buttonText}
								</Button>
							</Box>
							<Box p={1}>
								<Container>
									<InputSlider
										sliderValue={ANIMATION_SPEED_MS}
										step={0.5}
										min={0.01}
										maxValue={200}
										setSliderValue={SET_ANIMATION_SPEED_MS}
										isSliderDisabled={reinitialize}
									/>
									<Typography id="range-slider" variant="h7" gutterBottom color="inherit">
										Set Animation Delay (MS)
									</Typography>
								</Container>
							</Box>
						</Box>
					</div>

					<SimpleSnackbar msg={msg} stateVal={!reinitialize} />
				</Container>
			</Fade>
		</Fragment>
	);
};

const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

export default SortingVisualizer;
