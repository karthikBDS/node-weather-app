const request = require('request');

const forecast = (lat, lang, callback) => {
        const url = 'http://api.weatherstack.com/current?access_key=f88969a1b37021a0cac213d50163cb3e&query='+lat+','+lang
        request({url, json: true}, (error,{body}) =>{  
            if(error){
                callback('Unable to connect to weather service!', undefined)
            }else if(body.error){
                console.log('Unable to find location')
            }else{
                const current = body.current
                callback(undefined, {
                    temperature: current.temperature,
                    feelslike: current.feelslike,
                    latLocation: body.location.name
                })    
            }
        })         
}

module.exports = forecast;