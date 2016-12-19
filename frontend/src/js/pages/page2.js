'use strict';

import moment from 'moment';
moment.locale('pt-br');

import React, { Component, PropTypes } from 'react';
import AdvancedFilter, { pageType, dateType } from '../components/advanced-filter';
import _ from 'lodash';


const textBtn = {
    default: 'Adicionar filtro',
    isEdit: 'Editar filtro'
};

const backBtn = (
    <span>{'<'}</span>
);


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

function getNeighborhoodsOptions() {
    return new Promise((resolve) => {
        //setTimeout(() => {
        resolve([
            {
                value: 0,
                label: 'Moema'
            },
            {
                value: 1,
                label: 'Vila Olímpia'
            },
            {
                value: 2,
                label: 'Butantã'
            },
            {
                value: 3,
                label: 'Tatuapé'
            },
            {
                value: 4,
                label: 'Saúde'
            },
            {
                value: 5,
                label: 'Vila Sônia'
            },
            {
                value: 6,
                label: 'Mooca'
            },
            {
                value: 7,
                label: 'Itaim'
            },
            {
                value: 8,
                label: 'Vila Madalena'
            }

        ]);
        // }, 500);
    });

}

function getCommentsOptions() {
    return Promise.resolve([
        {
            label: 'Somente lidos',
            value: false
        },
        {
            label: 'Somente novos',
            value: true
        }
    ]);
}

class Page2Page extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: {
                anyField: 'buraco',
                categories: [0, 4, 5, 9, 7],
                neighborhoods: [0],
                when: moment.range('2016-12-06T02:00:00.000Z', '2016-12-22T02:00:00.000Z'),
                status: [0, 2, 3],
                hasNewComments: true
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
                        backBtn,
                        input: {
                            placeholder: 'Escreva o texto desejado',
                            name: 'anyField',
                            required: 'required'
                        },
                        textBtn
                    }
                },
                {
                    key: 'categories',
                    label: 'Categorias',
                    type: pageType.MULTI,
                    getDisplay: array => {

                        if (array.length === 1) {

                            return getCategoriesOptions().then(categories => {
                                return categories.find(category => category.value === array[0]).label.toString();
                            });

                        }

                        return Promise.resolve(`${array.length} selecionados`);
                    },
                    config: {
                        title: 'Categorias',
                        name: 'categories',
                        backBtn,
                        getOptions: getCategoriesOptions,
                        textBtn,
                        selectAll: 'Todos / Nenhum',
                        parseResult: parseInt

                    }
                },
                {
                    key: 'neighborhoods',
                    label: 'Bairros',
                    type: pageType.MULTI,
                    getDisplay: array => {
                        if (array.length === 1) {

                            return getNeighborhoodsOptions().then(status => {
                                return status.find(status => status.value === array[0]).label.toString();
                            });

                        }

                        return Promise.resolve(`${array.length} selecionados`);
                    },
                    config: {
                        title: 'Bairros',
                        name: 'neighborhoods',
                        backBtn,
                        getOptions: getNeighborhoodsOptions,
                        textBtn,
                        selectAll: 'Todos / Nenhum',
                        parseResult: parseInt
                    }
                },
                {
                    key: 'when',
                    label: 'Data de criação',
                    type: pageType.WHEN,
                    getDisplay: value => {
                        if (typeof value === 'object') {
                            const start = moment(value.start);
                            const end = moment(value.end);
                            if (end.diff(start) === 0) {
                                return Promise.resolve(start.format('L'));
                            }
                            return Promise.resolve(`${start.format('L')} - ${end.format('L')}`);
                        }

                        switch (value) {
                            case dateType.today: return Promise.resolve('Hoje');
                            case dateType.yesterday: return Promise.resolve('Ontem');
                            case dateType.last7days: return Promise.resolve('Últimos 7 dias');
                            case dateType.last30days: return Promise.resolve('Últimos 30 dias');
                            case dateType.lastWeek: return Promise.resolve('Última semana');
                            case dateType.lastMonth: return Promise.resolve('Último mês');
                            case dateType.lastYear: return Promise.resolve('Último ano');
                            case dateType.thisWeek: return Promise.resolve('Esta semana');
                            case dateType.thisMonth: return Promise.resolve('Este mês');
                            case dateType.thisYear: return Promise.resolve('Este ano');


                        }

                        return Promise.resolve(value);
                    },
                    config: {
                        title: 'Data de criação',
                        name: 'when',
                        backBtn,
                        textBtn,
                        relativeDateTexts: {
                            today: 'Hoje',
                            yesterday: 'Ontem',
                            last7days: 'Últimos 7 dias',
                            last30days: 'Últimos 30 dias',
                            last: 'Último(a)',
                            this: 'Este(a)',
                            week: 'Semana',
                            month: 'Mês',
                            year: 'Ano'
                        },
                        dateFormat: 'DD/MM/YYYY'
                    }
                },
                {
                    key: 'status',
                    label: 'Situação',
                    type: pageType.MULTI,
                    getDisplay: array => {
                        if (array.length === 1) {

                            return getStatusOptions().then(status => {
                                return status.find(status => status.value === array[0]).label.toString();
                            });

                        }

                        return Promise.resolve(`${array.length} selecionados`);
                    },
                    config: {
                        title: 'Situação',
                        name: 'status',
                        backBtn,
                        getOptions: getStatusOptions,
                        textBtn,
                        selectAll: 'Todos / Nenhum',
                        parseResult: parseInt
                    }
                },
                {
                    key: 'hasNewComments',
                    label: 'Comentários',
                    type: pageType.RADIO,
                    getDisplay: value => {
                        return getCommentsOptions().then(data => {
                            return data.find(d => d.value === value).label;
                        });
                    },
                    config: {
                        title: 'Comentários',
                        name: 'hasNewComments',
                        backBtn,
                        getOptions: getCommentsOptions,
                        textBtn,
                        parseResult: result => (_.isString(result) && result === 'true') || (_.isBoolean(result) && result)
                    }
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