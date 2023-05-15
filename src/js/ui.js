// This module contains functions for managing the user interface
export function initializeUI(homeImage, performSearchCallback) {
    // Recupero gli elementi del DOM
    const searchBtn = document.getElementById('search-btn');
    const cityInput = document.getElementById('city-input');
    const resultsDiv = document.getElementById('results');
    const title = document.getElementById('title');
    const headerImage = document.getElementById('header-image');

    // set the header image
    headerImage.src = homeImage;

    // add an event handler to the title
    title.addEventListener('click', () => {
        // reset the contents of resultsDiv and the city input
        resultsDiv.innerHTML = '';
        cityInput.value = '';

        // display the city input and search button
        cityInput.style.display = 'inline-block';
        searchBtn.style.display = 'inline-block';

        // reset the header image
        document.getElementById('header-image').src = homeImage;
    });

    // add an event handler to the search button
    searchBtn.addEventListener('click', () => {
        // execute the search callback function
        performSearchCallback();
    });

    // add an event handler to the city input
    cityInput.addEventListener('keydown', (event) => {
        // check if the 'Enter' key was pressed
        if (event.key === 'Enter') {
            // prevent the default behavior of the 'Enter' key
            event.preventDefault();

            // execute the search callback function
            performSearchCallback();
        }
    });
}
