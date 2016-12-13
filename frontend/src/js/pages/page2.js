'use strict';

import React, { Component, PropTypes } from 'react';
import AdvancedFilter, { pageType } from '../components/advanced-filter';

function getCategoriesOptions() {
    return new Promise((resolve) => {
        //setTimeout(() => {
        resolve([
            {
                value: 5,
                label: 'Poda/retirada de árvore'
            },
            {
                value: 7,
                label: 'Estacionamento irregular'
            },
            {
                value: 8,
                label: 'Ocupação irregular de área pública'
            },
            {
                value: 11,
                label: 'Calçada irregular'
            },
            {
                value: 13,
                label: 'Estabelecimento sem nota fiscal'
            },
            {
                value: 2,
                label: 'Iluminação pública irregular'
            },
            {
                value: 17,
                label: 'Falta de rampa de acessibilidade'
            },
            {
                value: 1,
                label: 'Semáforo quebrado'
            },
            {
                value: 3,
                label: 'Buraco nas vias'
            },
            {
                value: 4,
                label: 'Foco de dengue'
            },
            {
                value: 6,
                label: 'Bueiro entupido'
            },
            {
                value: 9,
                label: 'Entulho na calçada/via pública'
            }
        ]);
        // }, 500);
    });

}

function getStatusOptions() {
    return new Promise((resolve) => {
        //setTimeout(() => {
        resolve([
            {
                value: 0,
                label: 'Aberto'
            },
            {
                value: 1,
                label: 'Atendido'
            },
            {
                value: 2,
                label: 'Atendimento'
            },
            {
                value: 3,
                label: 'Fechado'
            },
            {
                value: 4,
                label: 'Novo'
            },
            {
                value: 5,
                label: 'Recusado'
            }
        ]);
        // }, 500);
    });

}

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
                    getDisplay: value => Promise.resolve(value),
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
                    key: 'categories',
                    label: 'Categorias',
                    type: pageType.MULTI,
                    getDisplay: array => {

                        if (array.length === 1) {

                            return getCategoriesOptions().then(categories => {
                                return categories.find(category => category.value.toString() === array[0]).label.toString();
                            });

                        }

                        return Promise.resolve(`${array.length} selecionados`);
                    },
                    config: {
                        title: 'Categorias',
                        name: 'categories',
                        getOptions: getCategoriesOptions,
                        btnText: 'Adicionar filtro'

                    }
                },
                {
                    label: 'Bairros'
                },
                {
                    label: 'Data de criação'
                },
                {
                    key: 'status',
                    label: 'Situação',
                    type: pageType.MULTI,
                    getDisplay: array => {
                        if (array.length === 1) {

                            return getStatusOptions().then(status => {
                                return status.find(status => status.value.toString() === array[0]).label.toString();
                            });

                        }

                        return Promise.resolve(`${array.length} selecionados`);
                    },
                    config: {
                        title: 'Situação',
                        name: 'status',
                        getOptions: getStatusOptions,
                        btnText: 'Adicionar filtro'
                    }
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