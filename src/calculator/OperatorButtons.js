import React from 'react';
import { makeButtonFrom } from './Util';
import { operations } from './constants';

const OperatorButtons = (props) => (
    <div>
        {Object.values(operations).map(op => makeButtonFrom(op, props.clickHandler))}
    </div>
);

export default OperatorButtons;
