// Questo modulo contiene le funzioni per la gestione dell'interfaccia utente
export function initializeUI(homeImage, performSearchCallback) {
    // Recupero gli elementi del DOM
    const searchBtn = document.getElementById('search-btn');
    const cityInput = document.getElementById('city-input');
    const resultsDiv = document.getElementById('results');
    const title = document.getElementById('title');
    const headerImage = document.getElementById('header-image');

    // Imposto l'immagine dell'intestazione
    headerImage.src = homeImage;

    // Aggiungo un gestore di eventi al titolo
    title.addEventListener('click', () => {
        // Ripristino il contenuto di resultsDiv e l'input della città
        resultsDiv.innerHTML = '';
        cityInput.value = '';

        // Mostro l'input della città e il pulsante di ricerca
        cityInput.style.display = 'inline-block';
        searchBtn.style.display = 'inline-block';

        // Ripristino l'immagine dell'intestazione
        document.getElementById('header-image').src = homeImage;
    });

    // Aggiungo un gestore di eventi al pulsante di ricerca
    searchBtn.addEventListener('click', () => {
        // Eseguo la funzione di callback di ricerca
        performSearchCallback();
    });

    // Aggiungo un gestore di eventi all'input della città
    cityInput.addEventListener('keydown', (event) => {
        // Verifico se è stato premuto il tasto 'Enter'
        if (event.key === 'Enter') {
            // Impedisco il comportamento predefinito del tasto 'Enter'
            event.preventDefault();

            // Eseguo la funzione di callback di ricerca
            performSearchCallback();
        }
    });
}