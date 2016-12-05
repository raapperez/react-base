'use strict';

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Co from './co';

class ExamplePage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {value} = this.props;
        return (
            <div>Hello World1 {value}
            <Co />
            </div>
        );
    }
}

ExamplePage.propTypes = {
    value: PropTypes.number
};

export default connect(
    state => ({ value: state.value }),
    dispatch => ({

    })
)(ExamplePage);