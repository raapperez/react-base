'use strict';

import React, { Component, PropTypes } from 'react';
import layout from './layout';
import { Field, reduxForm } from 'redux-form';
import RelativeDates from '../relative-dates';

class When extends Component {

    constructor(props) {
        super(props);
    }

    renderRelativeDate(data) {
        const {input, ...rest} = data;

        return (
            <RelativeDates {...input} {...rest} />
        );
    }

    render() {

        const {title, onBack, name, label, input, btnText, onSubmit, handleSubmit, pristine, submitting} = this.props;

        return layout(title, onBack, (
            <form className="when-page" onSubmit={handleSubmit(onSubmit)}>
                
                <Field name={name} component={this.renderRelativeDate} />

                <div>
                    <button className="submit-btn" type="submit" disabled={pristine || submitting}>{btnText}</button>
                </div>
            </form>
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