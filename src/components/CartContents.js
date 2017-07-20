import React from 'react'
import {Panel, PanelGroup, Col, Grid, Row, Image, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'


function CartContents(props){
	const product = props.product
	if(product.quantityInStock > 100){
		var inStockClass = "center-align in-stock";
		var inStock = "In Stock!"
	}else if(product.quantityInStock >0){
		var inStockClass = "bg-warning center-align in-stock";
		var inStock = 'Order Soon!'
	}else{
		var inStockClass = "bg-danger center-align in-stock";
		var inStock = 'Out of stock!'
	}

    // if (props.loggedIn) {
    //     var button =  <Col xs={6} xsOffset={3}className="add-to-cart center-align" onClick={()=>{console.log("ADDED TO CART"); props.addToCart(product.productCode, props.token)}}><AddToCart size={32} /></Col>
    //     var addMessage = <Col xs={4} xsOffset={4}className="add-to-cart-text center-align">Add to Cart</Col>
    // // } else if (props.location.pathname === "/cart"){
    // //     var button = ""
    // //     var addMessage = ""
    // } else {
    //     var button = <Col xs={6} xsOffset={3} className="add-cart-button center-align"><Link to="/login" ><Button>Log in to Purchase</Button></Link></Col>
    //     var addMessage = ""
    // }

    const title = <h3>{product.productName}</h3>

	return (		


        <Col xs={12} md={6} lg={4}>
        <PanelGroup defaultActiveKey="0" accordion>
                    <Panel className="product-panel" header={title} eventKey={props.key}>
                        <div><h4>Scale: </h4>{product.productScale}</div>
                        <hr></hr>
                        <div><h4>Manufacturer: </h4>{product.productVendor}</div>
                        <hr></hr>
                        <div className="product-description"><h4>Description: </h4>
                        {product.productDescription}
                        </div>
                        <hr></hr>
                        <Col xs={12} className="vertical-align price-panel">
                        <Col xs={2} className={inStockClass}>
                            {inStock}
                        </Col>
                        <Col className="center-align in-stock" xs={6}>Buyer Price: ${product.buyPrice}</Col>
                        <Col className="center-align in-stock" xs={4}>MSRP: ${product.MSRP}</Col>
                        </Col>
                        
                        
                        
                    </Panel>
                    </PanelGroup>
                </Col>

		
	)
}

export default CartContents;