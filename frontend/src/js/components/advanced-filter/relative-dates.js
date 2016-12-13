'use strict';

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import * as dateType from './date-type';

class RelativeDate extends Component {
    constructor(props) {
        super(props);

        const {value} = props;

        this.state = {
            value: value || null
        };

        this.setValue = this.setValue.bind(this);
        this.renderRadioBtn = this.renderRadioBtn.bind(this);
    }

    setValue(value) {
        const {onChange} = this.props;

        this.setState({
            value
        }, () => {
            if (onChange) {
                onChange(value);
            }
        });
    }

    renderRadioBtn(dateType, label) {
        const {value} = this.state;

        return (
            <a className={classNames('radio-btn', { active: value === dateType })} onClick={e => { e.preventDefault(); this.setValue(dateType); } }>{label}</a>
        );
    }

    render() {

        return (
            <div>
                <div className='panel'>
                    <div className='item half'>
                        {this.renderRadioBtn(dateType.today, 'Hoje')}
                    </div>
                    <div className='item half'>
                        {this.renderRadioBtn(dateType.yesterday, 'Ontem')}
                    </div>
                    <div className='item half'>
                        {this.renderRadioBtn(dateType.last7days, 'Últimos 7 dias')}
                    </div>
                    <div className='item half'>
                        {this.renderRadioBtn(dateType.last30days, 'Últimos 30 dias')}
                    </div>
                </div>

                <div className='panel-title'>
                    <span>Último(a)</span>
                </div>

                <div className='panel'>
                    <div className='item third'>
                        {this.renderRadioBtn(dateType.lastWeek, 'Semana')}
                    </div>
                    <div className='item third'>
                        {this.renderRadioBtn(dateType.lastMonth, 'Mês')}
                    </div>
                    <div className='item third'>
                        {this.renderRadioBtn(dateType.lastYear, 'Ano')}
                    </div>
                </div>

                <div className='panel-title'>
                    <span>Este(a)</span>
                </div>

                <div className='panel'>
                    <div className='item third'>
                        {this.renderRadioBtn(dateType.thisWeek, 'Semana')}
                    </div>
                    <div className='item third'>
                        {this.renderRadioBtn(dateType.thisMonth, 'Mês')}
                    </div>
                    <div className='item third'>
                        {this.renderRadioBtn(dateType.thisYear, 'Ano')}
                    </div>
                </div>
            </div>
        );

    }
}

RelativeDate.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
};


export default RelativeDate;