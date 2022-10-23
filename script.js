let loc = document.getElementById("location");
let hum = document.getElementById("humidity");
let wind = document.getElementById("wind");
let tempicon = document.getElementById("temp-icon");
let tempvlue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
let searchinput = document.getElementById("search-input");
let searchbutton = document.getElementById("search-button");
let iconfile;

searchbutton.addEventListener("click", (e) => {
  e.preventDefault();
  getweather(searchinput.value);
  console.log(searchinput.value);
  searchinput.value = "";
});
const getweather = async (city) => {
  console.log(city);
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8f5859da81d03c155b5153a5ee42d71a`;
  try {
    fetch(api, { method: "GET" })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const { name } = data;
        const { feels_like } = data.main;
        const { id, main } = data.weather[0];
        const { humidity } = data.main;
        const { speed } = data.wind;

        loc.textContent = name;
        climate.textContent = main;
        hum.textContent = humidity;
        wind.textContent = speed;
        tempvlue.textContent = Math.round(feels_like - 273);

        console.log(data);

        if (id < 300 && id > 200) {
          tempicon.src = "./images/thunderstorms.png";
        } else if (id <= 400 && id >= 300) {
          tempicon.src = "./images/drizzle.png";
        } else if (id <= 600 && id >= 500) {
          tempicon.src = "./images/rain.png";
        } else if (id <= 700 && id > 600) {
          tempicon.src = "./images/snowy.png";
        } else if (id < 800 && id > 700) {
          tempicon.src = "./images/haze.png";
        } else if (id == 800) {
          tempicon.src = "./images/clear-sky.png";
        } else if (id > 800 && id <= 804) {
          tempicon.src = "./images/clouds.png";
        }
      });
  } catch (error) {
    alert("city not found");
  }
};
