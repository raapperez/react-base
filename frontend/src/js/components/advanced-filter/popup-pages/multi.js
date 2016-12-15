'use strict';

import React, { Component, PropTypes } from 'react';
import layout from './layout';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import _ from 'lodash';
import Async from 'react-promise';
import latinize from 'latinize';

class Multi extends Component {

    constructor(props) {
        super(props);

        this.state = {
            filter: ''
        };

        this.setFilter = this.setFilter.bind(this);
        this.submit = this.submit.bind(this);
    }


    submit(form) {
        const {onSubmit, name, parseResult} = this.props;

        const values = [];

        _.forEach(form, (value, key) => {
            if (value) {
                const newKey = key.replace(/^\_/, '');

                if (parseResult) {
                    values.push(parseResult(newKey));
                } else {
                    values.push(newKey);
                }

            }
        });

        if (!values.length) {
            return Promise.reject(new SubmissionError({ _error: 'Must select at least one' }));
        }

        onSubmit({
            [name]: values
        });
    }

    setFilter(filter) {
        this.setState({
            filter: filter.target.value
        });
    }

    render() {

        const {title, onBack, isEdit, btnText, handleSubmit, pristine, submitting, getOptions} = this.props;
        const {filter} = this.state;

        const adjustedFilter = latinize(filter.toLowerCase());


        return layout(title, !isEdit && onBack, (
            <div className="multi-page">

                <input autoFocus className="filter-field" type="text" placeholder="Filtrar..." value={filter} onChange={this.setFilter} />

                <form onSubmit={handleSubmit(this.submit)}>
                    <div className="options-box">

                        <Async promise={getOptions()} then={(options) => (
                            <div>
                                {_.sortBy(options, (option => latinize(option.label.toLowerCase()))).filter(option => latinize(option.label.toLowerCase()).indexOf(adjustedFilter) !== -1).map(option => (
                                    <label key={option.value}><Field type="checkbox" component="input" name={`_${option.value}`} />{option.label}</label>
                                ))}
                            </div>
                        )} pendingRender={(
                            <span>Carregando...</span>
                        )} />

                    </div>
                    <div>
                        <button className="submit-btn" type="submit" disabled={pristine || submitting}>{btnText}</button>
                    </div>
                </form>

            </div>


        ));

    }
}

Multi.propTypes = {
    isEdit: PropTypes.bool,
    title: PropTypes.string,
    onBack: PropTypes.func,
    name: PropTypes.string.isRequired,
    getOptions: PropTypes.func.isRequired,
    btnText: PropTypes.string,
    parseResult: PropTypes.func,
    onSubmit: PropTypes.func,
    handleSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool
};

export default key => reduxForm({
    form: `advanced-filter/popup/multi/${key}`
})(Multi);