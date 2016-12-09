'use strict';

import React, {Component, PropTypes} from 'react';
import Chip from './chip';

class Box extends Component {

    removeFilter() {

    }

    render() {

        const {filters} = this.props;

        return (
            <div className='box'>

                {filters.map(filter => (
                    <Chip key={Math.random()} label={filter.label} value={filter.value} onRemove={this.removeFilter} />   
                ))}
            </div>
        );
    }
}

Box.propTypes = {
    filters: PropTypes.array.isRequired
};

export default Box;