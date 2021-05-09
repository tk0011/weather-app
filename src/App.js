import axios from 'axios'
import {useEffect, useState, useRef} from 'react'
import WeatherCard from './WeatherCard';
import {motion} from 'framer-motion'

function App() {

  const [selectedCity, setSelectedCity] = useState('')

  const [cities, setCities] = useState([])

  const [error, setError] = useState('')

  const cityRef  = useRef()

  const app_ID = process.env.REACT_APP_OPENWEATHER_KEY

  const handleSubmit = (e) => {
     e.preventDefault();
     setSelectedCity(cityRef.current.value)
  }


  useEffect(() => {
  if(selectedCity !== ''){
  async function getUserCity() {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${app_ID}&units=metric`);
    setCities([response.data, ...cities])
    cityRef.current.value='';
    setError('')
  } catch (error) {
     setError('Please enter a valid city or state name...')
  }}
  getUserCity();
  } 

  }, [selectedCity])



  const deleteItem = (item) => {
   const filteredCities= cities.filter(i => i !== item)
   setCities(filteredCities)
  }

  return (
      <div className="App">
          <div className="container">
              <form onSubmit = {handleSubmit}>
                  <div className="form-group m-auto city-search-form">
                       {cities.length>6 
                       ? <h6 className="mb-3 alert alert-danger text-center">Six cities/states already there, please remove any one.</h6>
                       : <h5 className="mb-3 pb-2 text-center">You can select upto 6 cities or states to check weather updates</h5>
                        }
                       {error && <div className="w-50 m-auto text-dark py-2 alert alert-danger" role="alert">{error}</div>} 
                        <input type="text" className="form-control" placeholder="Enter city or state..." ref={cityRef} required/>
                        <motion.button   whileHover={{ scale: 1.03, transition: { duration: 0.2 } }} whileTap={{ scale: 0.9 }}> Search</motion.button>
                  </div>
  
                    <div className="weather-card-holder">
                       {
                         cities.length > 0 && cities.slice(0,6).map((city,i) => <WeatherCard city={city} key={i} deleteItem={deleteItem} />) 
                       }
                    </div>
              </form>
          </div>
      </div>
  );
}

export default App;
