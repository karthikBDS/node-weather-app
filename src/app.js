const path = require('path')
const express = require('express')
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { response } = require('express');
const app = express()
//comment added by karthik
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))

app.get('/', (req, res) => {
    res.render('index', {
        title:'Weather',
        name : 'Karthik',
        content:'Weather content comes here'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title:'About',
        name : 'Karthik',
        content:'About content comes here'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title:'Help',
        name : 'Karthik',
        content:'Help content comes here'
    })
})
app.get('/Weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'Provide an address'
        })
    }

    geocode(req.query.address,(error, {latitude,longitude,location} = {}) => {
        if(error){
           return res.send({
                error: 'Error : '+ error
            })
        }
        forecast(latitude,longitude,(error,{temperature,feelslike,latLocation})=>{
            if(error){
                return res.send({
                    error: 'Error : '+ error
                })
            }
            res.send({        
                temprature:temperature,
                feelslike:feelslike,
                location:location,
                place: req.query.address
            })             
        })      
    })    
})
app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error:'Provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })

})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'404',
        name : 'Karthik',
        content:'Error 404 : Help article not found'

    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title:'404',
        name : 'Karthik',
        content:'Error 404 : page not found'

    }) 
})
app.listen(3000 , () => {
    console.log('Server is Up on port 3000')
})