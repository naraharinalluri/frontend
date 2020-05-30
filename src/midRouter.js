import React, { Component } from 'react';
import Navbar from './components/navbar/navbar';
// import Register from './components/register/register';
import Register_v2 from './components/register/register_v2';
import styles from './mid.module.css';

class Index extends Component {

    render() {
        return (
            <div id={styles.box}>
                <Navbar />
                <hr />
                <Register_v2 />
            </div>
        );
    }
}

export default Index;