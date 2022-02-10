import React, { Component } from 'react'
import { Navigate } from 'react-router';
class Profile extends Component {
    render() {
        let name;
        let email;
        if(this.props.user){
            name = this.props.user.name;
            email = this.props.user.email;
        }
        if(!localStorage.getItem('access_token')){
            return <Navigate to='/login' />
        }

        return (
            <div><br></br>
                <div className='row'>
                    <div className='jumbotron col-lg-4 offset-lg-4'>
                        <h3 className='text-center'>User Profile</h3>
                        <ul className="list-group">
                            <li className="list-group-item">Name: {name} </li>
                            <li className="list-group-item">Email: {email} </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile
