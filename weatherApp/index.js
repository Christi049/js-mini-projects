const apikey = "51c1809fbf4c309ed14970848b0d6a09";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const search = document.querySelector('.search_input');
const btn = document.querySelector('.search-btn');

const weatherIcon_map = new Map([
  ['clear', 'images/clear.png'],
  ['clouds', 'images/clouds.png'],
  ['drizzle', 'images/drizzle.png'],
  ['humidity', 'images/humidity.png'],
  ['mist', 'images/mist.png'],
  ['rain', 'images/rain.png'],
  ['snow', 'images/snow.png'],
  ['wind', 'images/wind.png']
]);

const checkWeather = async(city) => {
  const response = await fetch(apiurl + city + `&appid=${apikey}`);

  if (response.status == 404){
    document.querySelector('.error').style.display = 'block';
    document.querySelector('.weather').style.display = 'none';
  }
  else{
      document.querySelector('.error').style.display = 'none';
      
      var data = await response.json();

      console.log(data);

      document.querySelector('.city').innerHTML = data.name;
      document.querySelector('.temp').innerHTML = `${Math.round(data.main['temp'])}°c`;
      document.querySelector('.humidity').innerHTML = `${data.main['humidity']}%`;
      document.querySelector('.wind').innerHTML = `${data.wind['speed']} Km/h`;

      document.querySelector('.weather-icon').src = weatherIcon_map.get(data.weather[0].main.toLowerCase());

      document.querySelector('.weather').style.display = 'flex';
  }
}

btn.addEventListener("click", () => {
  checkWeather(search.value);
})

search.addEventListener("keydown",(event) => {
  if (event.key == 'Enter'){
    checkWeather(search.value);
  }
})