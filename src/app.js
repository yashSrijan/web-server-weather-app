const path = require('path'); //core node module - built in
const express = require('express'); //express is actually a function here
const hbs = require('hbs');

const app = express(); //doesnt take any arguments
const port = process.env.PORT || 3000 //process.env.PORT will work with heroku

const geocodeAddress = require('./utils/geocode');
const getWeather = require('./utils/weather');

//////////////////////////////////////////////////////////////////////
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
app.set('views', viewPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)
//to get handlebars setup


//////////////////////////////////////////////////////////////////////
const publicDirPath = path.join(__dirname, '../public')
app.use( express.static(publicDirPath) )
//customize the server to serve up the public folder


//////////////////////////////////////////////////////////////////////
app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather App',
        name : 'Yash Arora'
    })
    //render -> the first argument is the name of the view to render nd the second argument is an object
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About',
        name : 'Yash Arora'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title : 'Help !',
        message : 'How can we help you ? Contact yashrajarora0@gmail.com for queries.',
        name : 'Yash Arora'
    })
})

app.get('/weather', (req, res) => {
    console.log("req.query.address : ", req.query.address)
    if(!req.query.address) {
        //if there is no address term in query string
        return res.send({
            error : 'You must provide an address !'
        })
    }
    //if there is an address present in query string
    geocodeAddress(req.query.address, (error, {location, latitude, longitude} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }
        getWeather(latitude, longitude, (error, {summary}) => {
            if(error) {
                return res.send({
                    error
                })
            }
            res.send({
                summary, location
            })
        })
    })
})

// app.get('/products', (req, res) => {
//     console.log("req.query.search : ", req.query.search)
//     if(!req.query.search) {
//         //if there is no search term in query string
//         res.send({
//             error : 'You must provide a search term !'
//         })
//     } else {
//         //if there is search term present in query string
//         res.send({
//             products : []
//         })
//     }
// })

app.get('/help/*', (req, res) => {
    res.render('404', {
        'title' : 'Help 404 !',
        errorMessage : 'Help article not found :(',
        name : 'Yash Arora'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        'title' : '404 !',
        errorMessage : 'Page not found :(',
        name : 'Yash Arora'
    })
})
//what the app should do when someone what to get a resource at a particular loacation


//////////////////////////////////////////////////////////////////////
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
//make the server run on port 3000