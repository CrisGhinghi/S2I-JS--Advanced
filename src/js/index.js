// Importo i file CSS
import '../css/style.css';
import '../css/mobile.css';

// Importo l'immagine dell'intestazione della home
import homeImage from '../img/home.jpg';

// Importo le funzioni del modulo UI e API
import { initializeUI } from './ui.js';
import { performSearch } from './api.js';

// Inizializzo l'interfaccia utente
initializeUI(homeImage, performSearch);