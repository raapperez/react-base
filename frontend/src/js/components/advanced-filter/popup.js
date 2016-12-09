'use strict';

import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import Main from './main';

class Popup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isActive: false
        };

        this.getIsActive = this.getIsActive.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    getIsActive() {
        const {isActive} = this.state;
        return isActive;        
    }

    open() {
        const {popup} = this.refs;

        this.setState({
            isActive: true
        }, () => {
            popup.focus(); 
        });

    }

    close() {
        setTimeout(() => {
            this.setState({
                isActive: false
            });
        }, 150);
    }

    toggle() {
        const {isActive} = this.state;
        
        if(isActive) {
            this.close();
            return;
        }

        this.open();
    }

    render() {

        const {isActive} = this.state;

        const items =[
            {
                label: 'Data de criação'
            },
            {
                label: 'Categorias'
            },
            {
                label: 'Bairros'
            },
            {
                label: 'Qualquer campo'
            },
            {
                label: 'Situação'
            },
            {
                label: 'Comentários'
            }
        ];

        return (
            <div className={classNames('popup', {active: isActive})} tabIndex="-1" onBlur={this.close} ref="popup">

                <div className="top-triangle"></div>

                <Main items={items} onSelect={()=>{}}/>
            </div>
        );
    }
}

Popup.propTypes = {
};

export default Popup;