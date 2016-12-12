'use strict';

import React, { Component, PropTypes } from 'react';
import AdvancedFilter, { pageType } from '../components/advanced-filter';

class Page2Page extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: {
                anyField: 'buraco',
                // categories: [0, 4, 5, 6, 7],
                // neighborhoods: [0,2, 4, 5],
                // createdAt: 'lastWeek',
                // status: [0,2,3],
                // isNew: true
            }
        };

        this.filterChanged = this.filterChanged.bind(this);
    }

    filterChanged(value) {
        this.setState({
            value
        });
    }

    render() {

        const config = {
            items: [
                {
                    key: 'anyField',
                    label: 'Qualquer campo',
                    type: pageType.TEXT,
                    getDisplay: value => value,
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

        const {value} = this.state;

        return (
            <div>
                <div style={{ marginTop: '50px', marginLeft: '50px', width: '1200px', marginRight: '50px' }}>
                    <AdvancedFilter value={value} onChange={this.filterChanged} config={config} />

                    <br />
                    <br />

                    {JSON.stringify(value)}
                </div>


            </div>
        );
    }
}

export default Page2Page;