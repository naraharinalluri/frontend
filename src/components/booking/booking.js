import React, { Component } from 'react';
import axios from 'axios';
import AutoComplete from './AutoComplete';
import styles from './autocomplete.module.css'

class Booking extends Component {
    constructor(props) {
        super(props)
        this.state = {
            result: []
        }
    }

    handleResult = (res) => {
        // console.log(res)
        this.setState({ result: res });
        console.log(this.state.result)
    }
    handleSubmit = e => {
        this.props.onSecondAdded(this.state.result)
    }




    renderList = () => {
        return this.state.result.map((item, idx) => {

            return (
                <div key={idx}>
                    <table id={styles.row} className="table table-hover">
                        <thead >
                            <tr >
                                <th scope="col">Travels</th>
                                <th scope="col">Bus Type</th>
                                <th scope="col">From</th>
                                <th scope="col">To</th>
                                <th scope="col">Departure Time</th>
                                <th scope="col">Arrival Time</th>
                                <th scope="col">Fare (₹)</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>{item.travels}</td>
                                <td>{item.busType}</td>
                                <td>{item.service.from}</td>
                                <td>{item.service.to}</td>
                                <td>{item.service.dep}</td>
                                <td>{item.service.arr}</td>
                                <td>{item.service.fare}</td>
                                <td className="text-right">
                                    <button onClick={e => { e.preventDefault(); this.handleSubmit(e) }} className="btn btn-sm btn-primary">SELECT SEATS</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        })
    }






    render() {

        return (
            <div id={styles.box} className="container">
                <AutoComplete onAdded={this.handleResult} />
                <div id={styles.box2} className=" container">
                    {this.renderList()}
                </div>
            </div>
        );
    }
}

export default Booking;