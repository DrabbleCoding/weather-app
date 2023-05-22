const api_location_url = 'https://dataservice.accuweather.com/locations/v1/cities/autocomplete';
const api_weather_url = "https://dataservice.accuweather.com/currentconditions/v1/"
const api_key = "eDxllwERwZ9ItCfyfyu3orIBKpvX165m"

const city_input = document.getElementById("city_input")
const search_button = document.getElementById("search_button")

const searchBox = document.querySelector(".search input")
const searchButn = document.querySelector(".search button")
const weatherPic = document.querySelector(".weather-icon")

async function check_weather(locationKey) {
    const response = await fetch(api_weather_url + `${locationKey}` + `?apikey=${api_key}` + `&details=True`)
    var data = await response.json()
    console.log(data)
    document.querySelector(".temp").innerHTML = Math.round(data[0].Temperature.Metric.Value) +'°'+ data[0].Temperature.Metric.Unit;
    document.querySelector(".humidity").innerHTML = data[0].RelativeHumidity+ '%';
    document.querySelector(".wind").innerHTML = data[0].Wind.Speed.Metric.Value +' '+ data[0].Wind.Speed.Metric.Unit;
    if(isNaN(data[0].WeatherIcon) == true){
        weatherPic.src = "images/" + data[0].WeatherIcon + ".png"
    }
}

async function get_location() {
    const response = await fetch(api_location_url + `?apikey=${api_key}` + `&q=${city_input.value}`)
    var data = await response.json()
    if (data && data.length > 0) {
        const locationKey = data[0].Key; // Assuming the first result is the correct city
        document.querySelector(".city").innerHTML = data[0].LocalizedName;
        check_weather(locationKey)
    } else {
        console.log('No results found')
    }
}


searchButn.addEventListener("click", () => {
    get_location();
})
get_location()