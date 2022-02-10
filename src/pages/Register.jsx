import React, { Component } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'

class Register extends Component {
    state = {
        email: '',
        name: '',
        address: '',
        phone: '',
        password: '',
        password_confirmation: '',
        name_error: '',
        email_error: '',
        password_error: '',
        confirm_error: '',
        success: '',
        disaled: false,
    };

    formSubmit = (e) => {
        e.preventDefault();
        this.setState({
            name_error: '',
            email_error: '',
            password_error: '',
            confirm_error: '',
            message: '',
            disabled: true,
        });

        const data = {
            email: this.state.email,
            name: this.state.name,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation,
        }

        axios.post('/auth/register', data)
        .then(response => {
            this.setState({
                success: response.data.success,
            })
        })
        .catch(error => {
            console.log(error.response.data);
            if(error.response.data){
                const {response: {data: {email, name, password, password_confirmation}}} = error
                this.setState({
                    email_error: email,
                    name_error: name,
                    password_error: password,
                    confirm_error: password_confirmation,
                    disabled: false,
                });
            }
        });
    }

    alertSuccess = (message) => {
        return (
            <div className="alert alert-success" role="alert">
                {message}
            </div>
        )
    }

    alertError = (message) => {
        return (
            <div className="text-danger" role="alert">
                {message}
            </div>
        )
    }

    render() {
        if(localStorage.getItem('access_token')){
            return <Navigate to='/auth/profile'></Navigate>
        }

        let button = "";
        if(this.state.disabled){
            button = (
                <button type="submit" className="btn btn-primary btn-block" disabled>Register</button>
            );
        } else {
            button = (
                <button type="submit" className="btn btn-primary btn-block">Register</button>
            )
        }
 
        //Show error
        let success = "";
        let email_error = "";
        let password_error = "";
        let name_error = "";
        let confirm_error = "";

        if(this.state.success){
            success = this.alertSuccess(this.state.success);
        }

        if(this.state.email_error){
            email_error = this.alertError(this.state.email_error);
        }

        if(this.state.password_error){
            password_error = this.alertError(this.state.password_error);
        }

        if(this.state.name_error){
            name_error = this.alertError(this.state.name_error);
        }

        if(this.state.confirm_error){
            confirm_error = this.alertError(this.state.confirm_error);
        }

        return (
            <div><br></br>
                <div className='row'>
                    <div className='jumbotron col-lg-4 offset-lg-4'>
                        <h3 className='text-center'>Register</h3>

                        {success}

                        <form onSubmit={this.formSubmit}>
                            <div className="form-group">
                                <label>Email address</label> <p className='text-danger d-inline'> * </p>
                                <input type="email" className="form-control" placeholder="Enter email" name='email'
                                onChange={(e) => {this.setState({email: e.target.value})}}
                                />
                                {email_error}
                            </div>

                            <div className="form-group">
                                <label>Name</label> <p className='text-danger d-inline'> * </p>
                                <input type="text" className="form-control" placeholder="User Name" name='name'
                                onChange={(e) => {this.setState({name: e.target.value})}}
                                />
                                {name_error}
                            </div>

                            <div className="form-group">
                                <label>Address</label>
                                <input type="text" className="form-control" placeholder="Address" name='name'
                                onChange={(e) => {this.setState({address: e.target.value})}}
                                />
                                
                            </div>

                            <div className="form-group">
                                <label>Phone Number</label>
                                <input type="text" className="form-control" placeholder="Phone Number" name='name'
                                onChange={(e) => {this.setState({phone: e.target.value})}}
                                />

                            </div>

                            <div className="form-group">
                                <label>Password</label> <p className='text-danger d-inline'> * </p>
                                <input type="password" className="form-control" placeholder="Password" name='password'
                                onChange={(e) => {this.setState({password: e.target.value})}}
                                />
                                {password_error}
                            </div>

                            <div className="form-group">
                                <label>Confirm Password</label> <p className='text-danger d-inline'> * </p>
                                <input type="password" className="form-control" placeholder="Confirm Password" name='password_confirmation'
                                onChange={(e) => {this.setState({password_confirmation: e.target.value})}}
                                />
                                {confirm_error}
                            </div>

                            {/* <button type="submit" className="btn btn-primary btn-block">Register</button> */}
                            {button}
                            <Link to='/login'>Have an account?</Link>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register;
