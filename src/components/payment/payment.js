import React, { Component } from 'react';
import styles from './payment.module.css';

class Payment extends Component {
    render() {
        return (
            <div id={styles.box} className="container">
                <div id={styles.summary}>
                    <p>Amount : ₹</p>
                    <p>Transaction ID :4595766 </p>
                </div><br />
                <table id={styles.table} className="table" >
                    <tr>
                        <td>Card Type</td>
                        <td>
                            <input type="radio" name="red" />&nbsp;&nbsp;<label>Visa</label>&nbsp;&nbsp;
                            <input type="radio" name="red" />&nbsp;&nbsp;<label>Master Card</label>
                        </td>
                    </tr>
                    <tr>
                        <td>Card Number</td>
                        <td>
                            <input type="text" />
                        </td>
                    </tr>
                    <tr>
                        <td>Name on Card</td>
                        <td>
                            <input id={styles.name} type="text" />
                        </td>
                    </tr>
                    <tr>
                        <td>CVV</td>
                        <td>
                            <input id={styles.cvv} type="text" />
                        </td>
                    </tr>
                    <tr>
                        <td>Expiry Date</td>
                        <td>
                            <input id={styles.cvv} type="month" />
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <button className="btn btn-md btn-success">Pay Now</button>&nbsp;&nbsp;&nbsp;
                            <button className="btn btn-md btn-danger">Cancel</button>
                        </td>
                    </tr>
                </table>
            </div>
        );
    }
}

export default Payment;