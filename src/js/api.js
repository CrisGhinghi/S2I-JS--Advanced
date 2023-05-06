import axios from 'axios';

import { displayResults } from './chart.js';

// Funzione per recuperare i dati della città e visualizzarli
export async function performSearch() {
    // Recupero il valore dell'input della città e rimuovo gli spazi bianchi
    const cityInput = document.getElementById('city-input');
    const cityName = cityInput.value.trim();

    // Controllo se il nome della città è vuoto
    if (cityName.length === 0) {
        alert("Please, enter the name of a city.");
        return;
    }

    // Provo a recuperare i dati della città e a visualizzare i risultati
    try {
        const data = await fetchCityData(cityName);
        displayResults(data);
        cityInput.value = '';
    } catch (error) {
        console.error(error);
        alert(`Please, enter a valid city name. You can previw Teleport Cities here: "https://teleport.org/cities/".`);
    }
}

// Funzione per recuperare i dati della città utilizzando l'API Teleport
async function fetchCityData(cityName) {
    // Richiesta API per ottenere informazioni sulla città
    const response = await axios.get(`https://api.teleport.org/api/cities/?search=${cityName}`);
    const data = response.data;

    // Controllo se la città è stata trovata
    if (data.count === 0) {
        throw new Error("Città non trovata.");
    }

    // Estraggo l'ID della città e l'URL dell'area urbana
    const cityId = data._embedded["city:search-results"][0]._links["city:item"].href;
    const cityResponse = await axios.get(cityId);
    const cityData = cityResponse.data;

    // Recupero i dati del punteggio dell'area urbana
    const urbanAreaId = cityData._links["city:urban_area"].href;
    const urbanAreaScoresResponse = await axios.get(`${urbanAreaId}scores/`);
    const urbanAreaScoresData = urbanAreaScoresResponse.data;

     // Recupero l'URL dell'immagine dell'area urbana
    const urbanAreaSlug = cityData._links["city:urban_area"].href.split('/').slice(-2)[0];
    const urbanAreaImagesResponse = await axios.get(`https://api.teleport.org/api/urban_areas/${urbanAreaSlug}/images/`);
    const urbanAreaImagesData = urbanAreaImagesResponse.data;

    // Restituisco i dati della città
    return {
        teleport_cityName: data._embedded["city:search-results"][0].matching_full_name,
        teleport_city_score: urbanAreaScoresData.teleport_city_score,
        summary: urbanAreaScoresData.summary,
        categories: urbanAreaScoresData.categories,
        imageUrl: urbanAreaImagesData.photos[0].image.web
    };
}