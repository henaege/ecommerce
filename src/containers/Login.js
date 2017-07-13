import React, {Component} from 'react'
import {Form, Col, Checkbox, Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap'

class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            value: ''
        }
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
    render(){
        return(
    <div className="center-align login">
        <h2>Sign in:</h2>
            <Col xs={6} xsOffset={3} >
        <Form horizontal>
    <FormGroup controlId="formHorizontalEmail">
      <Col componentClass={ControlLabel} sm={2}>
        Email
      </Col>
      <Col sm={10}>
        <FormControl type="email" placeholder="Email" />
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

export default Login