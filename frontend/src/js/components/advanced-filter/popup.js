'use strict';

import React, { Component, PropTypes } from 'react';
import Main from './popup-pages/main';
import Text from './popup-pages/text';
import Multi from './popup-pages/multi';
import Radio from './popup-pages/radio';
import When from './popup-pages/when';
import Popover from 'react-popover-fork';
import _ from 'lodash';

import * as pageType from './popup-pages/page-type';

const _pages = {};


class Popup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isActive: false,
            selectedItem: props.config.items.find(item => item.key === props.selectedItemKey) || null
        };

        this.getIsActive = this.getIsActive.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.toggle = this.toggle.bind(this);

        this.selectItem = this.selectItem.bind(this);
        this.renderMain = this.renderMain.bind(this);
        this.renderText = this.renderText.bind(this);
        this.renderMulti = this.renderMulti.bind(this);

        this.renderSelectedItem = this.renderSelectedItem.bind(this);
        this.resetSelectedItem = this.resetSelectedItem.bind(this);
        this.addFilter = this.addFilter.bind(this);

    }

    getIsActive() {
        const {isActive} = this.state;
        return isActive;
    }

    open() {
        const {selectedItemKey} = this.props;

        if (selectedItemKey) {
            this.setState({
                isActive: true
            });
            return;
        }

        this.setState({
            isActive: true,
            selectedItem: null
        });

    }

    close() {
        this.setState({
            isActive: false
        }, () => {
            const {onClose} = this.props;

            if (onClose) {
                onClose();
            }
        });
    }

    toggle() {
        const {isActive} = this.state;

        if (isActive) {
            this.close();
            return;
        }

        this.open();
    }

    selectItem(item) {

        this.setState({
            selectedItem: item
        });

        switch (item.type) {
            case pageType.TEXT: {

                break;
            }
        }
    }

    resetSelectedItem() {
        this.setState({
            selectedItem: null
        });
    }

    addFilter(form) {
        const {onAddFilter} = this.props;

        onAddFilter(form);

        this.close();

    }

    renderMain() {
        const {config, disableKeys} = this.props;
        const {items} = config;

        return <Main items={items} onSelect={this.selectItem} disableKeys={disableKeys} />;
    }

    renderText() {
        const {selectedItem} = this.state;
        const {selectedItemKey, initialValues} = this.props;

        if (!_pages[selectedItem.key]) {
            _pages[selectedItem.key] = Text(selectedItem.key);
        }

        const Textx = _pages[selectedItem.key];

        return <Textx {...selectedItem.config} onSubmit={this.addFilter} onBack={this.resetSelectedItem} isEdit={!!selectedItemKey} initialValues={initialValues} />;

    }

    renderMulti() {
        const {selectedItem} = this.state;
        const {selectedItemKey, initialValues} = this.props;

        const parsedInitialValues = {};

        if (selectedItemKey) {
            _.forEach(initialValues[selectedItemKey], v => parsedInitialValues[`_${v}`] = true);
        }

        if (!_pages[selectedItem.key]) {
            _pages[selectedItem.key] = Multi(selectedItem.key);
        }

        const Multix = _pages[selectedItem.key];

        return <Multix {...selectedItem.config} onSubmit={this.addFilter} onBack={this.resetSelectedItem} isEdit={!!selectedItemKey} initialValues={parsedInitialValues} />;
    }

    renderRadio() {
        const {selectedItem} = this.state;
        const {selectedItemKey, initialValues} = this.props;

        const parsedInitialValues = selectedItemKey ? {
            [selectedItem.key]: initialValues[selectedItem.key].toString()
        } : null;

        if (!_pages[selectedItem.key]) {
            _pages[selectedItem.key] = Radio(selectedItem.key);
        }

        const Radiox = _pages[selectedItem.key];

        return <Radiox {...selectedItem.config} onSubmit={this.addFilter} onBack={this.resetSelectedItem} isEdit={!!selectedItemKey} initialValues={parsedInitialValues} />;
    }

    renderWhen() {
        const {selectedItem} = this.state;
        const {selectedItemKey, initialValues} = this.props;

        const parsedInitialValues = selectedItemKey ? {
            [selectedItem.key]: initialValues[selectedItem.key]
        } : null;

        if (!_pages[selectedItem.key]) {
            _pages[selectedItem.key] = When(selectedItem.key);
        }

        const Whenx = _pages[selectedItem.key];

        return <Whenx {...selectedItem.config} onSubmit={this.addFilter} onBack={this.resetSelectedItem} isEdit={!!selectedItemKey} initialValues={parsedInitialValues} />;
    }


    renderSelectedItem() {

        const {selectedItem} = this.state;

        if (selectedItem === null) {
            return this.renderMain();
        }

        switch (selectedItem.type) {
            case pageType.TEXT: {
                return this.renderText();
            }
            case pageType.MULTI: {
                return this.renderMulti();
            }
            case pageType.RADIO: {
                return this.renderRadio();
            }
            case pageType.WHEN: {
                return this.renderWhen();
            }
        }


    }

    render() {
        const {children} = this.props;
        const {isActive} = this.state;

        return (
            <Popover isOpen={isActive} preferPlace="below" onOuterAction={this.close} body={<div className="advanced-filter-popup">{this.renderSelectedItem()}</div>} >
                {children}
            </Popover>
        );
    }
}

Popup.propTypes = {
    selectedItemKey: PropTypes.string,
    initialValues: PropTypes.object,
    children: PropTypes.object,
    config: PropTypes.object.isRequired,
    onAddFilter: PropTypes.func.isRequired,
    onClose: PropTypes.func,
    disableKeys: PropTypes.array
};

export default Popup;