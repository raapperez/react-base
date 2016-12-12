'use strict';

import React, {Component, PropTypes} from 'react';
import Chip from './chip';

class Box extends Component {

    constructor(props) {
        super(props);

        this.removeFilter = this.removeFilter.bind(this);
    }

    removeFilter(filter) {
        const {onRemoveFilter} = this.props;
        onRemoveFilter(filter);
    }

    render() {

        const {filters} = this.props;

        console.log('->', filters);

        return (
            <div className='box'>

                {filters.map(filter => (
                    <Chip key={Math.random()} label={filter.item.label} value={filter.item.getDisplay(filter)} onRemove={() => this.removeFilter(filter)} />   
                ))}
            </div>
        );
    }
}

Box.propTypes = {
    filters: PropTypes.array.isRequired,
    onRemoveFilter: PropTypes.func.isRequired
};

export default Box;