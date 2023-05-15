import axios from 'axios';

import { displayResults } from './chart.js';

// Function to retrieve city data and display it
export async function performSearch() {
    // retrieve the value of the city input and remove white spaces
    const cityInput = document.getElementById('city-input');
    const cityName = cityInput.value.trim();

    // check if the city name is empty
    if (cityName.length === 0) {
        alert("Please, enter the name of a city.");
        return;
    }

    // try to retrieve the city data and display the results
    try {
        const data = await fetchCityData(cityName);
        displayResults(data);
        cityInput.value = '';
    } catch (error) {
        console.error(error);
        alert(`Please, enter a valid city name. You can previw Teleport Cities here: "https://teleport.org/cities/".`);
    }
}

// Function to retrieve city data using the Teleport API
async function fetchCityData(cityName) {
    // API request to obtain information about the city
    const response = await axios.get(`https://api.teleport.org/api/cities/?search=${cityName}`);
    const data = response.data;

    // check if the city was found
    if (data.count === 0) {
        throw new Error("Città non trovata.");
    }

    // extract the city ID and the urban area URL
    const cityId = data._embedded["city:search-results"][0]._links["city:item"].href;
    const cityResponse = await axios.get(cityId);
    const cityData = cityResponse.data;

    // retrieve the urban area score data
    const urbanAreaId = cityData._links["city:urban_area"].href;
    const urbanAreaScoresResponse = await axios.get(`${urbanAreaId}scores/`);
    const urbanAreaScoresData = urbanAreaScoresResponse.data;

     // retrieve the urban area image URL
    const urbanAreaSlug = cityData._links["city:urban_area"].href.split('/').slice(-2)[0];
    const urbanAreaImagesResponse = await axios.get(`https://api.teleport.org/api/urban_areas/${urbanAreaSlug}/images/`);
    const urbanAreaImagesData = urbanAreaImagesResponse.data;

    // return the city data
    return {
        teleport_cityName: data._embedded["city:search-results"][0].matching_full_name,
        teleport_city_score: urbanAreaScoresData.teleport_city_score,
        summary: urbanAreaScoresData.summary,
        categories: urbanAreaScoresData.categories,
        imageUrl: urbanAreaImagesData.photos[0].image.web
    };
}
