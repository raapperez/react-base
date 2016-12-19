'use strict';

import React, { Component, PropTypes } from 'react';
import DateRangePicker from '../date-range-picker';
import moment from 'moment';
import classNames from 'classnames';

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

        const value = typeof props.value === 'object' ? props.value || null : null;

        this.state = {
            bottomValue: value ? {
                start: value.start.format('L'),
                end: value.end.format('L')
            } : null,
            value: value || null,
            states: null
        };

        this.handleSelect = this.handleSelect.bind(this);
        this.startDateChange = this.startDateChange.bind(this);
        this.endDateChange = this.endDateChange.bind(this);

        this.startDateKeyPress = this.startDateKeyPress.bind(this);
        this.endDateKeyPress = this.endDateKeyPress.bind(this);
        this.notify = this.notify.bind(this);
    }

    handleSelect(value, states) {
        this.setState({
            bottomValue: {
                start: value.start.format('L'),
                end: value.end.format('L')
            },
            value,
            states
        }, () => {
            this.notify(value);
        });
    }

    notify(value) {
        const {onChange} = this.props;

        if (onChange) {
            onChange(value);
        }
    }

    startDateChange(event) {

        const {value} = this.state;

        let theValue = value;

        if (typeof theValue !== 'object') {
            theValue = null;
        }

        const isOne = theValue && theValue.end.diff(theValue.start) === 0;

        this.setState({
            bottomValue: {
                start: event.target.value,
                end: isOne ? event.target.value : value.end.format('L')
            }
        });
    }

    startDateKeyPress(event) {
        if (event.key === 'Enter') {
            event.preventDefault();

            const {value} = this.state;
            let theValue = value;

            if (typeof theValue !== 'object') {
                theValue = null;
            }

            const isOne = theValue && theValue.end.diff(theValue.start) === 0;
            const newValue = moment(event.target.value, 'DD/MM/YYYY', true);

            if (!newValue.isValid()) {
                this.setState({
                    bottomValue: {
                        start: value.start.format('L'),
                        end: value.end.format('L')
                    }
                });
                return;
            }

            const nextValue = moment.range(newValue, isOne ? newValue : value.end);

            this.setState({
                bottomValue: {
                    start: newValue.format('L'),
                    end: isOne ? newValue.format('L') : value.end.format('L')
                },
                value: nextValue
            }, () => {
                this.notify(nextValue);
            });

        }

    }

    endDateChange(event) {
        const {bottomValue} = this.state;

        this.setState({
            bottomValue: {
                start: bottomValue.start,
                end: event.target.value
            }
        });
    }


    endDateKeyPress(event) {
        if (event.key === 'Enter') {
            event.preventDefault();

            const {value} = this.state;
            const newValue = moment(event.target.value, 'DD/MM/YYYY', true);

            if (!newValue.isValid()) {
                this.setState({
                    bottomValue: {
                        start: value.start.format('L'),
                        end: value.end.format('L')
                    }
                });
                return;
            }

            const nextValue = moment.range(value.start, newValue);

            this.setState({
                bottomValue: {
                    start: value.start.format('L'),
                    end: newValue.format('L')
                },
                value: nextValue
            }, () => {
                this.notify(nextValue);
            });

        }

    }

    renderInputText(value, onChange, onKeyPress) {
        return (
            <input className={classNames({ invalid: !moment(value, 'DD/MM/YYYY', true).isValid() })} type="text" value={value} onChange={onChange} onKeyPress={onKeyPress} />
        );
    }

    render() {
        const {value, bottomValue} = this.state;

        let theValue = value;

        if (typeof theValue !== 'object') {
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
                    (isOne ?
                        (
                            <div className="display">
                                {this.renderInputText(bottomValue.start, this.startDateChange, this.startDateKeyPress)}
                            </div>
                        ) : (
                            <div className="display">
                                {this.renderInputText(bottomValue.start, this.startDateChange, this.startDateKeyPress)}
                                <span> - </span>
                                {this.renderInputText(bottomValue.end, this.endDateChange, this.endDateKeyPress)}
                            </div>
                        )
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