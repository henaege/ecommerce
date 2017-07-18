import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import $ from 'jquery'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'
import {connect} from 'react-redux'
import Cart from 'react-icons/lib/fa/shopping-cart'

class NavBar extends Component{
	constructor(props){
		super(props)
		this.state = {
			productlines: []
		}
	}

	componentDidMount() {
		$.getJSON(window.hostAddress + '/productlines/get', (productlinesData)=> {
			// console.log(productlinesData)
			this.setState({productlines: productlinesData})
		})
	}

  render(){
		const shopMenu = []
		this.state.productlines.map((pl, index)=>{
			shopMenu.push(
				<MenuItem key={index} eventKey={index}><Link to={`/shop/${pl.link}`}>{pl.productLine}</Link></MenuItem>
			)
		})

		if(this.props.registerInfo.name === undefined){
			var rightBar = [
				
					<NavItem eventKey={1}>
						<Link to="/login">Sign in</Link>
							</NavItem>,
							<NavItem eventKey={2}>
								<Link to="/register">Register</Link>
							</NavItem>,
							<NavItem eventKey={3}>
								<Link to="/cart"><Cart size={24} /></Link> 0 items | $0
							</NavItem>
			]
		} else {
			var rightBar = [
							<NavItem eventKey={1}>
								Welcome, {this.props.registerInfo.name}
							</NavItem>,
						
							<NavItem eventKey={3}>
								<Link to="/logout">Log Out</Link>
							</NavItem>,
							<NavItem eventKey={2}>
								<Link to="/cart"><Cart size={24} /></Link>(0)
							</NavItem>
						]
		}

    return(
    	<div>
				<Navbar inverse collapseOnSelect fixedTop>
					<Navbar.Header>
						<Navbar.Brand>
							<Link to="/">ClassicModels</Link>
						</Navbar.Brand>
						<Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>
						<Nav>
							<NavItem eventKey={1}>
								<Link to="/about">About Us</Link>
							</NavItem>
							<NavItem eventKey={2}>
								<Link to="/contact">Contact Us</Link>
							</NavItem>
							<NavDropdown eventKey={3} title="Shop" id="basic-nav-dropdown">
								{shopMenu}
							</NavDropdown>
						</Nav>
						<Nav pullRight>
						{rightBar}
						</Nav>
					</Navbar.Collapse>
				</Navbar>
	      {/*<Route exact path="/" component={Slick} />*/}
      </div>
	)
  }
}

function mapStateToProps(state){
	return{
		registerInfo: state.registerReducer
	}
}

export default connect(mapStateToProps)(NavBar)

