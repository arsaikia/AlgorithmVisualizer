import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles((theme) => ({
	root   : {
		width : 300
	},
	margin : {
		height : theme.spacing(3)
	}
}));

function valuetext (value) {
	return `${value}`;
}



export default function DiscreteSlider ({ sliderValue, maxValue=10, isSliderDisabled, setSliderValue, step=1, min=1, onChange=null }) {
	const classes = useStyles();
	const [value, setValue] = React.useState((maxValue / 10) >> 0);

	const onChangeHandler = (event, newValue) => {
		setValue(newValue);
		setSliderValue(value);
		//console.log(value, newValue);
		//setSliderValue(newValue)
	
	}

	return (
		<div className={classes.root}>
			<Slider
				value={sliderValue}
				min={min}
				max={maxValue}
				defaultValue={sliderValue}
				getAriaValueText={valuetext}
				aria-labelledby="discrete-slider-always"
				step={step}
				valueLabelDisplay="on"
				disabled={isSliderDisabled}
				onChange={onChangeHandler}
			/>
		</div>
	);
}
