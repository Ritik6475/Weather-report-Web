document.addEventListener("DOMContentLoaded", async function() {
    const searchForm = document.getElementById('searchForm');
    searchForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const city = document.getElementById('cityInput').value;
        await fetchData(city);
    });

    // Default city
    await fetchData("indore");
});

async function fetchData(city) {
    const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + city;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '344993a80bmshca72bf1a2dfb19dp19d224jsn8c64ee7f66ce',
            'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
        document.getElementById('changable').textContent = '' +  city;
        
        document.getElementById('temp').textContent = 'Temperature: ' + data.temp + '°C';
        document.getElementById('minTemp').textContent = 'Min Temperature: ' + data.min_temp + '°C';
        document.getElementById('maxTemp').textContent = 'Max Temperature: ' + data.max_temp + '°C';

        document.getElementById('humidity').textContent = 'Humidity: ' + data.humidity + '%';
        document.getElementById('feelsLike').textContent = 'Feels Like: ' + data.feels_like + '°C';

        document.getElementById('windSpeed').textContent = 'Wind Speed: ' + data.wind_speed + ' m/s';
        document.getElementById('windDegrees').textContent = 'Wind Degrees: ' + data.wind_degrees + '°';

        
        document.getElementById('sunrise').textContent = 'Sunrise: ' + convertUnixToIST(data.sunrise);
        document.getElementById('sunset').textContent = 'Sunset: ' +  convertUnixToIST(data.sunset);
        

    } catch (error) {
        console.error(error);
    }
}

function convertUnixToIST(unixTimestamp) {
    // Convert UNIX timestamp to milliseconds
    const milliseconds = unixTimestamp * 1000;
    
    // Create a new Date object using the UNIX timestamp
    const date = new Date(milliseconds);
    
    // Get the hours, minutes, and seconds in UTC
    let hoursUTC = date.getUTCHours();
    let minutesUTC = date.getUTCMinutes();
    const secondsUTC = date.getUTCSeconds();
    
    // Adjust for IST (UTC+5:30)
    hoursUTC += 5;
    minutesUTC += 30;

    // If minutes exceed 59, adjust hours and minutes
    if (minutesUTC > 59) {
        hoursUTC += Math.floor(minutesUTC / 60);
        minutesUTC %= 60;
    }

    // Format the time
    const timeString = `${hoursUTC.toString().padStart(2, '0')}:${minutesUTC.toString().padStart(2, '0')}:${secondsUTC.toString().padStart(2, '0')}`;

    return timeString;
}

let isDarkMode = false;
let previousBackgroundImage = document.body.style.backgroundImage;
let previousBackgroundColor = document.body.style.backgroundColor;

const darkButton = document.getElementById('dark');

darkButton.addEventListener('click', function() {
    if (!isDarkMode) {
        // Remove background image and set background color to black
        document.body.style.backgroundImage = 'none';
        document.body.style.backgroundColor = 'black';
        isDarkMode = true;
    } else {
        // Restore previous background image and color
        document.body.style.backgroundImage = previousBackgroundImage;
        document.body.style.backgroundColor = previousBackgroundColor;
        isDarkMode = false;
    }
});