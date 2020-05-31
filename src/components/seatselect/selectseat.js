
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

    componentWillUpdate() {

        // const hi = [...this.state.extra[0].reservation.seats]
        // this.state.help = hi.concat(this.state.bookedSeats)
        // this.setState({
        //     bookedSeats: [... this.state.help]
        // })
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
        // console.log(this.state.extra[0].service.from)
        // this.setState({
        //     bookedSeats: [... this.state.bookedSeats, this.state.extra[0].reservation.seats]
        // })



        //     const data = this.state.res
        //     // console.log(data[0])
        //     axios.post('booking/seats', data[0])
        //         .then(result => {
        //             // console.log(result.data)
        //             this.setState({ extra: result.data[0] });
        //         })
        //         .catch(err => {
        //             console.log(err)
        //         })
        // console.log(this.state.extra.reservation.seats)
        const hi = [...this.state.extra[0].reservation.seats]
        this.state.help = hi.concat(this.state.bookedSeats)
        this.setState({
            bookedSeats: [... this.state.help]
        })
        // console.log(this.state.help)
        // this.setState({
        //     bookedSeats: this.state.extra.reservation.seats
        // })
        // const arr = Array.from(this.state.extra[0].reservation.seats);
        // arr.forEach(value => console.log(value)
        // )
        // const arr = [].slice.call(this.state.extra[0].reservation.seats)
        // console.log(arr)
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
                <div className="container">
                    <button onClick={e => { e.preventDefault(); this.showSeats() }} className="btn btn-primary btn-md">Continue</button>
                </div>
            )
        } else {
            return (
                <div>
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
                        {/* <button className="btn btn-md btn-dark" onClick={e => { e.preventDefault(); this.handleSubmit2(e) }}>clickq</button> */}
                        {/* <button className="btn btn-md btn-dark" onClick={e => { e.preventDefault(); this.handleSubmit(e) }}>click</button> */}
                    </div>
                </div>

            )
        }
    }
}