import React, { Component } from 'react';
import axios from 'axios';


class Dummy extends Component {


    componentDidMount = () => {
        axios.get("/google").then(response => {
            console.log(response.data);
        });

    };


    render() {
        return (
            <div>

            </div>
        );
    }
}

export default Dummy;