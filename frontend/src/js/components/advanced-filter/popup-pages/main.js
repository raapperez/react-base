'use strict';

import React, { Component, PropTypes } from 'react';

import layout from './layout';


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
        const {items} = this.props;

        return layout(null, null, (
            <div className="main-popup-page">
                <ul>
                    {
                        items.map(item => (
                            <li key={Math.random()}>
                                <a onClick={e => { e.preventDefault(); this.select(item); } }>{item.label}</a>
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
    onSelect: PropTypes.func.isRequired
};

export default Main;