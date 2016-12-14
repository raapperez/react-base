'use strict';


import React, { Component, PropTypes } from 'react';
import Box from './box';
import Popup from './popup';
import * as _pageType from './popup-pages/page-type';
import * as _dateType from './date-type';
import _ from 'lodash';

class AdvancedFilter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: props.value || {}
        };

        this.togglePopup = this.togglePopup.bind(this);
        this.addFilter = this.addFilter.bind(this);
        this.removeFilter = this.removeFilter.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.value
        });
    }

    togglePopup() {
        const {popup} = this.refs;
        popup.toggle();
    }

    addFilter(form) {
        const {onChange} = this.props;
        const {value} = this.state;

        this.setState({
            value: Object.assign({}, value, form)
        }, () => {
            onChange(this.state.value);
        });
    }

    removeFilter(key) {
        const {onChange} = this.props;
        const {value} = this.state;

        this.setState({
            value: _.omit(value, key)
        }, () => {
            onChange(this.state.value);
        });

    }

    render() {

        const {config} = this.props;
        const {value} = this.state;

        return (
            <div className="advanced-filter">
                <Box config={config} filters={value} onRemoveFilter={this.removeFilter} onAddFilter={this.addFilter} />
                <div className="right">
                    <Popup ref="popup" config={config} onAddFilter={this.addFilter}>
                        <a onClick={this.togglePopup}>+</a>
                    </Popup>
                </div>
            </div>
        );
    }
}

AdvancedFilter.propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    config: PropTypes.object.isRequired
};

export default AdvancedFilter;
export const pageType = _pageType;
export const dateType = _dateType;