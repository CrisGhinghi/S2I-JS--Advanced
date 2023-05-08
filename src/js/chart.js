import Chart from 'chart.js/auto';

export async function displayResults(data) {
    // Recupero l'elemento immagine dell'header
    const headerImage = document.getElementById('header-image');
    headerImage.src = data.imageUrl;

    // Creo il contenitore del grafico e dell'elemento canvas
    const resultsDiv = document.getElementById('results');
    const chartContainer = document.createElement('div');
    chartContainer.classList.add('chart-container');
    const chartCanvas = document.createElement('canvas');
    chartContainer.appendChild(chartCanvas);

    // Mappo i dati delle categorie per il grafico
    const categories = data.categories.map(category => {
        return {
            label: category.name,
            data: [category.score_out_of_10],
            backgroundColor: category.color
        };
    });

    // Creo un grafico a barre con Chart.js
    const chart = new Chart(chartCanvas, {
        type: 'bar',
        data: {
            labels: [''],
            datasets: categories
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Quality of life by category, mouse over to view details:',
                    font: {
                        size: 22
                    }
                },
                legend: {
                    display: false,
                }
            },
            scales: {
                y: {
                    min: 0,
                    max: 10
                }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });

    // Creo l'elemento immagine della città
    const cityImage = document.createElement('img');
    cityImage.src = data.imageUrl;
    cityImage.style.width = '100%';
    cityImage.style.height = 'auto';

    // Imposto il contenuto HTML per i risultati della città
    resultsDiv.innerHTML = `
        <h1>${data.teleport_cityName}</h1>
        <h3>Teleport City Score</h3>
        <h2>${data.teleport_city_score.toFixed(2)}</h2>
        <p>${data.summary}</p>
    `;

    // Aggiungo il contenitore del grafico al div dei risultati
    resultsDiv.appendChild(chartContainer);
}