import React, {Component} from 'react'
// We need some glue between react and ReduxStudents. This component/container needs to know about redux PopStateEvent. The answer? The coonect method from the react-redux module
import {connect} from 'react-redux'
import $ from 'jquery'
import {Panel, Col, Grid, Row, Image} from 'react-bootstrap'
import {Link} from 'react-router-dom'


class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
			productlines: [],
            images: []
		}
    }

    

    componentDidMount() {
		$.getJSON(window.hostAddress + '/productlines/get', (productlinesData)=> {
			console.log(productlinesData)
			this.setState({productlines: productlinesData})
		})
	}    

    render(){
        
        const products = []
		this.state.productlines.map((pl, index)=>{
			products.push(
                <Col key={index} xs={12} md={6} lg={4}>
                    <Link to={pl.link} className="panel-link"><Panel className="panel" header={pl.productLine}>
                        <div className="center-align">
                            <Image className="product-image" src={pl.image}responsive />
                        </div>
                        <div className="product-description">
                            {pl.textDescription}
                        </div>
                    </Panel>
                    </Link>
                </Col>
			)
            console.log(pl.image)
		})
        
        return(
            <div>
                
                
                
                <div className="center-align title">
                    <h1 className="display-2">Welcome to Classic Models!</h1>
                    <Grid>
                        <Row className="products">
                                {products}
                        </Row>
                    </Grid>
                </div>
            </div>
        
        )
    }
}

// All containers that need access to state will have this function. We are creating a mapping between redux state and this component's props
function mapStateToProps(state){
    // mapStateToProps returns an object with each piece of state we need
    return {
        // From our master Reducer we have a "state" object. Inside of that state object, we have a property: students. This exists because we made it a property in the root reducer
        students: state.students,
        cartItems: state.cartItems

    }




}
// INSTEAD OF exporting the class (the component), we export connect
export default connect(mapStateToProps)(Home)