'use strict';

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class Chip extends Component {

    constructor(props) {
        super(props);

        this.remove = this.remove.bind(this);
        this.getId = this.getId.bind(this);
    }

    getId() {
        return this.props.id;
    }

    remove() {
        const {onRemove, id} = this.props;
        onRemove(id);
    }

    render() {

        const {label, value, id, isSelected, onClick} = this.props;

        return (
            <div className={classNames('chip', { selected: isSelected })} onClick={e => { e.preventDefault(); onClick(id); } }>
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
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onRemove: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Chip;