'use strict';

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Main from './popup-pages/main';
import Text from './popup-pages/text';
import Multi from './popup-pages/multi';
import Radio from './popup-pages/radio';
import When from './popup-pages/when';
import Popover from 'react-popover-fork';

import * as pageType from './popup-pages/page-type';

class Popup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isActive: false,
            selectedItem: null
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

            if(onClose) {
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
        const {config} = this.props;

        const {items} = config;

        return <Main items={items} onSelect={this.selectItem} />;

    }

    renderText() {
        const {selectedItem} = this.state;

        return <Text {...selectedItem.config} onSubmit={this.addFilter} onBack={this.resetSelectedItem} />;

    }

    renderMulti() {
        const {selectedItem} = this.state;

        return <Multi {...selectedItem.config} onSubmit={this.addFilter} onBack={this.resetSelectedItem} />;
    }

    renderRadio() {
        const {selectedItem} = this.state;

        return <Radio {...selectedItem.config} onSubmit={this.addFilter} onBack={this.resetSelectedItem} />;
    }

    renderWhen() {
        const {selectedItem} = this.state;

        return <When {...selectedItem.config} onSubmit={this.addFilter} onBack={this.resetSelectedItem} />;
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
    children: PropTypes.object,
    config: PropTypes.object.isRequired,
    onAddFilter: PropTypes.func.isRequired,
    onClose: PropTypes.func
};

export default Popup;