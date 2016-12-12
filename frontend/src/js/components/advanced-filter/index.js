'use strict';


import React, { Component, PropTypes } from 'react';
import Box from './box';
import Popup from './popup';
import * as _pageType from './popup-pages/page-type';
import _ from 'lodash';

class AdvancedFilter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            filters: []
        };

        this.togglePopup = this.togglePopup.bind(this);
        this.addFilter = this.addFilter.bind(this);
        this.removeFilter = this.removeFilter.bind(this);
    }

    togglePopup() {
        const {popup} = this.refs;
        popup.toggle();
    }

    addFilter(filter) {

        const {filters} = this.state;

        this.setState({
            filters: [...filters, filter]
        });
    }

    removeFilter(filter) {

        const {filters} = this.state;

        console.log(filter);
        console.log(_.without(filters, filter));

        this.setState({
            filters: _.without(filters, filter)
        });
    }

    render() {

        const {config} = this.props;
        const {filters} = this.state;

        return (
            <div className="advanced-filter">
                <Box filters={filters} onRemoveFilter={this.removeFilter} />
                <div className="right">
                    <a onClick={this.togglePopup}>+</a>
                    <Popup ref="popup" config={config} onAddFilter={this.addFilter} />
                </div>
            </div>
        );
    }
}

AdvancedFilter.propTypes = {
    config: PropTypes.object.isRequired
};

export default AdvancedFilter;
export const pageType = _pageType;