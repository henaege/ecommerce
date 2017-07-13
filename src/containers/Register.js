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
      var city = event.target[2].value
      var state = event.target[3].value
      var accountType = event.target[4].value
      var userName = event.target[5].value
      var password = event.target[6].value
      var confirmPassword = event.target[7].value
      var salesRep = event.target[8].value
      this.props.registerAction({
          name: name,
          email: email,
          accountType: accountType,
          password: password,
          city: city,
          state: state,
          userName: userName,
          confirmPassword: confirmPassword,
          salesRep: salesRep
      })
  }

    render(){
        return(
            <div>
    <Col sm={6} smOffset={3} className="center-align register">
        <h2>Create an account:</h2>
        </Col>
            <Col xs={8} xsOffset={2}>
        <Form horizontal onSubmit={this.handleRegistration}>
            <FormGroup controlId="formHorizontalName">
            <Col componentClass={ControlLabel} sm={4}>
                Name
            </Col>
            <Col sm={8}>
                <FormControl type="text" placeholder="Full Name" />
            </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={4}>
                Email
            </Col>
            <Col sm={8}>
                <FormControl type="email" placeholder="Email" />
            </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalCity">
            <Col componentClass={ControlLabel} sm={4}>
                City
            </Col>
            <Col sm={8}>
                <FormControl type="text" placeholder="City" />
            </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalState">
            <Col componentClass={ControlLabel} sm={4}>
                State
            </Col>
            <Col sm={8}>
                <FormControl componentClass="select" placeholder="State">
                    <option value="None">Select...</option>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire></option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                </FormControl>
            </Col>
            </FormGroup>
            <FormGroup controlId="formAccountSelect">
            <Col componentClass={ControlLabel} sm={4}>
                Account Type
            </Col>
            <Col sm={8}>
                <FormControl componentClass="select" placeholder="formAccountSelect">
                    <option value="customer">Customer</option>
                    <option value="employee">Employee</option>
                </FormControl>    
            </Col>
            </FormGroup>

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

            <FormGroup controlId="formHorizontalPasswordConfirm">
            <Col componentClass={ControlLabel} sm={4}>
                Confirm Password
            </Col>
            <Col sm={8}>
                <FormControl type="password" placeholder="Confirm Password" />
            </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalsalesRep">
            <Col componentClass={ControlLabel} sm={4}>
                Sales Rep
            </Col>
            <Col sm={8}>
                <FormControl type="text" placeholder="Sales Rep" />
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