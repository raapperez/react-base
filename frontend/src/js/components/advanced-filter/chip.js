'use strict';

import React, {Component, PropTypes} from 'react';

class Chip extends Component {

    constructor(props) {
        super(props);

        this.remove = this.remove.bind(this);
    }

    remove() {
        const {onRemove} = this.props;
        onRemove();
    }

    render() {

        const {label, value} = this.props;

        return (
            <div className='chip'>
                <div className='left'>
                    <label>{label}</label>
                    <span>{value}</span>
                </div>
                <div className='right'>
                    <a className='close-btn' onClick={this.remove}>X</a>
                </div>
            </div>
        );
    }
}

Chip.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onRemove: PropTypes.func.isRequired
};

export default Chip;