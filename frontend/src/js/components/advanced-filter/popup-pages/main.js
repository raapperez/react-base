'use strict';

import React, { Component, PropTypes } from 'react';

import layout from './layout';
import classNames from 'classnames';
import _ from 'lodash';


class Main extends Component {

    constructor(props) {
        super(props);



        this.seletedItem = null;
        this.select = this.select.bind(this);
    }

    select(item) {
        const {onSelect} = this.props;

        onSelect(item);
    }

    mainRender() {

    }

    render() {
        const {items, disableKeys} = this.props;

        return layout(null, null, null, (
            <div className="main-popup-page">
                <ul>
                    {
                        items.map(item => (
                            <li key={Math.random()}>
                                <a className={classNames({disabled: disableKeys && _.includes(disableKeys || [], item.key)})} onClick={e => { e.preventDefault(); this.select(item); } }>{item.label}</a>
                            </li>
                        ))
                    }
                </ul>
            </div>
        ));
    }

}

Main.propTypes = {
    items: PropTypes.array.isRequired,
    disableKeys: PropTypes.array,
    onSelect: PropTypes.func.isRequired
};

export default Main;