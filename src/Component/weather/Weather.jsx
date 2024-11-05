import React from 'react'
import styles from './weather.module.scss'
import { Card } from 'react-bootstrap'
import PositionSvg from '../../Svgs/PositionSvg'
import DefaultWeather from '../../Svgs/DefaultWeather'
import Thermometer from '../../Svgs/Thermometer'
import Time from  '../../Svgs/Time'
import Wind from '../../Svgs/Wind'
import { useSelector } from 'react-redux'
import Moment from 'react-moment'
import { motion } from 'framer-motion';
function Weather() {

const weather =useSelector(({weather})=>weather)
console.log(weather)

const displayIcon =()=>{
  const number = weather.weather.icon.substring(0,2)
  console.log(number)

  return weather.weather.icon
}

  return (
    <>
    <Card className={styles.container}>
    
    {weather.isLoaded ?
     <Card.Body>
     <Card.Title>{weather.name} , {weather.sys.country}<PositionSvg/>
     <div className={styles.date}>
           <Moment format='llll' /> 
           <span><Time width={'15px'} height={'15px'}/></span>
           </div>
     </Card.Title>
     <Card.Text as={'div'} className={styles.weatherInfo}>
     <div style={{ position: 'relative', overflow: 'hidden', width: '180px', height: '180px'}}>
      <motion.img
        initial={{ opacity: 0, width: '100%' }}
        animate={{opacity: 1, width: '140%' }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        src={`https://openweathermap.org/img/wn/${displayIcon()}@2x.png`}
        alt=""
        style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' , top:'-50px'}} // Center the image
      />
    </div>
         <div className={styles.temperature}>
           <span>{weather.main.feels_like}° C</span>
           <Thermometer />
         </div>
        <div>
         Good morning {weather.name}
        </div>
        <hr width="100%"/>
        <div className={styles.info}>
         <div>
           <div><DefaultWeather color={"fff"}/></div>
           <div>Sunrise</div>
           <Moment unix={true} format='hh:mm'>
           {weather.sys.sunrise}
           </Moment>
           
         </div>
         <div>
           <div><Wind /></div>
           <div>Wind</div>
           <div>{weather.wind.speed} km/h</div>
         </div>
         
         <div>
           <div><Thermometer color={'#fff'} width={'25px'} height={'25px'}/></div>
           <div>Temp</div>
           <div>{weather.main.temp_max}°C</div>
         </div>
        </div>
         
     </Card.Text>
     </Card.Body>
     :
     <Card.Body>
       <Card.Title>Please choise Your City</Card.Title>
     </Card.Body>
  }
    </Card>
    </>
  )
}

export default Weather