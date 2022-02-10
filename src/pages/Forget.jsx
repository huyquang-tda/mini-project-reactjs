import React, { Component } from 'react'
import axios from 'axios';

class Forget extends Component {
    state = {
        email: '',
        success: '',
        email_error: '',
        error: '',
        disabled: false,
    }

    formSubmit = (e) => {
        e.preventDefault();
        this.setState({
            error: '',
            success: '',
            email_error: '',
            disabled: true,
        })

        const data = {
            email: this.state.email,
        }

        axios.post('auth/password/forgot', data)
        .then(response => {
            this.setState({
                success: response.data.success,                                                                                          
            });
            document.getElementById("forgetform").reset();
        })
        .catch(error => {

            if(error.response.data){                                         
                this.setState({
                    email_error: error.response.data.email,
                    error: error.response.data.error,
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
        //Show error message
        let email_error = "";
        let success = "";
        let error = "";

        if(this.state.email_error){
            email_error = this.alertError(this.state.email_error)
        }

        if(this.state.error){
            error = this.alertError(this.state.error)
        }

        if(this.state.success){
            success = this.alertSuccess(this.state.success)
        }

        //Disable button
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

        return (
            <div><br></br>
                <div className='row'>
                    <div className='jumbotron col-lg-4 offset-lg-4'>
                        <h3 className='text-center'>Forget Password</h3>
                        <form onSubmit={this.formSubmit} id="forgetform">

                            {success}
                            {error}

                            <div className="form-group">
                                <label>Email address</label>
                                <input type="email" className="form-control" name='email' placeholder="Enter email"
                                onChange = {(e) => {this.setState({email: e.target.value})}}
                                />
                                {email_error}
                            </div>

                            {button}
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Forget
