import React, { useState } from 'react';
import classnames from 'classnames';


const Itemtabs2 = () => {
    const [tab, setTab] = useState(1)

    const renderTabPanel = (tab, item) => {
        switch (tab) {
            case 1: return (
                <div></div>
            )
            case 2: return (
                <div></div>
            )
            case 3: return (
                <div></div>
            )
            default: return null
        }
    }

    const changeTab = (e, tabIdx) => {
        e.preventDefault()
        setTab(tabIdx)
    }

    return (
        // <div className="container">
        //     <ul className="nav nav-tabs">
        //         <li className="nav-item">
        //             <a className={`nav-link ${tab === 1 ? 'active' : ''}`} onClick={e => changeTab(e, 1)} href="/">Bus Booking</a>
        //         </li>
        //         <li className="nav-item">
        //             <a className={classnames('nav-link', { active: tab === 2 })} onClick={e => changeTab(e, 2)} href="/">Seat Selection</a>
        //         </li>
        //         <li className="nav-item">
        //             <a className={classnames('nav-link', { active: tab === 3 })} onClick={e => changeTab(e, 3)} href="/">Payment</a>
        //         </li>
        //     </ul>
        //     {renderTabPanel(tab)}
        // </div>
        <div className="container">
            <ul>
                <li>
                    Hello
                </li>
            </ul>
        </div>
    );
};

export default Itemtabs2;