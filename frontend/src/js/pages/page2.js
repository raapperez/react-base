'use strict';

import React, { Component, PropTypes } from 'react';
import AdvancedFilter from '../components/advanced-filter';


class Page2Page extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>

                <div style={{marginTop: '50px', marginLeft: '50px', width: '1200px', marginRight: '50px'}}>
                    <AdvancedFilter />                
                </div>


            </div>
        );
    }
}

export default Page2Page;