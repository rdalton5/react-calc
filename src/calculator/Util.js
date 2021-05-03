import React from 'react';

export const makeButtonFrom = (thing, onClickHandler) => (
    <button
        className="calculator-button"
        onClick={() => onClickHandler(thing)}>
        {thing}
    </button>
);
