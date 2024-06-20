const button = document.getElementById('confirm');
const entry = document.getElementById('entry');

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
    console.log(info);
    info[0].innerText = `${location} ${editW.date} ${editW.icon}`;
    info[1].innerText = `Temperature: ${editW.temp} °F`;
    info[2].innerText = `Wind speed: ${editW.wind} mil/h`;
    info[3].innerText = `Humidity: ${editW.hum}`;
};

async function forecastWeatherData(location) {
    const data = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&exclude=hourly,minutely&appid=12135702e5f184ed44083de9995aa360`);
    const output = await data.json();
    var x = 0;
    var days = [];
    let date2 = '';
    for (i = 0; i < 35; i+=7) {
        days[x] = {date: "", icon: "", temp: 0, wind: 0, hum: 0};
        let date = new Date(output.list[i].dt * 1000);
        date = JSON.stringify(date);
        for (let j = 1; j < 11; j++) {
            date2 += date.charAt(j);
        }
        days[x].date = date2;
        days[x].icon = output.list[i].weather[0].icon;
        days[x].temp = Math.ceil((output.list[i].main.temp - 273.15) * 9/5 + 32);
        days[x].wind = output.list[i].wind.speed;
        days[x].hum = output.list[i].main.humidity;
        date2 = '';
        x++;
    }
    return days;
};

function updateInfo(current) {
    var info = document.querySelectorAll('section.info ul li');
    console.log(info);
    info[0].innerText = `${current.date}`;
    info[1].innerText = `${current.temp}`;
    info[2].innerText = `${current.wind}`;
    info[3].innerText = `${current.hum}`;
};

button.addEventListener('click', function (event) {
    event.preventDefault();
    currentWeatherData(getInput());
});
