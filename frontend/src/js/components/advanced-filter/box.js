'use strict';

import React, { Component, PropTypes } from 'react';
import Chip from './chip';
import _ from 'lodash';

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

        return (
            <div className='box'>

                {_.map(filters, (value, key) => {
                    const item = config.items.find(item => item.key === key);
                    return (
                        <Chip key={Math.random()} label={item.label} value={item.getDisplay(value)} onRemove={() => this.removeFilter(key)} />
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