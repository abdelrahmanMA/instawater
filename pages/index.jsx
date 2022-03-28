import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { getWeatherData } from '../services/openWeaterServices';

const toCelsius = (temp) => ((temp * 9) / 5 + 32).toFixed(2);
const toFahrenheit = (temp) => (((temp - 32) * 5) / 9).toFixed(2);

export default function Home() {
  const [activeUnit, setActiveUnit] = useState('c');
  const [latitude, setLatitude] = useState('29.9567842');
  const [longitude, setLongitude] = useState('31.0908323');
  const [temperature, setTemperature] = useState(72);
  const [lowTemperature, setLowTemperature] = useState(63);
  const [highTemperature, setHighTemperature] = useState(81);
  const [city, setCity] = useState('New Cairo');
  const [todaysDate, setTodaysDate] = useState('Monday 28, 2022');
  const [icon, setIcon] = useState('01d');
  const [summary, setSummary] = useState('cloudy');
  const [daySummary, setDaySummary] = useState('Cloudy throughout the day');

  const TemperatureSymbol = () => <sup>{activeUnit === 'c' ? '°' : '°F'}</sup>;

  const convertTemperatureTo = (newUnit) => {
    console.log('newUnit', newUnit);
    if (newUnit === 'c' && activeUnit !== 'c') {
      setTemperature(toCelsius(temperature));
      setLowTemperature(toCelsius(lowTemperature));
      setHighTemperature(toCelsius(highTemperature));
      setActiveUnit('c');
    } else if (newUnit === 'f' && activeUnit !== 'f') {
      setTemperature(toFahrenheit(temperature));
      setLowTemperature(toFahrenheit(lowTemperature));
      setHighTemperature(toFahrenheit(highTemperature));
      setActiveUnit('f');
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    }

    const options = { weekday: 'long', year: 'numeric', day: 'numeric' };
    const date = new Date();
    setTodaysDate(date.toLocaleString(undefined, options));
  }, []);

  useEffect(async () => {
    getWeatherData(latitude, longitude).then((data) => {
      setTemperature(data.main.temp);
      // the following is not the actual low and high temperature, it's just a simulation
      setLowTemperature(data.main.temp_min);
      setHighTemperature(data.main.temp_max);
      setSummary(data.weather[0]?.main);
      setDaySummary(data.weather[0]?.description);
      setIcon(data.weather[0]?.icon);
    });
  }, [latitude, longitude]);

  return (
    <div className={styles.wrap}>
      <Head>
        <title>InstaWeather</title>
      </Head>

      <main className={styles.main}>
        <header className={styles.header}>
          <h1>InstaWeather</h1>
          <div className={styles.unitSwitcherWrap}>
            <button
              className={`${styles.unitSwitcher} ${activeUnit === 'c' ? 'activeUnitSwitcher' : ''}`}
              onClick={() => {
                convertTemperatureTo('c');
              }}
            >
              C
            </button>
            <button
              className={`${styles.unitSwitcher} ${activeUnit === 'f' ? 'activeUnitSwitcher' : ''}`}
              onClick={() => {
                convertTemperatureTo('f');
              }}
            >
              F
            </button>
          </div>
        </header>

        <div className={styles.weatherContentWrap}>
          <div className={styles.leftSide}>
            <div className={styles.cityAndDate}>
              <span className={styles.cityName}>{city}</span>
              <span className={styles.date}>{todaysDate}</span>
            </div>
            <div className={styles.iconAndSummary}>
              <span className={styles.icon}>
                <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt={summary} />
              </span>
              <span className={styles.summary}>{summary}</span>
            </div>
          </div>
          <div className={styles.rightSide}>
            <span className={styles.temperature}>
              {temperature}
              <TemperatureSymbol />
            </span>
            <span className={styles.temperatureRange}>
              <span>
                {highTemperature}
                <TemperatureSymbol />
              </span>
              /
              <span>
                {lowTemperature}
                <TemperatureSymbol />
              </span>
            </span>
            <span className={styles.daySummary}>{daySummary}</span>
          </div>
        </div>
      </main>
    </div>
  );
}
