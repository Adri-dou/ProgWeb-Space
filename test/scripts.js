document.addEventListener("DOMContentLoaded", function() {
    const apiKey = 'DEMO_KEY';  // Remplacez 'DEMO_KEY' par votre clé API de la NASA
    const apodContainer = document.getElementById('apod-container');

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
            apodItem.innerHTML = `
                <img src="${data.url}" alt="${data.title}">
                <p>${data.title}</p>
            `;
            apodContainer.appendChild(apodItem);
        });
    }

    fetchLastThreeApods();
});
