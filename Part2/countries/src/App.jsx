import { useState, useEffect} from 'react'
import axios from 'axios'
import Country from './Components/Country'
import FilterList from './Components/FilterList'

const App = () => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY
  const apiURL = 'https://studies.cs.helsinki.fi/restcountries/api/all'
  const [ value, setValue ] = useState('')
  const [ countries, setCountries ] = useState(null)
  const [ country, setCountry ] = useState(null)
  const countryToShow = country ? country : countries
  
  useEffect(() => {

    if(!value){
      setCountries(null)
      setCountry(null)
    }
    if(value){
      axios
      .get(apiURL)
      .then(response => {
        const data = response.data
        const filteredData = data.filter(country => country.name.common.toLowerCase().includes(value.toLowerCase()))
        if(filteredData.length === 1){
          setCountry(filteredData[0])
          setCountries(null)
        }
        else{
          setCountries(filteredData)
          setCountry(null)
        }
      })
    }
  }, [value])

  const handleValue = event => {
    setValue(event.target.value)
  }

  return(
    <div>
      <form>
        find countries: <input type="text" value={value} onChange={handleValue} />
      </form>
      <FilterList ListItems={countries} />
      <Country Data={country} />
    </div>
  )
}
export default App