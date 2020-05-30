import React, { Component } from 'react';
import styles from './extra.module.css';

class Extra extends Component {
    render() {
        return (
            <div >
                <div className="list-group">
                    <span>TRAVLES <p id={styles.inline}>VLR TRAVLES</p></span>
                </div>
            </div>

        );
    }
}

export default Extra;

