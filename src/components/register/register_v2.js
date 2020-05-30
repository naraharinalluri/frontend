import React, { Component } from 'react';
import styles from './register.module.css'
import axios from 'axios';

class Register_v2 extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            c_password: '',
            mobile: '',
            dob: '',
            gender: ''
        }
    }

    nameField = React.createRef()
    emailField = React.createRef()
    passwordField = React.createRef()
    cPasswordField = React.createRef()
    mobileField = React.createRef()
    dobField = React.createRef()
    genderField = React.createRef()
    // button = React.createRef()
    emailPattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
    mobilePattern = /^\d{10,11}$/;

    onNameChange = event => {
        this.setState({
            name: event.target.value
        })
    }
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
    onConfirmPasswordChange = event => {
        this.setState({
            c_password: event.target.value
        })
    }
    onMobileChange = event => {
        this.setState({
            mobile: event.target.value
        })
    }
    onDobChange = event => {
        this.setState({
            dob: event.target.value
        })
    }
    onGenderChange = event => {
        this.setState({
            gender: event.target.value
        })
    }

    register() {
        const data = this.state

        axios.post("/register", data)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err)
            })

    }

    handleSubmit = e => {
        // Name Validation
        if (!this.state.name) {
            this.nameField.current.innerText = "Name Required"
            return
        }
        this.nameField.current.innerText = ""

        // Email Validation
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

        // Password Validation
        if (!this.state.password) {
            this.passwordField.current.innerText = "Password Required"
            return
        }
        this.passwordField.current.innerText = ""

        //Confim Password
        if (!this.state.c_password) {
            this.cPasswordField.current.innerText = "Password Required"
            return
        } else if (this.state.c_password !== this.state.password) {
            this.cPasswordField.current.innerText = "Passwords do not match"
            return
        }
        this.cPasswordField.current.innerText = ""

        // Mobile validation 
        if (!this.state.mobile) {
            this.mobileField.current.innerText = "Mobile Number Required"
            return
        }
        this.mobileField.current.innerText = ""

        if (!this.mobilePattern.test(this.state.mobile)) {
            this.mobileField.current.innerText = "Mobile Number Invalid"
            return
        }
        this.mobileField.current.innerText = ""

        // DOB Validation
        if (!this.state.dob) {
            this.dobField.current.innerText = "Date of Birth Required"
            return
        }
        this.dobField.current.innerText = ""

        //Gender Validation
        if (!this.state.gender) {
            this.genderField.current.innerText = "Gender Required"
            return
        }
        this.genderField.current.innerText = ""

        this.register();

        alert("You have successfully registered.Press OK to login");
        window.location.href = "/LoginPage";


    }


    render() {
        return (

            <div id={styles.formBody} className="row">
                <div id={styles.form} className="col-sm-4">
                    <h3>REGISTER</h3>
                    <form  ><br />
                        <input type="text" name="Name" className="form-control" placeholder="Name" value={this.state.name} onChange={this.onNameChange} />
                        <div ref={this.nameField} className="text-danger"></div>
                        <br />
                        <input type="email" name="email" className="form-control" placeholder="Email" value={this.state.email} onChange={this.onEmailChange} />
                        <div ref={this.emailField} className="text-danger"></div>
                        <br />
                        <input type="password" name="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.onPasswordChange} />
                        <div ref={this.passwordField} className="text-danger"></div>
                        <br />
                        <input type="password" className="form-control" placeholder="Confirm Password" value={this.state.c_password} onChange={this.onConfirmPasswordChange} />
                        <div ref={this.cPasswordField} className="text-danger"></div>
                        <br />
                        <input type="text" name="mobile" className="form-control" placeholder="Mobile No" value={this.state.mobile} onChange={this.onMobileChange} />
                        <div ref={this.mobileField} className="text-danger"></div>
                        <br />
                        <input type="date" name="dob" className="form-control" placeholder="DD/MM/YYYY" value={this.state.dob} onChange={this.onDobChange} />
                        <div ref={this.dobField} className="text-danger"></div>
                        <br />
                        <label>Gender</label>&nbsp;
                        <select className="form-control" value={this.state.gender} onChange={this.onGenderChange}>
                            <option value="">Select</option>
                            <option value="male">Male</option>
                            <option value="female" >Female</option>
                        </select>
                        <div ref={this.genderField} className="text-danger"></div><br />
                        <button ref={this.button} className="btn btn-dark btn-md" onClick={e => { e.preventDefault(); this.handleSubmit(e) }}  >Create Account</button><br /><br />
                        <span>Already a user? <a href="/login">Click Here</a></span>

                    </form>

                </div>
            </div>


        );
    }
}

export default Register_v2;