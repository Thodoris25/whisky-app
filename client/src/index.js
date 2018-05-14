import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import WhiskyGrid from './WhiskyGrid/WhiskyGrid';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<WhiskyGrid />, document.getElementById('root'));
registerServiceWorker();
