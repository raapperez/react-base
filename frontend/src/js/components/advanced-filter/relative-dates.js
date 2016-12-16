'use strict';

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import * as dateType from './date-type';

const defaultTexts = {
    today: 'Hoje',
    yesterday: 'Ontem',
    last7days: 'Últimos 7 dias',
    last30days: 'Últimos 30 dias',
    last: 'Último(a)',
    this: 'Este(a)',
    week: 'Semana',
    month: 'Mês',
    year: 'Ano'
};

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
        const texts = this.props.texts || defaultTexts;

        return (
            <div>
                <div className='panel-title'>&nbsp;</div>

                <div className='panel'>
                    <div className='item half'>
                        {this.renderRadioBtn(dateType.today, texts.today)}
                    </div>
                    <div className='item half'>
                        {this.renderRadioBtn(dateType.yesterday, texts.yesterday)}
                    </div>
                    <div className='item half'>
                        {this.renderRadioBtn(dateType.last7days, texts.last7days)}
                    </div>
                    <div className='item half'>
                        {this.renderRadioBtn(dateType.last30days, texts.last30days)}
                    </div>
                </div>

                <div className='panel-title'>
                    <span>{texts.last}</span>
                </div>

                <div className='panel'>
                    <div className='item third'>
                        {this.renderRadioBtn(dateType.lastWeek, texts.week)}
                    </div>
                    <div className='item third'>
                        {this.renderRadioBtn(dateType.lastMonth, texts.month)}
                    </div>
                    <div className='item third'>
                        {this.renderRadioBtn(dateType.lastYear, texts.year)}
                    </div>
                </div>

                <div className='panel-title'>
                    <span>{texts.this}</span>
                </div>

                <div className='panel'>
                    <div className='item third'>
                        {this.renderRadioBtn(dateType.thisWeek, texts.week)}
                    </div>
                    <div className='item third'>
                        {this.renderRadioBtn(dateType.thisMonth, texts.month)}
                    </div>
                    <div className='item third'>
                        {this.renderRadioBtn(dateType.thisYear, texts.year)}
                    </div>
                </div>
            </div>
        );

    }
}

RelativeDate.propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
    texts: PropTypes.object
};


export default RelativeDate;

