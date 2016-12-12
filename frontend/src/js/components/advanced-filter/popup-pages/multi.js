'use strict';

import React, { Component, PropTypes } from 'react';
import layout from './layout';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';

class Multi extends Component {

    constructor(props) {
        super(props);

        this.state = {
            filter: '',
            options: null
        };

        this.setFilter = this.setFilter.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        const {getOptions} = this.props;

        getOptions().then(options => {
            this.setState({
                options
            });
        });

    }

    submit(form) {
        const {onSubmit, name} = this.props;

        const values = [];

        _.forEach(form[name], (value, key) => {
            if(value) {
                values.push(key.replace(/^\_/, ''));
            }
        });

        form[name] = values;

        if(!values.length) {
            return;
        }

        onSubmit(form);
    }

    setFilter(filter) {
        this.setState({
            filter: filter.target.value
        });
    }

    render() {

        const {title, name, onBack, btnText, handleSubmit, pristine, submitting} = this.props;
        const {filter, options} = this.state;

        return layout(title, onBack, (
            <div className="multi-page">

                <input className="filter-field" type="text" placeholder="Filtrar..." value={filter} onChange={this.setFilter} />

                <form onSubmit={handleSubmit(this.submit)}>
                    <div className="options-box">
                        {options ?
                            options.map(option => (
                                <label key={option.value}><Field type="checkbox" component="input" name={`${name}._${option.value}`} />{option.label}</label>
                            ))

                            : <span>Carregando...</span>
                        }

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
    title: PropTypes.string,
    onBack: PropTypes.func,
    name: PropTypes.string.isRequired,
    getOptions: PropTypes.func.isRequired,
    btnText: PropTypes.string,
    onSubmit: PropTypes.func,
    handleSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool
};

export default reduxForm({
    form: 'advanced-filter/popup/multi'
})(Multi);