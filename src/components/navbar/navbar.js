import React, { Component } from 'react';
import styles from './navbar.module.css'

class Navbar extends Component {
    render() {
        return (

            <div id={styles.navbar} className="container">
                <div id={styles.innerNav}>
                    <button className="btn btn-lg btn-warning">Logo</button>
                    <div id={styles.navbarMid}>
                        <input id={styles.searchBar} className="form-control form-control-md" type="text" placeholder="Search FAQs" />
                        <div id={styles.links} className="img-fluid">
                            <span><a id={styles.navButton} className="btn btn-md" href="/">BOOK</a></span>
                            <span><a id={styles.navButton} className="btn btn-md" href="/">OFFERS</a></span>
                            <span><a id={styles.navButton} className="btn btn-md" href="/">CONTACT</a></span>
                            <span><a id={styles.navButton} className="btn btn-md" href="/">FAQs</a></span>
                        </div>
                        <button className="btn btn-sm btn-light" href="/login">LOGIN</button>
                    </div>
                </div>
            </div>

        );
    }
}

export default Navbar;
