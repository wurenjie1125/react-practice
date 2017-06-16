import React from 'react';
import ReactDOM from 'react-dom';

import CommentSend from './comment/comment';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<CommentSend />, document.getElementById('root'));
// ReactDOM.render(<Welcome name="Sara" />, document.getElementById('root'));

registerServiceWorker();
