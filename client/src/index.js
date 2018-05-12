import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import WhiskyGrid from './WhiskyGrid';

ReactDOM.render(<WhiskyGrid />, document.getElementById('root'));
registerServiceWorker();
