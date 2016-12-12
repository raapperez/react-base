'use strict';

import React, { Component, PropTypes } from 'react';
import layout from './layout';
import { Field, reduxForm } from 'redux-form';

class Text extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {title, onBack, label, input, btnText, onSubmit, handleSubmit, pristine, submitting} = this.props;

        return layout(title, onBack, (
            <form className="text-page" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    {label ?
                        (<label>{label}</label>)
                        : null
                    }
                    <Field type="text" {...input} component="input" />
                </div>
                <div>
                    <button className="submit-btn" type="submit" disabled={pristine || submitting}>{btnText}</button>
                </div>
            </form>
        ));

    }
}

Text.propTypes = {
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
    form: 'advanced-filter/popup/text'
})(Text);