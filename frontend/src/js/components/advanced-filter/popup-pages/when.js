'use strict';

import React, { Component, PropTypes } from 'react';
import layout from './layout';
import { Field, reduxForm } from 'redux-form';
import RelativeDates from '../relative-dates';
import DatePicker from '../date-picker';
import classNames from 'classnames';

class When extends Component {

    constructor(props) {
        super(props);

        const {initialValues, name} = props;

        const value = initialValues ? initialValues[name] : null;

        this.state = {
            page: typeof value === 'string' || !value ? 'relative' : 'static'
        };

        this.goToPage = this.goToPage.bind(this);
        this.renderRelativeDate = this.renderRelativeDate.bind(this);
        this.renderRelativeForm = this.renderRelativeForm.bind(this);
        this.renderStaticForm = this.renderStaticForm.bind(this);
        this.renderPage = this.renderPage.bind(this);
    }

    goToPage(page) {
        this.setState({
            page
        });
    }

    renderRelativeDate(data) {
        const {input, ...rest} = data;

        return (
            <RelativeDates {...input} {...rest} />
        );
    }

    renderDatePicker(data) {
        const {input, ...rest} = data;

        return (
            <DatePicker {...input} {...rest} />
        );
    }

    renderRelativeForm() {
        const {name, textBtn, isEdit, onSubmit, handleSubmit, pristine, submitting, relativeDateTexts} = this.props;
        const textBtnValue = textBtn[isEdit ? 'isEdit' : 'default'];

        return (
            <form onSubmit={handleSubmit(onSubmit)}>

                <Field name={name} texts={relativeDateTexts} component={this.renderRelativeDate} />

                <div>
                    <button className="submit-btn" type="submit" disabled={pristine || submitting}>{textBtnValue}</button>
                </div>
            </form>
        );
    }

    renderStaticForm() {
        const {name, textBtn, isEdit, onSubmit, handleSubmit, pristine, submitting, invalid} = this.props;
        const textBtnValue = textBtn[isEdit ? 'isEdit' : 'default'];

        return (
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="picker-wrapper">
                    <Field name={name} component={this.renderDatePicker} />
                </div>

                <div>
                    <button className="submit-btn" type="submit" disabled={pristine || submitting || invalid}>{textBtnValue}</button>
                </div>
            </form>
        );
    }

    renderPage() {
        const {page} = this.state;

        switch (page) {
            case 'relative': return this.renderRelativeForm();
            case 'static': return this.renderStaticForm();
        }
    }

    render() {

        const {title, onBack, backBtn, isEdit} = this.props;
        const {page} = this.state;

        return layout(title, !isEdit && onBack, backBtn, (

            <div className="when-page">

                <nav className="menu">
                    <a className={classNames('btn', { active: page === 'relative' })} onClick={e => { e.preventDefault(); this.goToPage('relative'); } }>Relativa</a>
                    <a className={classNames('btn', { active: page === 'static' })} onClick={e => { e.preventDefault(); this.goToPage('static'); } }>Específica</a>
                </nav>

                {
                    this.renderPage()
                }

            </div>


        ));

    }
}

When.propTypes = {
    isEdit: PropTypes.bool,
    title: PropTypes.string,
    onBack: PropTypes.func,
    backBtn: PropTypes.object,
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    textBtn: PropTypes.object,
    onSubmit: PropTypes.func,
    handleSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    initialValues: PropTypes.object,
    relativeDateTexts: PropTypes.object,
    invalid: PropTypes.bool
};

const validate = values => {
    const errors = {};

    if(typeof values.when === 'object') {
        if(values.when.start > values.when.end) {
            errors.when = 'Start date is greater than end date';
        }
    }

    return errors;
};

export default key => reduxForm({
    form: `advanced-filter/popup/when/${key}`,
    validate
})(When);