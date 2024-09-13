let isCelsius = true;

document.getElementById('location-form').addEventListener('submit', function(event) {
    event.preventDefault();
    getWeather();
});

document.getElementById('toggle-temp').addEventListener('click', function() {
    toggleTemperature();
});

async function getWeather() {
    const location = document.getElementById('location-input').value;
    const apiKey = 'e7e66d953d0b4b67a2f213327242308'; 
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;
  
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        // Check if the location is valid
        if (data.error) {
            document.getElementById('weather-info').innerText = "Location not found.";
        } else {
            displayWeather(data);
        }
    } catch (error) {
        console.error("Error fetching the weather data:", error);
        document.getElementById('weather-info').innerText = "Error fetching data.";
    }
}

function displayWeather(data) {
    const weatherDiv = document.getElementById('weather-info');
    const { name, region, country } = data.location;
    const { temp_c, temp_f, condition } = data.current;

    weatherDiv.innerHTML = `
        <h2>${name}, ${region}, ${country}</h2>
        <p id="temperature">Temperature: ${isCelsius ? `${temp_c}°C` : `${temp_f}°F`}</p>
        <p>Condition: ${condition.text}</p>
        <img src="${condition.icon}" alt="${condition.text}">
    `;
}

function toggleTemperature() {
    const temperatureElement = document.getElementById('temperature');
    if (temperatureElement) {
        const tempText = temperatureElement.textContent;
        if (isCelsius) {
            const temp_f = tempText.match(/(\d+(\.\d+)?)°C/)[1];
            temperatureElement.textContent = tempText.replace(`${temp_f}°C`, `${convertToFahrenheit(temp_f)}°F`);
        } else {
            const temp_c = tempText.match(/(\d+(\.\d+)?)°F/)[1];
            temperatureElement.textContent = tempText.replace(`${temp_c}°F`, `${convertToCelsius(temp_c)}°C`);
        }
        isCelsius = !isCelsius;
    }
}

function convertToFahrenheit(celsius) {
    return (celsius * 9/5 + 32).toFixed(2);
}

function convertToCelsius(fahrenheit) {
    return ((fahrenheit - 32) * 5/9).toFixed(2);
}
