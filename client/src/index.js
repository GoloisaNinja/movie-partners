import React from 'react';
import ReactDOM, { hydrate, render } from 'react-dom';
import AppRouter from '../src/routers/AppRouter';

// ReactDOM.render(<AppRouter />, document.getElementById('root'));

const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
	hydrate(<AppRouter />, rootElement);
} else {
	render(<AppRouter />, rootElement);
}
