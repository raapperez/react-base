'use strict';

import ReactDOM from 'react-dom';
import example, {routes} from './example';
import { browserHistory  } from 'react-router';

ReactDOM.render(example({ history: browserHistory, children: routes }), document.getElementById('entry-point'));