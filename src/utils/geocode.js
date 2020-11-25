const request = require('request');
const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiY29kZWdlbmVkZXYiLCJhIjoiY2tocDk0eXl3MXJpcDJ6cGVycXkxZmk0MiJ9.3SbdhVzff6JkbzMjoP6SYA&limit=1'
    
    request({url, json:true}, (error,{ body }) =>{
        if(error){
            callback('Unable to Connect to location services!', undefined)
        }else if( body.features.length === 0 ){
            callback('Unable to find Location. Try another Location', undefined)
        }else{
            const features = body.features[0];
            callback(undefined,{
                longitude: features.center[0],
                latitude : features.center[1],
                location: features.place_name
            })             
        }
    })

}

module.exports = geoCode