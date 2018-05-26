import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import FilterableWhiskyGrid from './WhiskyGrid/FilterableWhiskyGrid';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<FilterableWhiskyGrid />, document.getElementById('root'));
registerServiceWorker();
