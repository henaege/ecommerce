import React, {Component} from 'react'
import {connect} from 'react-redux'
import $ from 'jquery'
import {Panel, Col, Grid, Row, Image, Table} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import ProductTableRow from '../components/ProductTableRow'
import Sort from 'react-icons/lib/fa/sort'
import {bindActionCreators} from 'redux'
import UpdateCart from '../actions/UpdateCart'

class ProductLine extends Component{
    constructor(props){
        super(props)
        this.state = {
			productList: [],
			whichWay: true
		}
		this.sortTable = this.sortTable.bind(this)
		this.getProducts = this.getProducts.bind(this)
    }

componentWillReceiveProps(nextProps){
	this.getProducts(nextProps)
	console.log(nextProps)		
	}


componentDidMount() {
	this.getProducts(this.props)
	}

getProducts(props) {
		const pl = props.match.params.productline
	console.log(pl)
		$.getJSON(window.hostAddress + `/productlines/${pl}/get`, (productData)=> {
			this.setState({
				productList: productData
			})
		})
}

	sortTable(columnName){
		var productList = this.state.productList.slice()

		productList.sort((a, b)=> {
		var textA = a[columnName];
		var textB = b[columnName];
		if (this.state.whichWay){
			return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
		} else {
		return (textA < textB) ? 1 : (textA > textB) ? -1 : 0;
		}
	});
	this.setState({
		productList: productList,
		whichWay: !this.state.whichWay
	})
	}

    render(){

		// console.log(this.props.loginInfo)
		// Check to see if msg="loginSuccess". If so, they are logged in; Let the productTableRow Know. If Not, send appropriate props

		if (this.props.loginInfo.token != undefined) {
			var loggedIn = true
			var token = this.props.loginInfo.token
		} else {
			var loggedIn = false
			var token = null
		}

		var productTableArray = []
		this.state.productList.map((product, index)=> {
			var title = product.productLine
			productTableArray.push(<ProductTableRow
				key={index} 
				product={product}
				addToCart={this.props.updateCart}
				loggedIn={loggedIn}
				token={token}/>
			)
		})

		if(this.state.productList.length == 0){
			var textHeader = ""
		} else {
			var textHeader = this.state.productList[0].productLine
		}

        return(
			<div>
			<h1 className="title">{textHeader}</h1>
			<div className="container-fluid product-table">
			{/*<Table striped bordered hover condensed responsive>
				<thead>
					<th className="table-head" onClick={()=>{this.sortTable("name")}}>Product Name<Sort /></th>
					<th className="table-head" onClick={()=>{this.sortTable("scale")}}>Model Scale<Sort /></th>
					<th className="table-head" onClick={()=>{this.sortTable("vendor")}}>Made By<Sort /></th>
					<th className="table-head" onClick={()=>{this.sortTable("description")}}>Description<Sort /></th>
					<th className="table-head" onClick={()=>{this.sortTable("stock")}}>Stock Status<Sort /></th>
					<th className="table-head" onClick={()=>{this.sortTable("buyPrice")}}>Your Price<Sort /></th>
					<th className="table-head" onClick={()=>{this.sortTable("MSRP")}}>MSRP<Sort /></th>
				</thead>
				<tbody>{productTableArray}</tbody>
			</Table>*/}
			{productTableArray}
			</div>
			</div>
		)
    }

}

function mapStateToProps(state){
	return {
		loginInfo: state.registerReducer
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		updateCart: UpdateCart
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductLine)