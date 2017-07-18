import $ from 'jquery'

export default function(productCode, token){
    console.log(token)
    var dataToPass = {
            productCode: productCode,
            token: token
        }
    var thePromise = $.ajax({
        method: "POST",
        url: window.hostAddress + '/updateCart',
        data: dataToPass
    })
    return{
        type: "UPDATE_CART",
        payload: thePromise
    }
}