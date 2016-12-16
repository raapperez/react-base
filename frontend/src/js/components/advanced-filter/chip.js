'use strict';

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Popup from './popup';

class Chip extends Component {

    constructor(props) {
        super(props);

        this.remove = this.remove.bind(this);
        this.getId = this.getId.bind(this);
        this.click = this.click.bind(this);
        this.deselect = this.deselect.bind(this);
    }

    getId() {
        return this.props.id;
    }

    remove() {
        const {onRemove, id} = this.props;
        onRemove(id);
    }

    togglePopup() {
        const {popup} = this.refs;
        popup.toggle();
    }

    click(e) {
        e.preventDefault();

        const {id, onClick} = this.props;
        const {popup} = this.refs;

        onClick(id);
        popup.toggle();
    }

    deselect() {
        const {onDeselect, id} = this.props;
        onDeselect(id);
    }

    render() {

        const {label, display, isSelected, config, id, onAddFilter, value} = this.props;

        return (
            <Popup ref="popup" config={config} onAddFilter={onAddFilter} selectedItemKey={id} initialValues={{ [id]: value }} onClose={this.deselect}>
                <div className={classNames('chip', { selected: isSelected })} onClick={this.click} >
                    <div className='left'>
                        <label>{label}</label>
                        <span>{display}</span>
                    </div>
                    <div className='right'>
                        <a className='close-btn' onClick={this.remove}>X</a>
                    </div>
                </div>
            </Popup>

        );
    }
}

Chip.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    display: PropTypes.string.isRequired,
    onRemove: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    onAddFilter: PropTypes.func.isRequired,
    config: PropTypes.object.isRequired,
    onDeselect: PropTypes.func.isRequired
};

export default Chip;