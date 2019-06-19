const request = require('request')

const geourl = (address,callback) =>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) +".json?access_token=pk.eyJ1IjoidmFzaDI1IiwiYSI6ImNqd3Z0OWR5eTA5cXIzem80YjJwbnIzYjcifQ.fBjChk4gE6J1GOGsvSshMg&limit=1"
    request({url,json:true},(error,{body})=>{
        if(error)
        callback("Network error",undefined)
        else if(body.message||body.features.length===0)
        callback("Wrong url",undefined)
        else
        callback(undefined,{
            latitude:body.features[0].center[1],
            longitude:body.features[0].center[0],
            location:body.features[0].place_name
        })
    })
}

module.exports = geourl