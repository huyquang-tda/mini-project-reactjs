import React, { Component } from 'react'
import { Link, Navigate} 
from 'react-router-dom'
import axios from 'axios'

class Login extends Component {
    state={
        email: '',
        password: '',
        remember: '',
        email_error: '',
        password_error: '',
        error: '',
        success: '',
    }

    //Submit
    formSubmit = (e) => {
        e.preventDefault();
        this.setState({
            email_error: '',
            password_error: '',
            error: '',
        })

        const data = {
            email: this.state.email,
            password: this.state.password,
        }

        axios.post('/auth/login', data)
        .then(response => {
            localStorage.setItem('access_token', response.data.access_token);
            this.props.setUser(response.data.user);
        })
        .catch((error) => {

            //Validation failed
            if(error.response.data){                                 
                const {response: {data: {email, password}}} = error;
                this.setState({
                    email_error: email,
                    password_error: password,
                })
            }

            //Login failed
            if(error.response.data.error){                                
                this.setState({error: error.response.data.error});
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

    //Resend email
    resend = (e) => {
        e.preventDefault();
        this.setState({
            error: '',
        })

        axios.get('/auth/email/resend?email=' + this.state.email)
        .then(response => {
          this.setState({
              success: response.data.success,
          })
        })
        .catch((error) => {
            this.setState({
                error: error.response.data,
            })
        });
    }

    render() {
        //After login redirect to Profile Page
        if(localStorage.getItem('access_token')){
            return <Navigate to='/profile'/>
        }

        //Resend verification email
        let resend = "";
        if(this.state.error === 'Email has not been verified'){
            resend = (
                <div>
                    <p>A verified email will be sent to your email</p>
                    <form onSubmit={this.resend}>
                    <button type='submit' className="btn btn-primary btn-block">Resend Email</button>
                    </form>
                </div>
            )
        }

        //Show error message
        let error = "";
        let email_error = "";
        let password_error = "";
        let success = "";

        if(this.state.error){
            error = this.alertError(this.state.error);
        }

        if(this.state.email_error){
            email_error = this.alertError(this.state.email_error);
        }

        if(this.state.password_error){
            password_error = this.alertError(this.state.password_error);
        }

        if(this.state.success){
            success = this.alertSuccess(this.state.success);
        }

        return (
            <div><br></br>
                <div className='row'>
                    <div className='jumbotron col-lg-4 offset-lg-4'>
                        <h3 className='text-center'>Login</h3>

                        {error}
                        {success}
                        {resend}

                        <form onSubmit={this.formSubmit}>
                            <div className="form-group">
                                <label>Email address</label>
                                <input type="email" name='email' className="form-control" placeholder="Enter email"
                                onChange={(e) => {this.setState({email: e.target.value})}}/>
                                {email_error}
                            </div>                           

                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" name='password' className="form-control" placeholder="Password"
                                onChange={(e) => {this.setState({password: e.target.value})}}/>
                                {password_error}
                            </div>

                            {/* <input type="checkbox" name="remember_me"/>
                            <label for="remember_me"> Remember me</label> */}
                            
                            <button type="submit" className="btn btn-primary btn-block">Login</button>
                            <Link to='/forget'>Forget Password </Link>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login
