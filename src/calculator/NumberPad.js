import React from 'react';
import { makeButtonFrom } from './Util';
import { nums } from './constants';

const NumberPad = (props) => {
	const numberButtons = nums.map(row => row.map(number => makeButtonFrom(number, props.clickHandler)));
	return (
		<div>
			{numberButtons.map(row => <div>{row}</div>)}
		</div>
	);
}

export default NumberPad;
