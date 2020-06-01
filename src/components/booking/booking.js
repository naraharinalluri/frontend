import React, { Component } from 'react';
import axios from 'axios';
// import AutoComplete from './AutoComplete';
import styles from './autocomplete.module.css'

class Booking extends Component {
    constructor(props) {
        super(props)
        this.items = [
            'Chennai',
            'Hyderabad',
            'Salem',
            'Vishakapatnam',
            'Coimbatore',
            'Bangalore',
            'Tirunelveli',
            'Kochi'
        ];
        this.state = {
            result: [],
            results: [],
            suggestions: [],
            suggestions2: [],
        }
    }
    changeTab = (n) => {
        this.props.onTabChange(2)
    }

    handleSubmit = e => {
        // const { text, text2 } = this.state;
        this.props.onSecondAdded(e)
        // console.log(e)
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
                                    <button onClick={e => { e.preventDefault(); this.handleSubmit(item.busNumber); { this.changeTab(2) } }} className="btn btn-sm btn-primary">SELECT SEATS</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        })
    }
    //------------------------------------------------------------------------------------------------------------------------------------
    dataField = React.createRef()
    dateField = React.createRef()

    onTextChanged = (e) => {
        const value = e.target.value;
        let suggestions = [];
        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = this.items.sort().filter(v => regex.test(v));
        }
        this.setState(() => ({ suggestions, text: value }));
    }
    onTexTChanged = (e) => {
        const value2 = e.target.value;
        let suggestions2 = [];
        if (value2.length > 0) {
            const regexx = new RegExp(`^${value2}`, 'i');
            suggestions2 = this.items.sort().filter(v => regexx.test(v));
        }
        this.setState(() => ({ suggestions2, text2: value2 }));
    }

    suggestionSelected(value) {
        this.setState(() => ({
            text: value,
            suggestions: [],
        }))

    }
    suggestionSelected2(value2) {
        this.setState(() => ({
            text2: value2,
            suggestions2: [],
        }))

    }

    renderSuggestions() {
        const { suggestions } = this.state;
        if (suggestions.length === 0) {
            return null;
        }
        return (
            <ul>
                {suggestions.map((item) => <li id={styles.li} onClick={() => this.suggestionSelected(item)}>{item}</li>)}
            </ul>
        );
    }
    renderSuggestions2() {
        const { suggestions2 } = this.state;
        if (suggestions2.length === 0) {
            return null;
        }
        return (
            <ul>
                {suggestions2.map((item2) => <li id={styles.li} onClick={() => this.suggestionSelected2(item2)}>{item2}</li>)}
            </ul>
        );
    }

    handleSearch = e => {
        if (!this.dateField.current.valueAsDate || !this.state.text || !this.state.text2) {
            this.dataField.current.innerText = "All Fields are Required"
        }
        else {
            this.dataField.current.innerText = ""
            console.log("All fine")
            this.dataSubmit();
        }
    }

    dataSubmit = () => {
        const data = this.state
        axios.post('/booking/search', data)
            .then(res => {
                // console.log(res.data)
                this.setState({ result: res.data });
                // this.props.onAdded(res.data)
            })

            .catch(err => {
                console.log(err)
            })
    }

    //------------------------------------------------------------------------------------------------------------------------------------
    render() {
        const { text, text2 } = this.state;
        return (
            <div id={styles.box} className="container">
                <div id={styles.autoCompText} className="container">
                    <div id={styles.form}>
                        <form>
                            <div ref={this.dataField} className="text-danger"></div>
                            <label className="badge badge-success">From</label>  <input id={styles.input} className="form-control" type="text" value={text} onChange={this.onTextChanged} placeholder="Origin" /><br />{this.renderSuggestions()}<br />
                            <label className="badge badge-danger">To</label>  <input id={styles.input} className="form-control" type="text" value={text2} onChange={this.onTexTChanged} placeholder="Destination" /><br />{this.renderSuggestions2()}<br /><br />
                            <label className="badge badge-warning">Date of Journey</label> <input ref={this.dateField} className="form-control" type="Date" /><br />
                            <button id={styles.button} type="submit" className="btn btn-primary  btn-md" onClick={e => { e.preventDefault(); this.handleSearch(e) }}>SEARCH</button>
                        </form>
                    </div>
                </div>
                <div id={styles.box2} className=" container">
                    {this.renderList()}
                </div>
            </div>
        );
    }
}

export default Booking;