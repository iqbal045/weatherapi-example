const apiKey = '1df8200416a14cf2825182117231906';

// Function to retrieve weather data from the API
const getWeatherData = async (location) => {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`);
    if (!response.ok) {
      throw new Error('Weather data not available');
    }
    const data = await response.json();
    return data.current;
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
};

// Function to display weather information on the web page
const displayWeatherInfo = (weather) => {
  const weatherInfo = document.getElementById('weatherInfo');
  weatherInfo.innerHTML = `
    <h3>${weather.temp_c}°C</h3>
    <p>${weather.condition.text}</p>
    <p>Humidity: ${weather.humidity}%</p>
    <p>Wind: ${weather.wind_kph} km/h</p>
  `;
};

// Function to handle the button click event
const handleButtonClick = async () => {
  const locationInput = document.getElementById('locationInput');
  const location = locationInput.value.trim();
  if (location === '') {
    alert('Please enter a location');
    return;
  }

  try {
    const weather = await getWeatherData(location);
    displayWeatherInfo(weather);
  } catch (error) {
    alert('Failed to fetch weather data');
  }
};

// Add event listener to the button
const getWeatherBtn = document.getElementById('getWeatherBtn');
getWeatherBtn.addEventListener('click', handleButtonClick);
