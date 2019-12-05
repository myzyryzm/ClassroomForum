import React, { Component } from 'react'
import {Link, Redirect} from "react-router-dom"
import {connect} from "react-redux"
import PropTypes from 'prop-types'
import {register} from "../../actions/auth"
import {createMessage} from "../../actions/messages"

class Register extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            password2: ''
        }
    }

    onChange = e => {
        this.setState({[e.target.name]: [e.target.value]})
    }

    onSubmit = e => {
        e.preventDefault();
        const {password, password2, username, email} = this.state
        let nuPas = password[0]
        let nuPas2 = password2[0]
        let nuUsr = username[0]
        let nuEmail = email[0]
        if(nuPas !== nuPas2){
            this.props.createMessage({passwordNotMatch: 'Passwords Do Not Match'})
        } else {
            const newUser = {
                "username": nuUsr,
                "password": nuPas,
                "email": nuEmail,
            }
            this.props.register(newUser)
        }
    }

    render() {
        if(this.props.isAuthenticated){
            return <Redirect to= "/" />
        }
        const{username, email, password, password2} = this.state
        return (
            <div className = "col-md-6 m-auto">
                <div className="card card-body mt-5">
                <h2 className = "text-center">Register</h2>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                    <label>Username</label>
                    <input
                        className="form-control"
                        type="text"
                        name="username"
                        onChange={this.onChange}
                        value={username}
                    />
                    </div>
                    <div className="form-group">
                    <label>Email</label>
                    <input
                        className="form-control"
                        type="email"
                        name="email"
                        onChange={this.onChange}
                        value={email}
                    />
                    </div>
                    <div className="form-group">
                    <label>Password</label>
                    <input
                        className="form-control"
                        type="password"
                        name="password"
                        onChange={this.onChange}
                        value={password}
                    />
                    </div>
                    <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                        className="form-control"
                        type="password"
                        name="password2"
                        onChange={this.onChange}
                        value={password2}
                    />
                    </div>
                    <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Register
                    </button>
                    </div>
                    <p>
                        Already have an account?
                        <Link to = "/login">Login</Link>
                    </p>
                </form>
                </div>
            </div>
          );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {register, createMessage})(Register)
