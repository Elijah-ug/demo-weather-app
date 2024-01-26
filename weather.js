const APIKeys = "2c1595e9db14234ed623d17541727704"
// const url = `https://api.openweathermap.org/data/2.5/weather?&q=${cityId}&key=${APIKeys}`;

const cityId = document.getElementById("cityId");
const submitBtn = document.getElementById('submitBtn');
const weatherIcon = document.querySelector(".image")
const city = document.querySelector(".city")
const describingData = document.querySelector('.description');
const windSpeed = document.querySelector('.wind-speed');
const temperatures = document.querySelector(".temp")
const humid = document.querySelector('.humid');
const feelsLike = document.querySelector('.feels-like');
submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const cityName = cityId.value;
    showData(cityName);
})

async function showData(cityName) {
  try {
      const response = await
          fetch(`https://api.openweathermap.org/data/2.5/weather?&q=${cityName}&appid=${APIKeys}&units=metric`);
    if (!response.ok) {
      throw new Error('error occured');
    }
      const data = await response.json();
      const image = data.weather[0].icon;
      console.log(data);
      //descriptions
      const descriptions = data.weather[0].description
      console.log(descriptions)
      describingData.textContent = descriptions;
      //wind speed
      const SpeedOfWind = data.wind.speed
      windSpeed.textContent = 'wind speed ' + SpeedOfWind + ' : ' + ' km/h';

      //   console.log(windSpeed)
      //feels like
      const feels = data.main.feels_like;
      feelsLike.textContent = 'Feels like ' + feels + ' : ' + ' °C';
    //   console.log(feels)
      //humidity
      const humidity = data.main.humidity;
      humid.textContent = "Humidity " + humidity + " : " + ' g.m-3';
      //temperature
      const temperature = data.main.temp;
    //   temperatures.textContent =  temperature + ' °C';
      console.log(temperature)
      //city name
      const currentCountry = data.sys.country;
      cityName = data.name
      city.textContent = cityName +" : " + currentCountry;
      //ims
      const icons = data.weather[0].icon;
      weatherIcon.innerHTML = `<img src = "https://openweathermap.org/img/wn/${icons}.png">`




    //   console.log(describingData);
  } catch (error) {
      return '<p>An error occured</p>';
  }
}
