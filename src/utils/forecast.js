const request = require('request')
const forecast  = (latitude,longitude,callback) =>
{
    const url = "https://api.darksky.net/forecast/23551f6206aa3741daa1d0a672123009/"+encodeURIComponent(latitude)+","+encodeURIComponent(longitude)+"?limit=1&units=si"
    request({url,json:true},(error,response)=>{
        if(error)
        callback("Can't connect to Weather services",undefined)
        else if(response.body.error)
        callback("Wrong URL",undefined)
        else
        callback(undefined,response.body.daily.summary+"Temperature:"+response.body.currently.temperature+", with a chance of rain:"+response.body.currently.precipProbability+"%")
    })
}

module.exports = forecast