document.addEventListener('DOMContentLoaded', () => {
    fetchTopMovers();
});

async function fetchTopMovers() {
    console.log("Fetching top movers...");
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data); // Log the data to check if it's being fetched correctly

        const sortedData = data.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
        const topGainers = sortedData.slice(0, 5);
        const topLosers = sortedData.slice(-5).reverse();
        
        displayMovers(topGainers, topLosers);
    } catch (error) {
        console.error('Error fetching crypto data:', error);
    }
}

function displayMovers(gainers, losers) {
    const gainersList = document.getElementById('gainers-list');
    const losersList = document.getElementById('losers-list');

    // Clear any existing content
    gainersList.innerHTML = '';
    losersList.innerHTML = '';

    // Display Top Gainers
    gainers.forEach(coin => {
        const listItem = document.createElement('li');
        listItem.classList.add('border-b', 'pb-4');
        listItem.innerHTML = `
            <span class="font-semibold">${coin.name}</span>
            <span class="text-green-500">+${coin.price_change_percentage_24h.toFixed(2)}%</span>
        `;
        gainersList.appendChild(listItem);
    });

    // Display Top Losers
    losers.forEach(coin => {
        const listItem = document.createElement('li');
        listItem.classList.add('border-b', 'pb-4');
        listItem.innerHTML = `
            <span class="font-semibold">${coin.name}</span>
            <span class="text-red-500">${coin.price_change_percentage_24h.toFixed(2)}%</span>
        `;
        losersList.appendChild(listItem);
    });
}
