'use strict';

import '../less/example-main.less';

import ReactDOM from 'react-dom';
import { clientSide, routes } from './example';
import { browserHistory } from 'react-router';

ReactDOM.render(clientSide({ history: browserHistory, children: routes }), document.getElementById('entry-point'));

if (module.hot) {
    module.hot.accept();
    module.hot.dispose(function() {
        document.location.reload();
    });
}