import React, {Component} from 'react'
import {Form, Col, Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap'

class Register extends Component{
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
    <div className="center-align register">
        <h2>Create an account:</h2>
            <Col xs={8} xsOffset={2}>
        <Form horizontal>
            <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
                Email
            </Col>
            <Col sm={10}>
                <FormControl type="email" placeholder="Email" />
            </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalEmail">
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

            <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
                Confirm Password
            </Col>
            <Col sm={10}>
                <FormControl type="password" placeholder="Confirm Password" />
            </Col>
            </FormGroup>

            <FormGroup>
            <Col smOffset={2} sm={10}>
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

export default Register