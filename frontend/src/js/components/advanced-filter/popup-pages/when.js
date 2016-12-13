'use strict';

import React, { Component, PropTypes } from 'react';
import layout from './layout';
import { Field, reduxForm } from 'redux-form';
import RelativeDates from '../relative-dates';
import classNames from 'classnames';

class When extends Component {

    constructor(props) {
        super(props);

        this.state = {
            page: 'relative'
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

    renderRelativeForm() {
        const {name, btnText, onSubmit, handleSubmit, pristine, submitting} = this.props;
        
        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                
                <Field name={name} component={this.renderRelativeDate} />

                <div>
                    <button className="submit-btn" type="submit" disabled={pristine || submitting}>{btnText}</button>
                </div>
            </form>
        );
    }

    renderStaticForm() {
        return (
            <div>static</div>
        );
    }

    renderPage() {
        const {page} = this.state;

        switch(page) {
            case 'relative': return this.renderRelativeForm();
            case 'static': return this.renderStaticForm();
        }
    }

    render() {

        const {title, onBack} = this.props;
        const {page} = this.state;

        return layout(title, onBack, (

            <div className="when-page">

                <nav className="menu">
                    <a className={classNames('btn', {active: page === 'relative'})} onClick={e => {e.preventDefault(); this.goToPage('relative');}}>Relativa</a>
                    <a className={classNames('btn', {active: page === 'static'})} onClick={e => {e.preventDefault(); this.goToPage('static');}}>Específica</a>
                </nav>

                {
                    this.renderPage()
                }

            </div>

            
        ));

    }
}

When.propTypes = {
    title: PropTypes.string,
    onBack: PropTypes.func,
    label: PropTypes.string,
    input: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    btnText: PropTypes.string,
    onSubmit: PropTypes.func,
    handleSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool
};

export default reduxForm({
    form: 'advanced-filter/popup/when'
})(When);