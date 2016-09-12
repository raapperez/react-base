'use strict';

import ReactDOM from 'react-dom';
import {clientSide, routes} from './example';
import { browserHistory  } from 'react-router';

ReactDOM.render(clientSide({ history: browserHistory, children: routes }), document.getElementById('entry-point'));