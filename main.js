const APIkey = "d6714e1261b7b6e1059ba5bc1f266f6b";
const city = document.querySelector(".city");
const country = document.querySelector("#country");
const weather = document.querySelector(".weather");
const search = document.querySelector("#search");
const find = document.querySelector("#searchContainer button");
const tempType = document.querySelector("#tempType");
const temp = document.querySelector("#temp");
const desc = document.querySelector("#desc");
const C = document.querySelector("#C");
const F = document.querySelector("#F");
const feelslike = document.querySelector("#feelslike");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");
const pressure = document.querySelector("#pressure");
const visibility = document.querySelector("#visibility");
const loader = document.querySelector("#loader");

let curTemp = "metric";

search.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        getWeather(search.value);
        search.value = "";
    }
});

find.addEventListener("click", function () {
    getWeather(search.value);
    search.value = "";
});

tempType.addEventListener("click", function () {
    if (C.classList.contains("curTemp")) {
        C.classList.remove("curTemp");
        F.classList.add("curTemp");
        curTemp = "imperial";
        getWeather(city.textContent);
    } else {
        F.classList.remove("curTemp");
        C.classList.add("curTemp");
        curTemp = "metric";
        getWeather(city.textContent);
    }
});

async function getWeather(city) {
    try {
        let response = await fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
                city +
                "&units=" +
                curTemp +
                "&appid=" +
                APIkey,
            { mode: "cors" }
        );

        let data = await response.json();
        console.log(data);

        loader.style.display = "flex";
        setTimeout(function () {
            loader.style.display = "none";
        }, 500);

        setTimeout(function () {
            fillPage(data);
        }, 600);
        
    } catch (error) {
        console.log("City not found!");
    }
}

getWeather("London");

function fillPage(data) {
    city.textContent = data.name;
    country.textContent ="," +data.sys.country;
    //+','+data.sys.country;
    weather.textContent = data.weather[0].main;
    temp.textContent = Math.round(data.main.temp) + "°";
    desc.textContent = `Today: ${
        data.weather[0].description
    }. The high will be ${Math.round(
        data.main.temp_max
    )}°. The low tonight will be ${Math.round(data.main.temp_min)}°.`;

    feelslike.textContent = Math.round(data.main.feels_like) + "°";
    humidity.textContent = data.main.humidity + "%";
    wind.textContent = Math.round(data.wind.speed) + " km/hr";
    pressure.textContent = data.main.pressure + " hPa";
    visibility.textContent = data.visibility / 100 + " km";
}
