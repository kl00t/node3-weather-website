const request = require('request')
const access_token = 'pk.eyJ1Ijoic3ZhdWdoYW4iLCJhIjoiY2tmNWM5dXo0MGxwdjJ6bWR1d2c1NG56cyJ9.h8hxPTxLWyU7e_2Oc2foAg'

const geocode = (address, callback) => {
    
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + access_token +'&limit=1'
    
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to geocoding service.', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })

}

module.exports = geocode