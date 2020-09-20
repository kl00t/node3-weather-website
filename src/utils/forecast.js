const request = require('request')
const access_key = 'f41b0b7becf3a8a96a2b6bff3e0b1a34'

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=' + access_key + '&query=' + latitude + ',' + longitude +'&units=m'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        }
        else {
            callback(undefined, {
                description: body.current.weather_descriptions[0],
                currentTemperature: body.current.temperature,
                feelslike: body.current.feelslike,
                humidity: body.current.humidity
            })
        }
    })
}

module.exports = forecast