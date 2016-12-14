'use strict';

import React, { Component, PropTypes } from 'react';
import Chip from './chip';
import _ from 'lodash';
import Async from 'react-promise';

class Box extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedFilter: null
        };

        this.removeFilter = this.removeFilter.bind(this);
        this.clickFilter = this.clickFilter.bind(this);
    }

    removeFilter(key) {
        const {onRemoveFilter} = this.props;
        onRemoveFilter(key);
    }

    clickFilter(key) {
        this.setState({
            selectedFilter: key
        });
    }

    render() {

        const {config, filters, onAddFilter} = this.props;
        const {selectedFilter} = this.state;

        return (
            <div className='box'>

                {_.map(filters, (value, key) => {
                    const item = config.items.find(item => item.key === key);

                    if (!item) {
                        throw `Missing config key ${key}`;
                    }

                    return (
                        <Async key={key} promise={item.getDisplay(value)} then={(val) => (
                            <Chip id={key} label={item.label} value={val} onClick={this.clickFilter} onRemove={this.removeFilter} isSelected={key === selectedFilter} config={config} onAddFilter={onAddFilter} />
                        )} pendingRender={(
                            <Chip id={key} label={item.label} value="..." onClick={this.clickFilter} onRemove={this.removeFilter} isSelected={key === selectedFilter} config={config} onAddFilter={onAddFilter} />
                        )} />
                    );
                }
                )}
            </div>
        );
    }
}

Box.propTypes = {
    config: PropTypes.object.isRequired,
    filters: PropTypes.object.isRequired,
    onAddFilter: PropTypes.func.isRequired,
    onRemoveFilter: PropTypes.func.isRequired
};

export default Box;