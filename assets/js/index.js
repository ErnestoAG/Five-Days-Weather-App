const button = document.getElementById('confirm');
const entry = document.getElementById('entry');
const cities = JSON.parse(localStorage.getItem('cities'));
function getInput() {
    var input = '';
    if (entry.value != '') {
        input = entry.value;
    } else {
        window.alert('Please, type a new entry before proceeding');
        return;
    }
    return input;
};

async function currentWeatherData(location) {
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=12135702e5f184ed44083de9995aa360`);
    const output = await data.json();
    let date = new Date(output.dt * 1000);
    date = JSON.stringify(date);
    const editW = {
        date: "",
        icon: "",
        temp: 0,
        wind: 0,
        hum: 0
    };
    let date2 = '';
    for (let i = 1; i < 11; i++) {
        date2 += date.charAt(i);
    };
    editW.date = date2;
    editW.icon = output.weather[0].icon;
    editW.temp = Math.ceil((output.main.temp - 273.15) * 9/5 + 32);
    editW.wind = output.wind.speed;
    editW.hum = output.main.humidity;
    var info = document.querySelectorAll('section.info ul li');
    info[0].innerText = `${location} (${editW.date})  `;
    var icon = info[0].appendChild(document.createElement('img'));
    icon.setAttribute('src', `https://openweathermap.org/img/w/${editW.icon}.png`);
    info[1].innerText = `Temperature: ${editW.temp} °F`;
    info[2].innerText = `Wind speed: ${editW.wind} MPH`;
    info[3].innerText = `Humidity: ${editW.hum} %`;
};

async function forecastWeatherData(location) {
    const data = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&exclude=hourly,minutely&appid=12135702e5f184ed44083de9995aa360`);
    const output = await data.json();
    var x = 1;
    var y = 0;
    let date2 = '';
    var forecast = document.querySelector('section.dashboard');
    days = forecast.querySelectorAll('ul');
    for (i = 6; i < 35; i += 7) {
        var li = days[y].querySelectorAll('li');
        let date = new Date(output.list[i].dt * 1000);
        date = JSON.stringify(date);
        for (let j = 1; j < 11; j++) {
            date2 += date.charAt(j);
        }
        li[0].innerText = `${date2}`;
        li[1].innerText = "";
        var icon = li[1].appendChild(document.createElement('img'));
        icon.setAttribute('src', `https://openweathermap.org/img/w/${output.list[i].weather[0].icon}.png`);
        li[2].innerText = `Temp: ${Math.ceil((output.list[i].main.temp - 273.15) * 9/5 + 32)} °F`;
        li[3].innerText = `Wind: ${output.list[i].wind.speed} MPH`;
        li[4].innerText = `Hum: ${output.list[i].main.humidity} %`;
        date2 = '';
        x++;
        y++;
    };
};

function addEntries(location) {
    if (cities != null) {
        cities.push(location);
        for (i = 0; i < cities.length; i++) {
            var render = document.getElementById('cities').appendChild(document.createElement('button'));
            render.setAttribute('style', 'margin-left: 20px; width: 200px; height: 35px; border-radius: 50px; margin-top: 10%;');
            render.setAttribute('onclick', `{currentWeatherData(${cities[i]}); forecastWeatherData(${cities[i]});}`);
            render.innerHTML(`${cities[0]}`);
        };
    } else {
        var cities = [];
        cities.push(location);
        var render = document.getElementById('cities').appendChild(document.createElement('button'));
        render.setAttribute('style', 'margin-left: 20px; width: 200px; height: 35px; border-radius: 50px; margin-top: 10%;');
        render.setAttribute('onclick', `{currentWeatherData(${cities[0]}); forecastWeatherData(${cities[0]});}`);
        render.innerHTML(`${cities[0]}`);
    };
    localStorage.setItem('cities', JSON.stringify(cities));
};

button.addEventListener('click', function (event) {
    event.preventDefault();
    currentWeatherData(getInput());
    forecastWeatherData(getInput());
    addEntries(getInput());
});
