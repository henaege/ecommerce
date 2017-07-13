import $ from 'jquery'

export default function(userData){
    console.log(window.hostAddress + '/register')
    var thePromise = $.ajax({
        method: "POST",
        url: window.hostAddress + '/register',
        data: userData
    })
    return{
        type: "REGISTER",
        payload: thePromise
    }
}