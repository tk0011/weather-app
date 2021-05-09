import React from 'react'
import {motion} from 'framer-motion'

const WeatherCard = ({city, deleteItem}) => {
    const {name, weather, main, sys} = city
    const getImg = weather[0].icon

      const variants = {
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
      }

      const handleClick = (e) => {
          e.preventDefault()
          deleteItem(city);
      }

    return (
        <motion.div
         initial="hidden"
         animate="visible"
         exit="hidden"
         variants={variants}
         whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
         className="weather-card-wrap"
         >
            <div className="overlay-on-card"> 
                <button onClick={handleClick} className="remove-btn"> x </button>
            </div>
            <div className= 'card weather-card' >
                <h5>{name + ' , ' + sys.country}</h5>
                <p>{weather[0].description}</p>
                <img className="img-fluid" src={`http://openweathermap.org/img/wn/${getImg}@2x.png`} alt={weather[0].description} />
                <h2>{`${main.temp}°`}</h2>
                <div className="min-max-wrap">
                    <p> Max
                        <span>{`${main.temp_max}°`}</span>
                    </p>
                     <p> Min
                        <span>{`${main.temp_min}°`}</span>
                    </p>
                </div>
            </div>
        </motion.div>
    )
}

export default WeatherCard
