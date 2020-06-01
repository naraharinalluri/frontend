
import React, { Component } from 'react';
import './seatselect.css';
import axios from 'axios';
import $ from 'jquery';

export class ViewSeats extends Component {
    constructor(props) {
        super(props);

        this.state = {
            totalSeats: [...new Array(40)].map((item, index) => {
                return {
                    seatNo: index + 1,
                    selected: false
                }
            }),
            passenger_age: [],
            passenger_name: [],
            isConfirm: false,
            help: [],
            extra: [],
            bookedSeats: [3, 4],
            arr: [],
            res: [this.props.value]
        }
    }

    componentWillMount() {
        const data = this.state.res
        // console.log(data[0])
        axios.post('booking/seats', data[0])
            .then(result => {
                // console.log(result.data)
                this.setState({ extra: result.data });
            })
            .catch(err => {
                console.log(err)
            })
    }
    //-------------------------------------------------------------------------------------------------------------------
    isBookedSeat(seatNo) {
        return this.state.bookedSeats.includes(seatNo);
    }

    selectSeatHandler(seatNo) {
        const muteState = { ...this.state };
        console.log(muteState)

        if (!this.isBookedSeat(seatNo)) {
            muteState.totalSeats[seatNo - 1].selected = !muteState.totalSeats[seatNo - 1].selected;
            const selectedSeats = muteState.totalSeats.filter(item => item.selected).map((item => {
                return {
                    name: '',
                    age: '',
                    seatNo: item.seatNo
                }

            }));
            console.log(selectedSeats)
            this.setState({
                totalSeats: muteState.totalSeats,
                arr: selectedSeats
            })
            // if (!this.state.arr.includes(seatNo)) {
            //     this.setState({
            //         arr: [...this.state.arr, seatNo]
            //     })
            // }

            // else {
            //     const result = this.state.arr.filter(val => muteState.totalSeats[val - 1].selected);
            //     this.setState({
            //         arr: result
            //     })
            // }

        }
    }
    //-------------------------------------------------------------------------------------------------------------------
    handleSubmit = event => {
        this.setState({
            passenger_name: event.target.value
        })
        this.setState({
            passenger_age: event.target.value
        })
    }

    // fare = () => {
    //     let seatFare = (this.state.arr).length * this.state.error[0].service.fare
    //     return seatFare
    // }

    renderList = () => {
        return this.state.arr.map((item, idx) => {
            return (
                <div className="container" key={idx}>
                    <p>Seat No : {item.seatNo}</p>
                    <input type="text" placeholder="Name" name="name" onChange={(event) => this.onChangeHandler(event, item.seatNo)} /><br /><br />
                    <input type="text" placeholder="Age" name="age" onChange={(event) => this.onChangeHandler(event, item.seatNo)} /><br /><br />
                </div>
            )

        })
    }

    onChangeHandler = (event, seatNo) => {
        // this.setState({
        //     passenger_name: event.target.value
        // })
        const muteState = [...this.state.arr];
        muteState.map((item) => {
            if (seatNo == item.seatNo) {
                item[event.target.name] = event.target.value
            }
        });
        this.setState({
            arr: muteState
        })
        console.log(this.state.arr)

    }
    // onAgeChange = event => {
    //     this.setState({
    //         passenger_age: event.target.value
    //     })
    // }

    changeTab = (n) => {
        this.props.onTabChange()
    }

    showSeats = () => {
        const hi = [...this.state.extra[0].reservation.seats]
        this.state.help = hi.concat(this.state.bookedSeats)
        this.setState({
            bookedSeats: [... this.state.help],
            isConfirm: true
        })
    }

    render() {
        if (!this.state.isConfirm) {
            return (
                <div id="before" className="container">
                    <h3>PRESS CONTINUE TO SELECT YOUR SEATS</h3>
                    <button id="buttonCont" onClick={e => { e.preventDefault(); this.showSeats() }} className="btn btn-primary btn-md">Continue</button>
                </div>
            )
        } else {
            return (
                <div className="outerBox">
                    <div>
                        <div id="listBox" className="box">
                            <ul className="seats">
                                {
                                    this.state.totalSeats.map((item, index) => <li
                                        key={item.seatNo}
                                        onClick={() => this.selectSeatHandler(item.seatNo)}
                                        className={this.isBookedSeat(item.seatNo) ? 'bookedSeat' : item.selected ? 'selected' : ''}>
                                        {item.seatNo}
                                    </li>)
                                }
                            </ul><br />
                        </div>
                    </div>
                    <div id="bookingSummary" className="container">
                        {/* {this.renderArr()} */}
                        <h4>BOOKING SUMMARY</h4><br />
                        <h6>FROM : {this.state.extra[0].service.from} </h6>
                        <h6>TO : {this.state.extra[0].service.to} </h6>
                        <h6>BUS TYPE : {this.state.extra[0].busType} </h6>
                    </div>
                    <div id="passengerDetails" className="container">
                        <h4>PASSENGER DETAILS</h4><br />
                        {this.renderList()}
                    </div>
                    <div id="fareDetails" className="container">
                        <h4>FARE SUMMARY</h4><br />
                        <h6>TOTAL SEATS SELECTED : {(this.state.arr).length} </h6>
                        <h6>FARE : </h6>
                        <h6>SERVICE TAX : </h6>
                        <h6>TOTAL CHARGES : </h6><br />
                        <button className="btn btn-lg btn-primary" onClick={e => { e.preventDefault(); this.handleSubmit(); { this.changeTab(3) } }}>Proceed to Payment</button>
                    </div>
                </div>

            )
        }
    }
}