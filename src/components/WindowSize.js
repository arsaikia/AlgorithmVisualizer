import { useState, useEffect } from 'react';
import Cookie from 'js-cookie';

// Usage

import React from 'react';

const WindowSize = () => {
	const size = useWindowSize();

	return (

		<div>
			{[size.width, ' x ', size.height]}
		</div>
	);
};

export default WindowSize;

// Hook
function useWindowSize () {
	const isClient = typeof window === 'object';

	function getSize () {
		return {
			width  : isClient ? window.innerWidth : undefined,
			height : isClient ? window.innerHeight : undefined
		};
	}

	const [ windowSize, setWindowSize ] = useState(getSize);

	useEffect(() => {
        console.log(windowSize)
		if (!isClient) {
			return false;
		}

		function handleResize () {
			setWindowSize(getSize());
		}

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [[], windowSize]); // Empty array ensures that effect is only run on mount and unmount

    Cookie.set('WindowWidth' , windowSize.width);
    Cookie.set('WindowHeight' , windowSize.height);
	return windowSize;
}
