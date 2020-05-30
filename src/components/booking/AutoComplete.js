import React, { Component } from 'react';
import axios from 'axios';
import styles from './autocomplete.module.css'


class AutoComplete extends Component {
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
            results: [],
            suggestions: [],
            suggestions2: []
        }
    }

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

    handleSubmit = e => {
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
                this.props.onAdded(res.data)
            })

            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const { text, text2 } = this.state;
        return (
            <div id={styles.autoCompText} className="container">
                <div id={styles.form}>
                    <form>
                        <div ref={this.dataField} className="text-danger"></div>
                        <label className="badge badge-success">From</label>  <input id={styles.input} className="form-control" type="text" value={text} onChange={this.onTextChanged} placeholder="Origin" /><br />{this.renderSuggestions()}<br />
                        <label className="badge badge-danger">To</label>  <input id={styles.input} className="form-control" type="text" value={text2} onChange={this.onTexTChanged} placeholder="Destination" /><br />{this.renderSuggestions2()}<br /><br />
                        <label className="badge badge-warning">Date of Journey</label> <input ref={this.dateField} className="form-control" type="Date" /><br />
                        <button id={styles.button} type="submit" className="btn btn-primary  btn-md" onClick={e => { e.preventDefault(); this.handleSubmit(e) }}>SEARCH</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default AutoComplete;