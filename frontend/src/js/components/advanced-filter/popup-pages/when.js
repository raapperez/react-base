'use strict';

import React, { Component, PropTypes } from 'react';
import layout from './layout';
import { Field, reduxForm } from 'redux-form';
import RelativeDates from '../relative-dates';

class When extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {title, onBack, label, input, btnText, onSubmit, handleSubmit, pristine, submitting} = this.props;

        return layout(title, onBack, (
            <form className="when-page" onSubmit={handleSubmit(onSubmit)}>
                
                <RelativeDates />

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
    btnText: PropTypes.string,
    onSubmit: PropTypes.func,
    handleSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool
};

export default reduxForm({
    form: 'advanced-filter/popup/when'
})(When);