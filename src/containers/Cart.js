import React, { Component } from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import GetCart from '../actions/GetCart'
import ProductTableRow from '../components/ProductTableRow'
import {Button} from 'react-bootstrap'
import $ from 'jquery'
import {Link} from 'react-router-dom'

class Cart extends Component{
    constructor(props){
        super(props)
        this.makePayment = this.makePayment.bind(this)
    }

componentDidMount() {
    if(this.props.loginInfo.token != undefined){
        this.props.getCart(this.props.loginInfo.token)
    } else {

    }
    
}

    makePayment() {
        var handler = window.StripeCheckout.configure({
            key: 'pk_test_DIhBN1tLgDgdlV1WEnXeQlXc',
            locale: 'auto',
            image: "http://iamdrewt.net/assets/images/Drew2.JPG",
            token: (token) => {
                var theData = {
                    amount: this.props.cartInfo.totalPrice * 100,
                    stripeToken: token.id,
                    userToken: this.props.loginInfo.token
                }
                $.ajax({
                    method: 'POST',
                    url: window.hostAddress + '/stripe',
                    data: theData
                }).done((data) => {
                    console.log(data);
                    if (data.msg === 'paymentSuccess') {
                        this.props.history.push('/thankyou')
                    }
                });
            }
        });
        handler.open({
            name: "Pay Now",
            description: 'Pay Now',
            amount: this.props.cartInfo.totalPrice * 100
        })
    }

    render(){

        if (this.props.cartInfo.products == undefined){
            return (
                <div>
                    <h3 className="title">Your cart is empty! Please add items or <Link to= '/login'>log in</Link>.</h3>
                </div>
            )
        }

        var cartArray = []
        this.props.cartInfo.products.map((product, index)=>{
            // console.log(product)
            cartArray.push(
                <ProductTableRow 
                key={index}
                product={product}
                addToCart={null}
                loggedIn={false}
                token={null} />
            )
        })

        console.log(this.props.cartInfo)
        return(
            <div>
                <div className="title">
                    <h3>Your cart total is: ${this.props.cartInfo.totalPrice}</h3>
                    <Button className="pay-button" onClick={this.makePayment}>Pay Now</Button>
                </div>
                
                <div>{cartArray}</div>
            
            <div>
                    
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        loginInfo: state.registerReducer,
        cartInfo: state.cartReducer
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        getCart: GetCart
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)