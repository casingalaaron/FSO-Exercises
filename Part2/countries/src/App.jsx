import { useState, useEffect} from 'react'
import axios from 'axios'
import Country from './Components/Country'
import FilterList from './Components/FilterList'
import Weather from './Components/Weather'

const App = () => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY
  const apiURL = 'https://studies.cs.helsinki.fi/restcountries/api'
  const [ value, setValue ] = useState('')
  const [ countries, setCountries ] = useState(null)
  const [ country, setCountry ] = useState(null)
  const countryToShow = country ? country : countries
  const weatherAPI = 'https://api.openweathermap.org/data/2.5'
  const [ weather, setWeather ] = useState(null)
  
  useEffect(() => {

    if(!value){
      setCountries(null)
      setCountry(null)
      setWeather(null)
    }
    else{
      axios
      .get(apiURL.concat('/all'))
      .then(response => {
        const data = response.data
        const filteredData = data.filter(country => country.name.common.toLowerCase().includes(value.toLowerCase()))
        if(filteredData.length === 1){
          setCountry(filteredData[0])
          setCountries(null)

          const capital = filteredData[0].capital
          axios
          .get(weatherAPI.concat(`/weather?q=${capital}&appid=${apiKey}&units=metric`))
          .then(response => {
            setWeather(response.data)
          })
        }
        else{
          setCountries(filteredData)
          setCountry(null)
          setWeather(null)
        }
      })
    }
  }, [value])

  const handleShowButton = country => {
    setCountry(country)
    setWeather(weather)
    setCountries(null)
  }

  const handleValue = event => {
    setValue(event.target.value)
  }

  return(
    <div>
      <form>
        find countries: <input type="text" value={value} onChange={handleValue} />
      </form>
      {console.log(weather)}
      <FilterList ListItems={countries} clickHandler={handleShowButton}/>
      <Country data={country}/>
      <Weather data={weather}/>
    </div>
  )
}
export default App