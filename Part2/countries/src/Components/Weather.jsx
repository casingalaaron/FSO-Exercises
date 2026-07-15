const Weather = ({data}) => {

    if(!data){
        return null
    }
        const icon = 'https://openweathermap.org/payload/api/media/file'.concat(`/${data.weather[0].icon}.png`)
        return(
            
            <div>
                <h1>Weather in {data.name}</h1>
                <p>Temperature {data.main.temp}° Celcius</p>
                <img src={icon} alt={`icon-weather-in-${data.name}`} />
                <p>{data.weather[0].description}</p>
                <p>Wind {data.wind.speed} m/s</p>
            </div>
        )
    
}
export default Weather