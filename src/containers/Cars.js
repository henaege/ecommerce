import React, {Component} from 'react'
import {connect} from 'react-redux'
import $ from 'jquery'
import {Panel, Col, Grid, Row, Image} from 'react-bootstrap'
import {Link} from 'react-router-dom'

class Cars extends Component{
    constructor(props){
        super(props)
        this.state = {
			products: []
		}
    }


componentDidMount() {
		$.getJSON(window.hostAddress + '/products/get', (productData)=> {
			console.log(productData)
			this.setState({product: productData})
		})
	}

    render(){
        
    }

}