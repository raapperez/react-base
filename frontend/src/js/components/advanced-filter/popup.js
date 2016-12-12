'use strict';

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Main from './popup-pages/main';
import Text from './popup-pages/text';
import Multi from './popup-pages/multi';

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
        const {popup} = this.refs;

        this.setState({
            isActive: true,
            selectedItem: null
        }, () => {
            popup.focus();
        });

    }

    close() {
        this.setState({
            isActive: false
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
        }


    }

    render() {

        const {isActive} = this.state;

        return (
            <div className={classNames('popup', { active: isActive })} ref="popup">

                <div className="close" onClick={this.close}></div>

                <div className="top-triangle"></div>

                {this.renderSelectedItem()}

            </div>
        );
    }
}

Popup.propTypes = {
    config: PropTypes.object.isRequired,
    onAddFilter: PropTypes.func.isRequired
};

export default Popup;