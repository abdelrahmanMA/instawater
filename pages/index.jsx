import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { getWeatherData } from '../services/openWeaterServices';

export default function Home() {
  const [activeUnit, setActiveUnit] = useState('c');
  const [latitude, setLatitude] = useState('29.9567842');
  const [longitude, setLongitude] = useState('31.0908323');
  const [temperature, setTemperature] = useState(72);
  const [LowTemperature, setLowTemperature] = useState(63);
  const [HighTemperature, setHighTemperature] = useState(81);
  const [city, setCity] = useState('New Cairo');
  const [todaysDate, setTodaysDate] = useState('Monday 28, 2022');
  const [icon, setIcon] = useState('partly-cloudy-day');
  const [summary, setSummary] = useState('cloudy');
  const [daySummary, setDaySummary] = useState('Cloudy throughout the day');

  const TemperatureSymbol = () => <sup>{activeUnit === 'c' ? '°' : '°F'}</sup>;

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
            <button className={`${styles.unitSwitcher} ${activeUnit === 'c' && styles.activeUnitSwitcher}`}>C</button>
            <button className={`${styles.unitSwitcher} ${activeUnit === 'f' && styles.activeUnitSwitcher}`}>F</button>
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
                <img src={`https://darksky.net/images/weather-icons/${icon}.png`} alt={summary} />
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
                {HighTemperature}
                <TemperatureSymbol />
              </span>
              /
              <span>
                {LowTemperature}
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
