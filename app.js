// Function to fetch a random meal
function fetchRandomMeal() {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
        .then(randomMealData => {
            displayRandomMeal(randomMealData);
        })
        .catch(error => {
            console.error('Error fetching random meal:', error);
        });
}

// Function to display details of a random meal
function displayRandomMeal(randomMealData) {
    // Display basic meal information
    let mealInfoHTML = `<p id="surprice">Surprise Dish</p>
        <div id="randomMealDescription">
            <img src="${randomMealData.meals[0].strMealThumb}" alt="dish" id="dish">
            <span class="pre">
            <br>
            ${randomMealData.meals[0].strMeal}
            <br>
            <br>
            Cuisine: ${randomMealData.meals[0].strArea}
            <br>
            Category: ${randomMealData.meals[0].strCategory}
            </span>
        </div>`;

    // Display ingredients
    let ingredientsList = "<pre>";
    for (let i = 1; i <= 20; i++) {
        const ingredient = randomMealData.meals[0][`strIngredient${i}`];
        const measure = randomMealData.meals[0][`strMeasure${i}`];
        if (ingredient && measure) {
            ingredientsList += `${measure} ${ingredient}\n`;
        }
    }
    ingredientsList += "</pre>";

    let mealDetailsHTML = `
        <p>${randomMealData.meals[0].strMeal}</p>
        <p id="Video"><a href="${randomMealData.meals[0].strYoutube}">Recipe Video</a></p>
        <p>Ingredients</p>
        ${ingredientsList}`;

    // Display meal information and ingredients
    document.querySelector(".randomMeal").innerHTML = mealInfoHTML;
    document.querySelector("#randomIngredients").innerHTML = mealDetailsHTML;

    // Add click event listener to toggle ingredients visibility
    document.querySelector("#randomMealDescription").addEventListener('click', () => {
        document.querySelector("#randomIngredients").style.display = "block"
    });
    document.querySelector("#randomIngredients").addEventListener('click',()=>{
        document.querySelector("#randomIngredients").style.display = "none"
    })
}


// Function to handle the search functionality
function searchMeal() {
    const searchValue = document.querySelector('#searchBar').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchValue}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
        .then(searchMealData => {
            displaySearchResults(searchMealData);
            
        })
        .catch(error => {
            console.error('Error fetching search results:', error);
        });
}

// Function to display search results
function displaySearchResults(searchMealData) {
    let a  = `<p id = "price2">Search Results</p>`
    let searchDataHTML = "";
    if (searchMealData.meals) {
        searchMealData.meals.forEach(meal => {
            searchDataHTML += `
                <div id="randomMeal">
                    <div class="randomMealDescription" data-mealid="${meal.idMeal}">
                        <img src="${meal.strMealThumb}" alt="dish" id="dish">
                        <p class="abcd">${meal.strMeal}</p>
                    </div>
                </div>`;
        });
    } else {
        searchDataHTML = `<p class="pre">No results found</p>`;
    }
    document.querySelector('#r').innerHTML = a;
    document.querySelector('.search2').innerHTML = searchDataHTML;
    

    // Attach event listeners after elements are created
    const mealDescriptions = document.querySelectorAll('.randomMealDescription');
    mealDescriptions.forEach(description => {
        description.addEventListener('click', () => {
            const mealId = description.getAttribute('data-mealid');
            fetchMealIngredients(mealId);
        });
    });
}

// Function to fetch and display meal ingredients
function fetchMealIngredients(idMeal) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
        .then(searchMealDetails => {
            displayMealIngredients(searchMealDetails);
            document.querySelector('.searchIngredients').style.display = 'block'
            window.scrollTo({
                top: 100,
                behavior: 'smooth'
            });
        })
        .catch(error => {
            console.error('Error fetching meal ingredients:', error);
        });
}

// Function to display meal ingredients
function displayMealIngredients(searchMealDetails) {
    document.querySelector('.searchIngredients').addEventListener('click',()=>{
        document.querySelector('.searchIngredients').style.display = 'none'
    })
    let ingredientsList = "<pre>";
    for (let i = 1; i <= 20; i++) {
        const ingredient = searchMealDetails.meals[0][`strIngredient${i}`];
        const measure = searchMealDetails.meals[0][`strMeasure${i}`];
        if (ingredient && measure) {
            ingredientsList += `${measure} ${ingredient}\n`;
        }
    }
    ingredientsList += "</pre>";

    const ingredientsHTML = `
    <span class="pre">${searchMealDetails.meals[0].strMeal}</span>    
    <pre>
    Cuisine : ${searchMealDetails.meals[0].strArea}
    Category : ${searchMealDetails.meals[0].strCategory}
    <p id="Video"><a href="${searchMealDetails.meals[0].strYoutube}">Recipe Video</a></p>
        
    Ingredients
        </pre>
        ${ingredientsList}`;
    document.querySelector('.searchIngredients').innerHTML = ingredientsHTML;
    
}

// Event listener for search button click
document.querySelector('#searchButton').addEventListener('click', () => {
    searchMeal();
    
});

// Initial call to fetch a random meal
fetchRandomMeal();
