const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Creates an express application
const app = express()

// Define paths for express configuration
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Scott Vaughan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Scott Vaughan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Scott Vaughan',
        helpText: 'This is a help message'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    const address = req.query.address

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
    
        forecast(latitude, longitude, (error, { description, currentTemperature, feelslike } = {}) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
    
            const forecast = 'The weather in ' + location + ' is currently ' + description 
            + ' with a temperature of ' + currentTemperature + ' degrees. It feels like ' + feelslike + ' degrees.'

            return res.send({
                address: address,
                location: location,
                forecast: forecast,
            })
        })
    })

    // res.send({
    //     address: req.query.address,
    //     forecast: 'Overcast',
    //     location: 'Stockport'
    // })
})

app.get('/products', (req, res) => {
    
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error',
        name: 'Scott Vaughan',
        errorMessage: 'Help article not found'
    })
})

// 404 error page
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error',
        errorMessage: 'Page not found'
    })
})

const port = 3000
app.listen(port, () => {
    console.log('Server is running on port:' + port)
})