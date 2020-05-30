
import React, { Component } from 'react';
import './seatselect.css';
import axios from 'axios';

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
            bookedSeats: [],
            arr: [],
            res: [this.props.value]
        }
    }



    isBookedSeat(seatNo) {
        return this.state.bookedSeats.includes(seatNo);
    }

    selectSeatHandler(seatNo) {
        const muteState = { ...this.state };
        console.log(muteState)

        if (!this.isBookedSeat(seatNo)) {
            muteState.totalSeats[seatNo - 1].selected = !muteState.totalSeats[seatNo - 1].selected;
            this.setState({
                totalSeats: muteState.totalSeats,
            })
            if (!this.state.arr.includes(seatNo)) {
                this.setState({
                    arr: [...this.state.arr, seatNo]
                })
            }
            else {
                const result = this.state.arr.filter(val => muteState.totalSeats[val - 1].selected);
                this.setState({
                    arr: result
                })
                // console.log(result)
            }

        }
    }
    handleSubmit = e => {
        console.log(this.state.res)
    }

    render() {
        return (
            <div className="box">
                <ul className="seats">
                    {
                        this.state.totalSeats.map((item, index) => <li
                            key={item.seatNo}
                            onClick={() => this.selectSeatHandler(item.seatNo)}
                            className={this.isBookedSeat(item.seatNo) ? 'bookedSeat' : item.selected ? 'selected' : ''}>
                            {item.seatNo}
                        </li>)
                    }
                </ul>
                <button className="btn btn-md btn-dark" onClick={e => { e.preventDefault(); this.handleSubmit(e) }}>click</button>
            </div>
        )
    }
}