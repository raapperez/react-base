'use strict';

import React, { Component, PropTypes } from 'react';
import DateRangePicker from '../date-range-picker';

const stateDefinitions = {
    available: {
        color: null,
        label: 'Available'
    }
};

const dateRanges = [
];

class DatePicker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: props.value || null,
            states: null
        };

        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(value, states) {
        this.setState({
            value,
            states
        }, () => {
            const {onChange} = this.props;

            if (onChange) {
                onChange(value);
            }
        });
    }

    render() {
        const {value} = this.state;

        let theValue = value;

        if(typeof theValue !== 'object') {
            theValue = null;
        }

        const isOne = theValue && theValue.end.diff(theValue.start) === 0;

        return (
            <div className="date-picker">
                <DateRangePicker
                    locale={'pt-br'}
                    firstOfWeek={1}
                    numberOfCalendars={1}
                    selectionType='range'
                    singleDateRange={true}
                    stateDefinitions={stateDefinitions}
                    dateStates={dateRanges}
                    defaultState="available"
                    showLegend={false}
                    value={theValue}
                    onSelect={this.handleSelect}
                    />


                {theValue ?
                    (isOne ? (<div className="display"><span>{value && value.start.format('L')}</span></div>)
                        : (<div className="display"><span>{value && value.start.format('L')}</span> <span> - </span> <span>{value && value.end.format('L')}</span></div>)
                    )
                    : null
                }


            </div>
        );
    }

}

DatePicker.propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func
};

export default DatePicker;