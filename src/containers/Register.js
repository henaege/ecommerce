import React, {Component} from 'react'
import {Form, Col, Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap'
import {bindActionCreators} from 'redux'
import RegisterAction from '../actions/RegisterAction'
// Because this is a container we need Connect from react-redux!
import {connect} from 'react-redux'

class Register extends Component{
    constructor(props){
        super(props)
        this.state = {
            value: ''
        }
        this.handleRegistration = this.handleRegistration.bind(this)
    }

  getValidationState() {
    const length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
    
  }

  handleRegistration(event){
      event.preventDefault()
      console.log("The user submitted the form")
      var name = event.target[0].value
      var email = event.target[1].value
      var accountType = event.target[2].value
      var userName = event.target[3].value
      var password = event.target[4].value
      var confirmPassword = event.target[5].value
      this.props.registerAction()
  }

    render(){
        return(
            <div>
    <Col sm={8} smOffset={2} className="center-align register">
        <h2>Create an account:</h2>
        </Col>
            <Col xs={8} xsOffset={2}>
        <Form horizontal onSubmit={this.handleRegistration}>
            <FormGroup controlId="formHorizontalName">
            <Col componentClass={ControlLabel} sm={2}>
                Name
            </Col>
            <Col sm={10}>
                <FormControl type="text" placeholder="Full Name" />
            </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
                Email
            </Col>
            <Col sm={10}>
                <FormControl type="email" placeholder="Email" />
            </Col>
            </FormGroup>
            <FormGroup controlId="formAccountSelect">
            <Col componentClass={ControlLabel} sm={2}>
                Account Type
            </Col>
            <Col sm={10}>
                <FormControl componentClass="select" placeholder="formAccountSelect">
                    <option value="customer">Customer</option>
                    <option value="employee">Employee</option>
                </FormControl>    
            </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalUserName">
            <Col componentClass={ControlLabel} sm={2}>
                User Name
            </Col>
            <Col sm={10}>
                <FormControl type="text" placeholder="User Name" />
            </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
                Password
            </Col>
            <Col sm={10}>
                <FormControl type="password" placeholder="Password" />
            </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPasswordConfirm">
            <Col componentClass={ControlLabel} sm={2}>
                Confirm Password
            </Col>
            <Col sm={10}>
                <FormControl type="password" placeholder="Confirm Password" />
            </Col>
            </FormGroup>

            <FormGroup>
            <Col sm={4} smOffset={4} className="center-align">
                <Button type="submit">
                Register
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
            registerAction: RegisterAction
        }, dispatch)
    }

export default connect(null, mapDispatchToProps)(Register)