'use strict';

import React, { Component, PropTypes } from 'react';
import DateRangePicker from 'react-daterange-picker';

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
            value: null,
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

        const isOne = value && value.end.diff(value.start) === 0;


        return (
            <div className="date-picker">
                <DateRangePicker
                    firstOfWeek={1}
                    numberOfCalendars={1}
                    selectionType='range'
                    singleDateRange={true}
                    stateDefinitions={stateDefinitions}
                    dateStates={dateRanges}
                    defaultState="available"
                    showLegend={false}
                    value={value}
                    onSelect={this.handleSelect}
                    />


                {value ?
                    (isOne ? (<div className="display"><span>{value && value.start.format('ll')}</span></div>)
                        : (<div className="display"><span>{value && value.start.format('ll')}</span> <span> - </span> <span>{value && value.end.format('ll')}</span></div>)
                    )
                    : null
                }


            </div>
        );
    }

}

DatePicker.propTypes = {
    value: PropTypes.object,
    onChange: PropTypes.func
};

export default DatePicker;