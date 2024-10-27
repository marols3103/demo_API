'use client'
import { useEffect, useState } from 'react';
import Loading from './component/loading';
import styles from './page.module.css';
export default function Home() {
 
  const [data, setData]     = useState(null);
  const [country,setCountry]  = useState('paris')
  const [load,setLoad] = useState(true)
  let meteo = async()=>{
    let nom = 'marolahy pierre'
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+country+"&appid=ce7cc3a600a92b7fe86f7b0255f2906f";
    let res    = await fetch(url)
    let valeur = await res.json();
    const temperatureCelsius = valeur.main.temp - 273;
    valeur.main.temp = temperatureCelsius
    console.log(valeur)
    console.log(nom.trim());
    setData(valeur);
    setLoad(false)
  }

  useEffect(()=>{
    meteo()
  },[country])

  return (
    <div className={styles.div}>
        
        <h2>Afficher la météo d'aujourd'hui</h2>
        <select
          name = "ville"
          id="ville"
          onChange={(e)=>{
            setCountry(e.target.value)
          }}
        >
          <option value="paris">Paris</option>
          <option value="lyon">lyon</option>
          <option value="marseille">Marseille</option>
          <option value="toulouse">Toulouse</option>
        </select>
        <p>{
          load?
            (<Loading/>)
            :(data && data.name +":" + data.main.temp +"°" )
        } </p>
       
    </div>
  );
}
