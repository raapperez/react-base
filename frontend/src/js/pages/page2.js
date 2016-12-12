'use strict';

import React, { Component, PropTypes } from 'react';
import AdvancedFilter, { pageType } from '../components/advanced-filter';

class Page2Page extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const config = {
            items: [
                {
                    label: 'Qualquer campo',
                    type: pageType.TEXT,
                    getDisplay: filter => filter.form.anyField,
                    config: {
                        title: 'Qualquer campo',
                        label: 'Contém',
                        input: {
                            placeholder: 'Escreva o texto desejado',
                            name: 'anyField',
                            required: 'required'
                        },
                        btnText: 'Adicionar filtro'
                    }

                },
                {
                    label: 'Categorias'
                },
                {
                    label: 'Bairros'
                },
                {
                    label: 'Data de criação'
                },
                {
                    label: 'Situação'
                },
                {
                    label: 'Comentários'
                }
            ]
        };

        return (
            <div>

                <div style={{ marginTop: '50px', marginLeft: '50px', width: '1200px', marginRight: '50px' }}>
                    <AdvancedFilter config={config} />
                </div>


            </div>
        );
    }
}

export default Page2Page;