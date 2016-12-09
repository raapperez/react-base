'use strict';


import React, { Component, PropTypes } from 'react';
import Box from './box';
import Popup from './popup';


class AdvancedFilter extends Component {

    constructor(props) {
        super(props);

        this.state = {
        };

        this.togglePopup = this.togglePopup.bind(this);
    }

    togglePopup() {
        const {popup} = this.refs;
        popup.toggle();
    }

    render() {

        return (
            <div className="advanced-filter">
                <Box filters={[{ label: 'Categorias', value: 'Lâmpada apagada à noite' }, { label: 'Bairros', value: '5 selecionados' },
                { label: 'Categorias', value: 'Lâmpada apagada à noite' }, { label: 'Bairros', value: '5 selecionados' },
                { label: 'Categorias', value: 'Lâmpada apagada à noite' }, { label: 'Bairros', value: '5 selecionados' },
                { label: 'Categorias', value: 'Lâmpada apagada à noite' }, { label: 'Bairros', value: '5 selecionados' },
                { label: 'Categorias', value: 'Lâmpada apagada à noite' }, { label: 'Bairros', value: '5 selecionados' },
                { label: 'Categorias', value: 'Lâmpada apagada à noite' }, { label: 'Bairros', value: '5 selecionados' }
                ]} />
                <div className="right">
                    <a onClick={this.togglePopup}>+</a>
                    <Popup ref="popup" />
                </div>
            </div>
        );
    }
}

AdvancedFilter.PropTypes = {

};

export default AdvancedFilter;