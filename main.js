const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const APP_ID ='0105a09a';
const APP_KEY = '408f92e63c89a7dcca2501fedf077461';

searchForm.addEventListener('submit', handleFormSubmit);

async function handleFormSubmit(e) {
    e.preventDefault();
    const searchQuery = e.target.querySelector('input').value.trim();

    try {
        const results = await fetchRecipes(searchQuery);
        generateHTML(results);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        // Handle the error (e.g., display an error message to the user)
    }
}

async function fetchRecipes(searchQuery) {
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&to=40`;

    const response = await fetch(baseURL);

    if (!response.ok) {
        throw new Error(`Failed to fetch recipes. Status: ${response.status}`);
    }

    const data = await response.json();
    return data.hits;
}

function generateHTML(results) {
    const generatedHTML = results.map(result => `
        <div class="item">
            <img src="${result.recipe.image}" alt="${result.recipe.label}">
            <div class="food-details">
                <h1 class="title">${result.recipe.label}</h1>
                <a class="view-button" href="${result.recipe.url}">View Recipe</a>
            </div>
            <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
            <p class="item-data">Diet Label: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : 'No Data'}</p>
            <p class="item-data">Cuisine Label: ${result.recipe.cuisineType}</p>
        </div>
    `).join('');

    searchResultDiv.innerHTML = generatedHTML;
    console.log(generatedHTML);
}
