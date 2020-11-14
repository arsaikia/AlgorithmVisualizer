import React, { useState } from 'react';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer';
import CircularProgressWithLabel from './components/Loader';
import './App.css';
import Variants from './components/Skeleton';

const App = () => {
	const [ loader, setLoader ] = useState(Math.floor(Math.random()) * 10);
	console.log(loader);
	return (
		<div className="App">
			<div className="app-container">
				{loader < 100 ? (
					<CircularProgressWithLabel
						size={'13rem'}
						setLoader={setLoader}
						progress={loader}
						initial={loader}
					/>
				) : (
					<SortingVisualizer />
				)}
			</div>
		</div>
	);
};

export default App;
