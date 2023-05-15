import Chart from 'chart.js/auto';

export async function displayResults(data) {
    // retrieve the header image element
    const headerImage = document.getElementById('header-image');
    headerImage.src = data.imageUrl;

    // create the chart container and canvas element
    const resultsDiv = document.getElementById('results');
    const chartContainer = document.createElement('div');
    chartContainer.classList.add('chart-container');
    const chartCanvas = document.createElement('canvas');
    chartContainer.appendChild(chartCanvas);

    // map the category data for the chart
    const categories = data.categories.map(category => {
        return {
            label: category.name,
            data: [category.score_out_of_10],
            backgroundColor: category.color
        };
    });

    // create a bar chart with Chart.js
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

    // create the city image element
    const cityImage = document.createElement('img');
    cityImage.src = data.imageUrl;
    cityImage.style.width = '100%';
    cityImage.style.height = 'auto';

    // set the HTML content for the city results
    resultsDiv.innerHTML = `
        <h1>${data.teleport_cityName}</h1>
        <h3>Teleport City Score</h3>
        <h2>${data.teleport_city_score.toFixed(2)}</h2>
        <p>${data.summary}</p>
    `;

    // add the chart container to the results div
    resultsDiv.appendChild(chartContainer);
}
