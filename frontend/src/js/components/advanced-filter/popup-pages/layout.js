'use strict';

import React from 'react';

export default (title, onBack, content) => (
    <div className="popup-page">
        {title ?
            (<div className="header">
                {onBack ?
                    (<a className="back-btn" onClick={e => {
                        e.preventDefault();
                        onBack();
                    } }>back</a>)
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