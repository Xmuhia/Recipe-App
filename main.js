const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery='';
const APP_ID ='0105a09a';
const APP_KEY = '408f92e63c89a7dcca2501fedf077461';
const searchIcon = document.getElementById('search-icon');



searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    fetchAPI();
})



async function fetchAPI () {
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&to=40`;
    const response = await fetch(baseURL);
    const data = await response.json();
    console.log(data);
    generateHTML(data.hits);

}




function generateHTML(results) {
    
    let generatedHTML ='';
    results.map(result => {
        generatedHTML += 
        `
    <div class="item">
        <img src="${result.recipe.image}" alt="${searchQuery}">
        <div class="food-details">
            <h1 class="title">${result.recipe.label}</h1>
        <a class="view-button" href="${result.recipe.url}">View Recipe</a>
    </div>
  <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
  <p class="item-data">Diet Label: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : 'No Data' }</p>
  <p class="item-data">Cuisine Label: ${result.recipe.cuisineType}</p>
</div>
        `
    })
    searchResultDiv.innerHTML= generatedHTML;
    console.log(generatedHTML);
}

