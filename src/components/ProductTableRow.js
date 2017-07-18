import React from 'react'
import AddToCart from 'react-icons/lib/fa/cart-plus'

function ProductTableRow(props){
	const product = props.product
	if(product.quantityInStock > 100){
		var inStockClass = "";
		var inStock = "In Stock!"
	}else if(product.quantityInStock >0){
		var inStockClass = "bg-warning";
		var inStock = 'Order Soon!'
	}else{
		var inStockClass = "bg-danger";
		var inStock = 'Out of stock!'
	}

    if (props.loggedIn) {
        var button = <td className="add-to-cart"><AddToCart size={24} onClick={()=>{console.log("ADDED TO CART"); props.addToCart(product.productCode, props.token)}}/></td>
    } else {
        var button = ""
    }

	return (		
		<tr>
			<td>{product.productName}</td>
			<td>{product.productScale}</td>
			<td>{product.productVendor}</td>
			<td>{product.productDescription}</td>
			<td className={inStockClass}>{inStock}</td>
			<td>{product.buyPrice}</td>
			<td>{product.MSRP}</td>
            {button}
		</tr>
	)
}

export default ProductTableRow;