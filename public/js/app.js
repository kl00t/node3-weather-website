const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const forecast = document.querySelector('#forecast')

weatherForm.addEventListener('submit', (e) => {
    
    e.preventDefault()

    const location = search.value

    forecast.textContent = 'Loading...'

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                forecast.textContent = data.error
            } else {
                forecast.textContent = data.forecast
            }
        })
    })    
    
})