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
        this.renderOptions = this.renderOptions.bind(this);
    }

    submit(form) {
        const {onSubmit, name, parseResult} = this.props;

        if (parseResult) {
            onSubmit({
                [name]: parseResult(form[name])
            });
            return;
        }

        onSubmit(form);
    }

    renderOptions(options) {

        const {name} = this.props;
        //const headOption = _.head(options);

        return (
            <div>
                {_.sortBy(options, (option => latinize(option.label.toLowerCase()))).map(option => (
                    <label key={option.value}>
                        <Field type="radio" component="input" name={name} value={option.value.toString()} />
                        {option.label}
                    </label>
                ))}
            </div>
        );
    }

    render() {

        const {title, onBack, backBtn, isEdit, textBtn, handleSubmit, pristine, submitting, getOptions} = this.props;
        const textBtnValue = textBtn[isEdit ? 'isEdit' : 'default'];

        return layout(title, !isEdit && onBack, backBtn, (
            <div className="radio-page">

                <form onSubmit={handleSubmit(this.submit)}>
                    <div className="options-box">
                        <Async promise={getOptions()}
                            then={this.renderOptions}
                            pendingRender={(
                                <span>Carregando...</span>
                            )} />

                    </div>
                    <div>
                        <button className="submit-btn" type="submit" disabled={pristine || submitting}>{textBtnValue}</button>
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
    backBtn: PropTypes.object,
    name: PropTypes.string.isRequired,
    getOptions: PropTypes.func.isRequired,
    textBtn: PropTypes.object,
    parseResult: PropTypes.func,
    onSubmit: PropTypes.func,
    handleSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool
};

export default key => reduxForm({
    form: `advanced-filter/popup/radio/${key}`
})(Radio);