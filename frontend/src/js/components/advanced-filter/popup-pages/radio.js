'use strict';

import React, { Component, PropTypes } from 'react';
import layout from './layout';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import Async from 'react-promise';
import latinize from 'latinize';

class Radio extends Component {

    constructor(props) {
        super(props);

        this.state = {
        };

        this.submit = this.submit.bind(this);
    }

    submit(form) {
        const {onSubmit, name, parseResult} = this.props;

        if(parseResult) {
            onSubmit({
                [name]: parseResult(form[name])
            });
            return;
        }

        onSubmit(form);
    }

    render() {

        const {title, name, onBack, isEdit, btnText, handleSubmit, pristine, submitting, getOptions} = this.props;


        return layout(title, !isEdit && onBack, (
            <div className="radio-page">

                <form onSubmit={handleSubmit(this.submit)}>
                    <div className="options-box">
                        <Async promise={getOptions()} then={(options) => (
                            <div>
                            {_.sortBy(options, (option => latinize(option.label.toLowerCase()))).map(option => (
                                <label key={option.value}><Field type="radio" component="input" name={name} value={option.value.toString()} />{option.label}</label>
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

Radio.propTypes = {
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

export default reduxForm({
    form: 'advanced-filter/popup/radio'
})(Radio);