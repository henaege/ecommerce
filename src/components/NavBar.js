import React, {Component} from 'react'
import {Link, Route} from 'react-router-dom'
import Slick from './Slick'
import $ from 'jquery'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'

class NavBar extends Component{
	constructor(props){
		super(props)
		this.state = {
			productlines: []
		}
	}

	componentDidMount() {
		$.getJSON(window.hostAddress + '/productlines/get', (productlinesData)=> {
			console.log(productlinesData)
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
							<NavItem eventKey={1}>
								<Link to="/login">Sign in</Link>
							</NavItem>
							<NavItem eventKey={2}>
								<Link to="/register">Register</Link>
							</NavItem>
							<NavItem eventKey={2}>
								<Link to="/">Home</Link>
							</NavItem>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
	      <Route exact path="/" component={Slick} />
      </div>
	)
  }
}

export default NavBar

