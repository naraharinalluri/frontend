

import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import Booking from '../booking/booking';
import styles from './tabs.module.css';
import { ViewSeats } from '../seatselect/selectseat';


const ItemTabs = () => {
    const [items, setItems] = useState([])
    const [tab, setTab] = useState(1)
    const renderTabPanel = (tab) => {
        switch (tab) {
            case 1: return (
                <div><Booking onSecondAdded={handleResult} /></div>
            )
            case 2: return (
                <div><ViewSeats value={items} /></div>
            )
            case 3: return (
                <div>Payments</div>
            )
            case 4: return (
                <div>Ticket Confirmation</div>
            )
            default: return null
        }
    }


    // item.reviews = reviews

    const changeTab = (e, tabIdx) => {
        e.preventDefault()
        setTab(tabIdx)
    }

    const handleResult = (res) => {
        setItems([...items, res])
    }

    return (
        <div>
            <ul id={styles.ul} className="nav nav-tabs">
                <li id={styles.list} className="nav-item">
                    <a id={styles.a1} className={`nav-link ${tab === 1 ? 'active' : ''}`} onClick={e => changeTab(e, 1)} href="#">Plan Your Travel</a>
                </li>
                <li id={styles.list} className="nav-item">
                    <a id={styles.a1} className={classnames('nav-link', { active: tab === 2 })} onClick={e => changeTab(e, 2)} href="#">Select Your Seats</a>
                </li>
                <li id={styles.list} className="nav-item">
                    <a id={styles.a1} className={classnames('nav-link', { active: tab === 3 })} onClick={e => changeTab(e, 3)} href="#">Payments</a>
                </li>
                <li id={styles.list} className="nav-item">
                    <a id={styles.a1} className={classnames('nav-link', { active: tab === 4 })} onClick={e => changeTab(e, 4)} href="#">Ticket Confirmation</a>
                </li>
            </ul>
            {renderTabPanel(tab)}

        </div>
    );
};

export default ItemTabs;