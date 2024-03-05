document.addEventListener('DOMContentLoaded', function () {
    const countryCard = document.getElementById('country-card');

    // Fetch country data from Restcountries API
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(countries => {
            // Select a random country from the response
            const randomCountry = countries[Math.floor(Math.random() * countries.length)];

            // Extract necessary data
            const { capital, region, latlng, name, flags, cca2 } = randomCountry;

            // Display data in Bootstrap card
            countryCard.innerHTML = `
                <img src="${flags.png}" class="card-img-top" alt="${name.common} Flag">
                <div class="card-body">
                    <h5 class="card-title">${name.common}</h5>
                    <p class="card-text">Capital: ${capital}</p>
                    <p class="card-text">Region: ${region}</p>
                    <p class="card-text">Latlng: ${latlng.join(', ')}</p>
                    <p class="card-text">Country Code: ${cca2}</p>
                </div>
            `;

            // Fetch weather data from OpenWeatherMap API using latlng
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=YOUR_OPENWEATHERMAP_API_KEY`)
                .then(response => response.json())
                .then(weatherData => {
                    // Extract necessary weather data
                    const { main, description } = weatherData.weather[0];

                    // Append weather data to the Bootstrap card
                    const cardBody = countryCard.querySelector('.card-body');
                    const weatherInfo = document.createElement('p');
                    weatherInfo.classList.add('card-text');
                    weatherInfo.textContent = `Weather: ${main} (${description})`;
                    cardBody.appendChild(weatherInfo);
                })
                .catch(error => console.error('Error fetching weather data:', error));
        })
        .catch(error => console.error('Error fetching country data:', error));
});
