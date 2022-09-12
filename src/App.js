
import { useEffect, useState } from 'react';
import './App.css';

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
function App() {
  const [search, setSearch] = useState("Lucknow");
  const [City, setCity] = useState("Lucknow");


  const dayInAWeek = new Date().getDay();
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + search + '&appid=2eb8ccca90adaa4428b97244944de7a0')
      const data = await response.json();
      console.log(data);
      setCity(data);
    }
    fetchApi()

  }, [search])
  const handleSubmit = (e) => {
    console.log('form submitted ✅');
    e.preventDefault();
  }




  return (
    <div className="container">
      <form onSubmit={e => { handleSubmit(e) }}>
        <label>
          <input type='text' placeholder='Enter city name' onChange={(event) => {
            setSearch(event.target.value);
          }} /></label>
        <button type="submit"  >Submit</button>
      </form>
      <h1 className="date-title">{date}</h1>
      <h2 className="location-title"  >
        City:{search?search:<>Enter City Name</>}
      </h2>
      {!City ?<>Enter Data</>:<>
      {City.message ? <>City Not Found (first letter as a capital letter)</>:<>
      <h2 className="day">{forecastDays[0]}</h2>
      <h3 className="temparture">{(City.list[0].main.temp - 273.15).toFixed(2)}</h3>
      <h3 className="description">{City.list[0].weather[0].description}</h3>
      <img alt="weather_icon" src={`http://openweathermap.org/img/wn/` + City.list[0].weather[0].icon + ".png"} />
      <div>
        {City.list.splice(0, 7).map((item, i) => (

          <div key={i}>
            <card>
              <label className="day">{forecastDays[i]}</label>
              <label className="temparture">{(item.main.temp - 273.15).toFixed(2)}</label>
              <img alt="weather_icon" src={`http://openweathermap.org/img/wn/` + item.weather[0].icon + ".png"} />
              <label className="description">{item.weather[0].description}</label>
            </card>
          </div>
        ))}
      </div>
</>
        }</>}
    </div>

  );
}

export default App;
