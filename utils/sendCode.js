const Kavenegar = require('kavenegar');
const api = Kavenegar.KavenegarApi({apikey: process.env.apiKey});



const sendCode =  (mobile, message='') => {
    const code = Math.floor(Math.random()*9999 + 1000)
    
    api.Send({
        message:`کد تاییدیه شما ${code}`,
        sender: process.env.sender,
        receptor: mobile
    }, 
    function (response, status){
        console.log(response);
        console.log(status);
    })
    return code
}

module.exports = sendCode;