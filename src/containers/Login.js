import React, {Component} from 'react'
import {Form, Col, Checkbox, Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import LoginAction from '../actions/LoginAction'
import GetCart from '../actions/GetCart'

class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
          registerMessage: "",
            passwordError: null,
            userNameError: null,
            formError: false
        }
        this.handleLogin = this.handleLogin.bind(this)
    }


handleLogin(event){
      event.preventDefault()
      console.log("The user submitted the form")
      var userName = event.target[0].value
      var password = event.target[1].value
      var error = false;

      if(password.length == 0){
        var passwordError = "error"
        error = true
      } else {
        var passwordError = "null"
      }

      if (userName.length < 3){
        var userNameError = "error"
        error = true
      } else {
        var userNameError = "success"
      }

      if(error) {
        this.setState({
          formError: true,
          userNameError: userNameError,
          passwordError: passwordError
        })
      } else {
        this.props.loginAction({
          userName: userName,
          password: password
        })
      }
  }

  componentWillReceiveProps(nextProps) {
    console.log("=======================")
		console.log(nextProps.registerResponse)
		console.log("=======================")
    if(nextProps.registerResponse.msg === 'loginSuccess'){
      this.props.getCart(nextProps.registerResponse
      .token)
      this.props.history.push("/")
    } else if (nextProps.registerMessage === 'userExists'){
      console.log("User name taken!")
      this.setState({
        registerMessage: "Sorry, this user name is already taken."
      })
    }
  }

    render(){
        return(
    <div className="center-align login">
      <h2>{this.state.passwordError}</h2>
        <h2>Sign in:</h2>
            <Col xs={6} xsOffset={3} >
        <Form horizontal onSubmit={this.handleLogin}>
    <FormGroup controlId="formHorizontalUserName">
      <Col componentClass={ControlLabel} sm={4}>
        User Name
      </Col>
      <Col sm={8}>
        <FormControl type="text" placeholder="User Name" />
      </Col>
    </FormGroup>

    <FormGroup controlId="formHorizontalPassword">
      <Col componentClass={ControlLabel} sm={4}>
        Password
      </Col>
      <Col sm={8}>
        <FormControl type="password" placeholder="Password" />
      </Col>
    </FormGroup>

    <FormGroup className="center-align">
      <Col smOffset={4} sm={4}>
        <Checkbox>Remember me</Checkbox>
      </Col>
    </FormGroup>

    <FormGroup>
      <Col smOffset={4} sm={4}>
        <Button type="submit">
          Sign in
        </Button>
      </Col>
    </FormGroup>
  </Form>
  </Col>
  </div>
        )
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        loginAction: LoginAction,
        getCart: GetCart
    }, dispatch)
}

function mapStateToProps(state){
    return {
        registerResponse: state.registerReducer
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)