import React, { useState } from 'react';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer';
import CircularProgressWithLabel from './components/Loader';
import './App.css';
import Variants from './components/Skeleton';

const App = () => {
	const [ loader, setLoader ] = useState(Math.floor(Math.random()) * 20);
	console.log(loader);
	return (
		<div className="App">
			<div className="app-container">
				<Variants>
					{/* {loader < 100 ? (
					<CircularProgressWithLabel
						size={'13rem'}
						setLoader={setLoader}
						progress={loader}
						initial={loader}
					/>
				) : (
					<SortingVisualizer />
				)} */}
				</Variants>
			</div>
		</div>
	);
};

export default App;
