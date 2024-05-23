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
