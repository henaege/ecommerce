import $ from 'jquery'

export default function(loginData){
    console.log(window.hostAddress + '/login')
    var thePromise = $.ajax({
        method: "POST",
        url: window.hostAddress + '/login',
        data: loginData
    })
    
    return{
        type: "REGISTER",
        payload: thePromise
    }
}