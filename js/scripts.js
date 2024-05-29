document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Merci pour votre message ! Nous vous répondrons bientôt.');
        contactForm.reset();
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const points = document.querySelectorAll('.point');
    const infoDisplay = document.getElementById('info-display');

    points.forEach(point => {
        point.addEventListener('mouseover', function() {
            const info = point.getAttribute('data-info');
            infoDisplay.textContent = info;
            infoDisplay.style.opacity = 1;
        });
        point.addEventListener('mouseout', function() {
            infoDisplay.textContent = 'Survolez un point pour voir une information amusante.';
            infoDisplay.style.opacity = 0.5;
        });
    });
});


async function fetchAstreInfo() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const url = `https://api.le-systeme-solaire.net/rest/bodies/${searchInput}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Astre non trouvé');
        }
        const data = await response.json();
        displayAstreInfo(data);
    } catch (error) {
        alert(error.message);
    }
}

function displayAstreInfo(data) {
    const resultTable = document.getElementById('resultTable').getElementsByTagName('tbody')[0];
    resultTable.innerHTML = '';  // Clear previous results

    const properties = [
        { name: 'Nom', value: data.englishName },
        { name: 'Type', value: data.isPlanet ? 'Planète' : 'Autre' },
        { name: 'Masse (kg)', value: data.mass ? `${data.mass.massValue} x 10^${data.mass.massExponent}` : 'N/A' },
        { name: 'Volume (km^3)', value: data.vol ? `${data.vol.volValue} x 10^${data.vol.volExponent}` : 'N/A' },
        { name: 'Gravité (m/s²)', value: data.gravity || 'N/A' },
        { name: 'Rayon moyen (km)', value: data.meanRadius || 'N/A' },
        { name: 'Température moyenne (K)', value: data.avgTemp || 'N/A' },
        { name: 'Période orbitale (jours)', value: data.sideralOrbit || 'N/A' },
        { name: 'Période de rotation (heures)', value: data.sideralRotation || 'N/A' }
    ];

    properties.forEach(prop => {
        const row = resultTable.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.innerHTML = prop.name;
        cell2.innerHTML = prop.value;
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const apiKey = 'DEMO_KEY';  // Remplacez 'DEMO_KEY' par votre clé API de la NASA
    const apodContainer = document.getElementById('apod-api');

    async function fetchApodData(date) {
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`);
        const data = await response.json();
        return data;
    }

    async function fetchLastThreeApods() {
        const dates = [];
        for (let i = 0; i < 3; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const formattedDate = date.toISOString().split('T')[0];
            dates.push(formattedDate);
        }

        const apodDataPromises = dates.map(date => fetchApodData(date));
        const apodData = await Promise.all(apodDataPromises);

        apodData.forEach(data => {
            const apodItem = document.createElement('div');
            apodItem.className = 'apod-item';
            if (data.media_type === 'image') {
                apodItem.innerHTML = `
                    <img src="${data.url}" alt="${data.title}">
                    <p>${data.title}</p>
                `;
            } else if (data.media_type === 'video') {
                apodItem.innerHTML = `
                    <iframe src="${data.url}" frameborder="0" allowfullscreen></iframe>
                    <p>${data.title}</p>
                `;
            } else {
                apodItem.innerHTML = `
                    <p>Contenu multimédia non pris en charge</p>
                `;
            }
            apodContainer.appendChild(apodItem);
        });
    }

    fetchLastThreeApods();
});

