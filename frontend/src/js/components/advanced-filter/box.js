'use strict';

import React, { Component, PropTypes } from 'react';
import Chip from './chip';
import _ from 'lodash';
import Async from 'react-promise';

class Box extends Component {

    constructor(props) {
        super(props);

        this.removeFilter = this.removeFilter.bind(this);
    }

    removeFilter(key) {
        const {onRemoveFilter} = this.props;
        onRemoveFilter(key);
    }

    render() {

        const {config, filters} = this.props;
        console.log(filters);

        return (
            <div className='box'>

                {_.map(filters, (value, key) => {
                    const item = config.items.find(item => item.key === key);
                    return (
                        <Async promise={item.getDisplay(value)} then={(val) => (
                            <Chip key={Math.random()} label={item.label} value={val} onRemove={() => this.removeFilter(key)} />
                        )} pendingRender={(
                            <Chip key={Math.random()} label={item.label} value="..." onRemove={() => this.removeFilter(key)} />
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
    onRemoveFilter: PropTypes.func.isRequired
};

export default Box;