import React, { Component } from 'react';
import styles from './login.module.css'
import axios from 'axios';



class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {

            email: '',
            password: '',
        }
    }

    emailField = React.createRef()
    passwordField = React.createRef()
    emailPattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/

    onEmailChange = event => {
        this.setState({
            email: event.target.value
        })
    }
    onPasswordChange = event => {
        this.setState({
            password: event.target.value
        })
    }

    login() {

        const dataa = this.state
        axios.post('/login', dataa)
            .then(res => res.data)
            .then(data => {
                let { token } = data
                sessionStorage.setItem('authToken', token)
                window.location.href = "/loginSuccessful";

            })
            .catch(err => {
                console.log(err)
            })
    }


    handleSubmit = e => {


        if (!this.state.email) {
            this.emailField.current.innerText = "Email Required"
            return
        }
        this.emailField.current.innerText = ""

        if (!this.emailPattern.test(this.state.email)) {
            this.emailField.current.textContent = "Email is invalid"
            return
        }
        this.emailField.current.textContent = ""

        if (!this.state.password) {
            this.passwordField.current.innerText = "Password Required"
            return
        }
        this.passwordField.current.innerText = ""
        if (this.emailPattern.test(this.state.email) && this.state.password) {

            console.log("All good")
            this.login()





        }

    }


    render() {

        return (
            <div>
                <div id={styles.navbar} className="container">
                    <div id={styles.innerNav}>
                        <button id={styles.navButton} className="btn btn-lg">Logo</button>
                        <div id={styles.navbarMid}>
                            <input id={styles.searchBar} className="form-control form-control-md" type="text" placeholder="Search FAQs" />
                            <div id={styles.links} className="img-fluid">
                                <span><a id={styles.navButton} className="btn btn-md" href="/">BOOK</a></span>
                                <span><a id={styles.navButton} className="btn btn-md" href="/">OFFERS</a></span>
                                <span><a id={styles.navButton} className="btn btn-md" href="/">CONTACT</a></span>
                                <span><a id={styles.navButton} className="btn btn-md" href="/">FAQs</a></span>
                            </div>

                            <button id={styles.navButton} className="btn btn-sm " href="/">REGISTER</button>

                        </div>
                    </div>
                </div>

                <hr />
                <div id={styles.formBody} className="row">
                    <div id={styles.form} className="col-sm-4">
                        <h3>LOGIN</h3>

                        <input type="email" className="form-control" placeholder="Email" value={this.state.email} onChange={this.onEmailChange} />
                        <div ref={this.emailField} className="text-danger"></div>
                        <br />
                        <input type="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.onPasswordChange} />
                        <div ref={this.passwordField} className="text-danger"></div>
                        <br />
                        <button className="btn btn-primary btn-md" onClick={e => { e.preventDefault(); this.handleSubmit(e) }} >LOG IN</button><br /><br />
                        <span> New user? <a href="/">Click Here</a></span><br />





                    </div>
                </div>
            </div>
        );
    }
}

export default Login;