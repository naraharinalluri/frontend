import React, { Component } from 'react';
import styles from './register.module.css'

class Register extends Component {

    name = React.createRef()
    nameField = React.createRef()
    email = React.createRef()
    emailField = React.createRef()
    password = React.createRef()
    passwordField = React.createRef()
    cpassword = React.createRef()
    cPasswordField = React.createRef()
    mobile = React.createRef()
    mobileField = React.createRef()
    dobField = React.createRef()
    dob = React.createRef()
    genm = React.createRef()
    genf = React.createRef()
    genderField = React.createRef()
    button = React.createRef()
    emailPattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
    mobilePattern = /^\d{10,11}$/;


    handleName = (e) => {
        if (!this.name.current.value) {
            this.nameField.current.innerText = "Name Required"
            return
        }
        this.nameField.current.innerText = ""
    }
    handleEmail = (e) => {

        if (!this.email.current.value) {
            this.emailField.current.innerText = "Email Required"
            return
        }
        this.emailField.current.innerText = ""

        if (!this.emailPattern.test(this.email.current.value)) {
            this.emailField.current.textContent = "Email is invalid"
            // console.log(this.email.current.value)
            return
        }
        this.emailField.current.textContent = ""
    }
    handlePassword = (e) => {
        if (!this.password.current.value) {
            this.passwordField.current.innerText = "Password Required"
            return
        }
        this.passwordField.current.innerText = ""
    }
    handleCpassword = (e) => {
        if (!this.cpassword.current.value) {
            this.cPasswordField.current.innerText = "Password Required"
        } else if (this.cpassword.current.value !== this.password.current.value) {
            this.cPasswordField.current.innerText = "Passwords do not match"
            return
        }
        this.cPasswordField.current.innerText = ""
    }
    handleMobile = (e) => {
        if (!this.mobile.current.value) {
            this.mobileField.current.innerText = "Mobile Number Required"
            return
        }
        this.mobileField.current.innerText = ""

        if (!this.mobilePattern.test(this.mobile.current.value)) {
            this.mobileField.current.innerText = "Mobile Number Invalid"
            return
        }
        this.mobileField.current.innerText = ""

    }
    handleDob = (e) => {

        if (!this.dob.current.value) {
            this.dobField.current.innerText = "Date of Birth Required"
            return
        }
        this.dobField.current.innerText = ""
    }
    handleRadio = (e) => {
        // console.log(this.genm.current.checked)
        if (this.genm.current.checked || this.genf.current.checked) {
            this.genderField.current.innerText = ""
            // this.button.current.disabled = false
            // console.log(this.button)

        } else {
            this.genderField.current.innerText = "Gender not selected"
        }

    }

    handleSubmit = e => {



        if (this.name.current.value) {
            if (this.emailPattern.test(this.email.current.value)) {
                if (this.password.current.value) {
                    if (this.cpassword.current.value === this.password.current.value) {
                        if (this.mobilePattern.test(this.mobile.current.value) && this.dob.current.value) {
                            if (this.genm.current.checked || this.genf.current.checked) {
                                alert("You have successfully registered. Press OK to Login");
                                // window.location.href = "/register";

                                console.log("success")
                            }
                        }
                    }
                }
            }
        } else {
            console.log("Izz out bruh")
        }

    }

    render() {
        return (

            <div id={styles.formBody} className="row">
                <div id={styles.form} className="col-sm-4">
                    <h3>REGISTER</h3>
                    <form method="POST" action="/register" ><br />
                        <input ref={this.name} onBlur={e => this.handleName(e)} type="text" name="Name" className="form-control" placeholder="Name" />
                        <div ref={this.nameField} className="text-danger"></div>
                        <br />
                        <input ref={this.email} onBlur={e => this.handleEmail(this.email)} type="email" name="email" className="form-control" placeholder="Email" />
                        <div ref={this.emailField} className="text-danger"></div>
                        <br />
                        <input ref={this.password} onBlur={e => this.handlePassword(this.password)} type="password" name="password" className="form-control" placeholder="Password" />
                        <div ref={this.passwordField} className="text-danger"></div>
                        <br />
                        <input ref={this.cpassword} onBlur={e => this.handleCpassword(this.cpassword)} type="password" className="form-control" placeholder="Confirm Password" />
                        <div ref={this.cPasswordField} className="text-danger"></div>
                        <br />
                        <input ref={this.mobile} onBlur={e => this.handleMobile(this.mobile)} type="text" name="mobile" className="form-control" placeholder="Mobile No" />
                        <div ref={this.mobileField} className="text-danger"></div>
                        <br />
                        <input ref={this.dob} onBlur={e => this.handleDob(this.dob)} type="date" name="dob" className="form-control" placeholder="DD/MM/YYYY" />
                        <div ref={this.dobField} className="text-danger"></div>
                        <br />
                        <input ref={this.genm} onClick={e => this.handleRadio(e)} type="radio" id="male" name="gender" value="male" />
                        <label htmlFor="male">Male</label>&nbsp;&nbsp;&nbsp;&nbsp;
                        {/* <div ref={this.genderField} className="text-danger"></div> */}
                        <input ref={this.genf} onClick={e => this.handleRadio(e)} type="radio" id="female" name="gender" value="female" />
                        <label htmlFor="female">Female</label><br /><br />
                        <div ref={this.genderField} className="text-danger"></div>
                        <button ref={this.button} className="btn btn-dark btn-md" onClick={e => { e.preventDefault(); this.handleSubmit(e) }}  >Create Account</button><br /><br />
                        <span>Already a user? <a href="/login">Click Here</a></span>

                    </form>

                </div>
            </div>


        );
    }
}

export default Register;