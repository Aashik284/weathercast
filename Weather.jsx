import cleard from '/opt/lampp/htdocs/project1/e-commerce/public/01d.png'
import clearn from '/opt/lampp/htdocs/project1/e-commerce/public/01n.png'
import fewcloudd from '/opt/lampp/htdocs/project1/e-commerce/public/02d.png'
import fewcloudn from '/opt/lampp/htdocs/project1/e-commerce/public/02n.png'
import scatteredcloudd from '/opt/lampp/htdocs/project1/e-commerce/public/03d.png'
import scatteredcloudn from '/opt/lampp/htdocs/project1/e-commerce/public/03n.png'
import brokencloudd from '/opt/lampp/htdocs/project1/e-commerce/public/04d.png'
import brokencloudn from '/opt/lampp/htdocs/project1/e-commerce/public/04n.png'
import showerraind from '/opt/lampp/htdocs/project1/e-commerce/public/09d.png'
import showerrainn from '/opt/lampp/htdocs/project1/e-commerce/public/09n.png'
import raind from '/opt/lampp/htdocs/project1/e-commerce/public/10d.png'
import rainn from '/opt/lampp/htdocs/project1/e-commerce/public/10n.png'
import thunderstormd from '/opt/lampp/htdocs/project1/e-commerce/public/11d.png'
import thunderstormn from '/opt/lampp/htdocs/project1/e-commerce/public/11n.png'
import snowd from '/opt/lampp/htdocs/project1/e-commerce/public/13d.png'
import snown from '/opt/lampp/htdocs/project1/e-commerce/public/13n.png'
import mistd from '/opt/lampp/htdocs/project1/e-commerce/public/50d.png'
import mistn from '/opt/lampp/htdocs/project1/e-commerce/public/50n.png'
import humidity from '../public/humidity.png'
import wind from '../public/wind.png'
import {useState,useEffect} from 'react'
// import propTypes from 'prop-types'

import './Weather.css'
const Weatherdetails=(prop)=>{
    return(
            <>
            <div className="weatherdata">
                <img src={prop.icon} alt="" />
                <div className="weatheritem">
                    <p className='temp'>{prop.temp} &deg;C</p>
                    <p className='city'>{prop.City}</p>
                    <p className='country'>{prop.country}</p>

                </div> 
                <div className="cord">
                    <div className="lat">
                        <p>latitude</p>
                        <span>{prop.lat}</span>    
                    </div>  
                    <div className="lon">
                        <p>longitude</p>
                        <span>{prop.lon}</span>    
                    </div>    
                </div> 
                
            </div>
               <div className="footer">
                     <div className="humidity">
                        <img src={humidity} alt="humidity" />
                        <p>{prop.hper}%</p>
                        <p className='text'>Humidity</p>

                    </div>
                    <div className="wind">
                        <img src={wind} alt="wind" />
                        <p>{prop.wspd}km/h</p>
                        <p className='text'>wind speed</p>

                    </div>

                </div>
            </>
    )
    
}
export const Weather=()=>{
    var [text,setText]=useState('ooty')

    var [error,setError]=useState(null)
    var [icon,setIcon]=useState(snowd)
    var [temp,setTemp]=useState()
    var [city,setCity]=useState('ooty')
    var [country,setCountry]=useState('')
    var [lat,setLat]=useState(0)
    var [lon,setLon]=useState(0)
    var [humidity,setHumidity]=useState({humidity})
    var [wind,setWind]=useState({wind})
    var [hper,setHper]=useState()
    var [wspd,setWspd]=useState()
    var [loading,setLoading]=useState(false)
    var [cityNotFound,setCityNotFound]=useState(false)
  

    var weathericon={
        "01d":cleard,
        "01n":clearn,
        "02d":fewcloudd,
        "02n":fewcloudn,
        "03d":scatteredcloudd,
        "03n":scatteredcloudn,
        "04d":brokencloudd,
        "04n":brokencloudn,
        "09d":showerraind,
        "09n":showerrainn,
        "10d":raind,
        "10n":rainn,
        "11d":thunderstormd,
        "11n":thunderstormn,
        "13d":snowd,
        "13n":snown,
        "50d":mistd,
        "50n":mistn,

    }
   async function search(){
        setLoading(true)

        var APIkey="ae10e499c9311fadf1ae64d03f8af4b2"
        var url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${APIkey}`
        try {

            var res = await fetch(url)
            var data= await res.json()
            console.log(data)  
             if (data.cod==="404")
            {
                console.error("City Not Found");
                setCityNotFound(true);
                setLoading(false);
                return;
              }    
            setHper(data.main.humidity)
            setWspd(data.wind.speed)
            setCity(data.name)
            setLon(data.coord.lon)
            setLat(data.coord.lat)
           
            setCountry(data.sys.country)
            setTemp(Math.floor(data.main.temp))
            var weathericonmap= data.weather[0].icon
             setIcon(weathericon[weathericonmap] || cleard)
         
          setCityNotFound(false)
        } catch (error) {
            console.error("error is occured",error.message)
            setError("Error is occured while finding the city")
            setCityNotFound(true)
            setLoading(false)
        }
        finally{
            setLoading(false)
            // setCityNotFound(false)
            // setError(false)
        }
    }
    function handler(e){
        setText(e.target.value)
    }
    function input(e){
        if (e.key=="Enter"){
            search(city)
        }
    
    }
    useEffect(
        function(){
            search()
        },[]
    )
    
    return(
        <>
            <div className="container">

                <div className="input-container">
                    <input type="search" className='input' placeholder='search' onChange={handler} value={text} onKeyDown={input} />
                    <div className="search">
                    <img src="./public/search-interface-symbol.png" alt="searchicon" className='searchicon' onClick={()=>search()} />
                    </div>
                </div>
               
                    {loading && <p className='load'>Loading...</p>}
                    {error && <p className="error">{error}</p>}
                    {cityNotFound && <p className="City-not-found">City Not Found...</p>}
                
                    {!loading && !cityNotFound && <Weatherdetails hper={hper} wspd={wspd} humidity={humidity} icon={icon} temp={temp} City={city} country={country} lat={lat} lon={lon} wind={wind} />}

                <p className='designby'>Designed By <span>Aashik</span></p>

            </div>
        </>
    )
}