// import the CSS files
import '../css/style.css';
import '../css/mobile.css';

// import the homepage header image
import homeImage from '../img/home.jpg';

// import the UI and API module functions
import { initializeUI } from './ui.js';
import { performSearch } from './api.js';

// initialize the user interface
initializeUI(homeImage, performSearch);
