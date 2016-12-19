'use strict';

import React, { Component, PropTypes } from 'react';
import layout from './layout';
import _ from 'lodash';
import Async from 'react-promise';
import latinize from 'latinize';

class Multi extends Component {

    constructor(props) {
        super(props);

        this.state = {
            filter: '',
            form: props.initialValues || {
                [props.name]: []
            }
        };

        this.setFilter = this.setFilter.bind(this);
        this.submit = this.submit.bind(this);
        this.checkboxChange = this.checkboxChange.bind(this);
        this.allSelectedChange = this.allSelectedChange.bind(this);
    }


    submit(event) {
        const {onSubmit} = this.props;
        const {form} = this.state;

        event.preventDefault();

        onSubmit(form);
    }

    setFilter(filter) {
        this.setState({
            filter: filter.target.value
        });
    }

    checkboxChange(event) {
        const {name, parseResult} = this.props;
        const value = parseResult(event.target.value);

        const form = this.state.form || {
            [name]: []
        };

        const values = form[name];

        if (values.indexOf(value) !== -1) {
            this.setState({
                form: {
                    [name]: _.difference(values, [value])
                }
            });

            return;
        }

        this.setState({
            form: {
                [name]: [...values, value].sort()
            }
        });
    }

    allSelectedChange() {
        const {name, getOptions} = this.props;

        const form = this.state.form || {
            [name]: []
        };

        getOptions().then(options => {

            if (form[name].length === options.length) {
                this.setState({
                    form: {
                        [name]: []
                    }
                });
                return;
            }

            this.setState({
                form: {
                    [name]: options.map(option => option.value)
                }
            });

        }).catch(err => {
            console.log(err);
        });

    }

    render() {

        const {title, onBack, name, backBtn, isEdit, textBtn, getOptions, selectAll} = this.props;
        const {filter, form} = this.state;

        const adjustedFilter = latinize(filter.toLowerCase());
        const textBtnValue = textBtn[isEdit ? 'isEdit' : 'default'];

        return layout(title, !isEdit && onBack, backBtn, (
            <div className="multi-page">

                <input autoFocus className="filter-field" type="text" placeholder="Filtrar..." value={filter} onChange={this.setFilter} />

                <form onSubmit={this.submit}>
                    <div className="options-box">

                        <Async promise={getOptions()} then={(options) => (
                            <div>
                                {selectAll ? (
                                    <label>
                                        <input type="checkbox" checked={options.length === form[name].length} onChange={this.allSelectedChange} /> Todos / Nenhum
                                </label>
                                )
                                    : null
                                }

                                <hr />

                                {_.sortBy(options, (option => latinize(option.label.toLowerCase()))).filter(option => latinize(option.label.toLowerCase()).indexOf(adjustedFilter) !== -1).map(option => (
                                    <label key={option.value}>
                                        <input type="checkbox" name={name} value={option.value} checked={form[name].indexOf(option.value) !== -1} onChange={this.checkboxChange} />
                                        {option.label}
                                    </label>
                                ))}
                            </div>
                        )} pendingRender={(
                            <span>Carregando...</span>
                        )} />

                    </div>
                    <div>
                        <button className="submit-btn" type="submit" disabled={form[name].length === 0}>{textBtnValue}</button>
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
    backBtn: PropTypes.object,
    name: PropTypes.string.isRequired,
    getOptions: PropTypes.func.isRequired,
    textBtn: PropTypes.object,
    parseResult: PropTypes.func,
    onSubmit: PropTypes.func,
    initialValues: PropTypes.object,
    selectAll: PropTypes.string
};

export default Multi;