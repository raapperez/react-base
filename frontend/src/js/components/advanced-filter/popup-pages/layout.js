'use strict';

import React from 'react';

export default (title, onBack, backBtn, content) => (
    <div className="popup-page">
        {title ?
            (<div className="header">
                {onBack ?
                    (<a className="back-btn" onClick={e => {
                        e.preventDefault();
                        onBack();
                    } }>{backBtn}</a>)
                    : null
                }

                <span className="title">{title}</span>
            </div>)
            : null
        }
        <div className="content">
            {content}
        </div>
    </div>
);