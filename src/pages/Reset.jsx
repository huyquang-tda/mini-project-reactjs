import React, { Component } from 'react'
import axios from 'axios';
import { Navigate } from 'react-router-dom';

class Reset extends Component {
    state = {
        email: '',
        token: '',
        password: '',
        password_confirmation: '',
        email_error: '',
        password_error: '',
        confirm_error: '',
        error: '',
    }

    componentDidMount = () =>{
        const queryParams = new URLSearchParams(window.location.search);
        this.setState({
            email: queryParams.get('email'),
            token: queryParams.get('token'),
        });
    }
    
    formSubmit = (e) => {
        e.preventDefault();
        this.setState({
            email_error: '',
            password_error: '',
            confirm_error: '',
            token_error: '',
            error: '',
            success: '',
        });

        const data = {
            email: this.state.email,
            token: this.state.token,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation,
        }

        axios.post('auth/password/reset', data)
        .then((response) => {
            this.setState({
                success: response.data.success,
            });
            document.getElementById("resetform").reset();
        })
        .catch((error) => {
            console.log(error.response)
            if(error.response.data){
                const {response: {data: {email, token, password, password_confirmation}}} = error
                this.setState({
                    email_error: email,
                    token: token,
                    password_error: password,
                    confirm_error: password_confirmation,
                });
            }
            this.setState({error: error.response.data.error});
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
        if(this.state.success){
            return <Navigate to='/login'/>
        }
        let error = "";
        let email_error = "";
        let password_error = "";
        let confirm_error = "";

        if(this.state.error){
            error = this.alertError(this.state.error)
        }

        if(this.state.email_error){
            email_error = this.alertError(this.state.email_error)
        }
        
        if(this.state.password_error){
            password_error = this.alertError(this.state.password_error)
        }

        if(this.state.confirm_error){
            confirm_error = this.alertError(this.state.confirm_error)
        }

        return (
            <div><br></br>
                <div className='row'>
                    <div className='jumbotron col-lg-4 offset-lg-4'>
                        <h3 className='text-center'>Reset Password</h3>

                        {error}
                        <form onSubmit={this.formSubmit} id='resetform'>
                            <div className="form-group">
                                <label>Email address</label> <p className='text-danger d-inline'> * </p>
                                <input type="email" className="form-control" placeholder="Enter email" name='email' value={this.state.email}
                                onChange={(e) => {this.setState({email: e.target.value})}}
                                />
                                {email_error}
                            </div>

                            <div className="form-group">
                                <label>New Password</label> <p className='text-danger d-inline'> * </p>
                                <input type="password" className="form-control" placeholder="Password" name='password'
                                onChange={(e) => {this.setState({password: e.target.value})}}
                                />
                                {password_error}
                            </div>

                            <div className="form-group">
                                <label>Confirm Password</label> <p className='text-danger d-inline'> * </p>
                                <input type="password" className="form-control" placeholder="Confirm Password" name='confirm_password'
                                onChange={(e) => {this.setState({password_confirmation: e.target.value})}}
                                />
                                {confirm_error}
                            </div>

                            <button type="submit" className="btn btn-primary btn-block">Reset</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Reset
