//random meal
fetch("https://www.themealdb.com/api/json/v1/1/random.php")
.then((data)=>{
    return data.json()
})
.then((randomMealData)=>{
    console.log(randomMealData)
    let data1 = ""
    data1 += `
              <p id="surprice">Surprise Dish</p>
              <div id="randomMealDescription">
              <img src="${randomMealData.meals[0].strMealThumb}" alt="dish" id="dish">
              <pre>
${randomMealData.meals[0].strMeal}

Cuisine : ${randomMealData.meals[0].strArea}
Category : ${randomMealData.meals[0].strCategory}
             </pre>
             </div>`
    document.querySelector(".randomMeal").innerHTML = data1
    let ingredientsList = `<pre>`
    for (let i in randomMealData){
        
    }
    let data2 = ""
    data2 += `<p>Kentucky Fried Chicken</p>
    <p>Recipe Video</p>
    <p>Ingredients</p>
    <pre>
1 whole Chicken   
1 Egg White
2 quarts neutral frying Oil
1 tablespoon Brown Sugar
1 1/2 cups Flour 
1 tablespoon Onion Salt
1 tablespoon Paprika
1 teaspoons Black Pepper
2 teaspoons Chilly Powder
1/2 teaspoons Sage 
1 teaspoons Celery Powder
1/2 teaspoons All Spices
1/2 teaspoons Garlic Powder
1/2 teaspoons Marjoram
1/2 teaspoons Oregano
    </pre>`
    document.querySelector(".ingredients").innerHTML = data2
    document.querySelector("#randomMealDescription").addEventListener('click',()=>{
        document.querySelector(".ingredients").style.display = "block"
    })
    document.querySelector(".ingredients").addEventListener('click',()=>{
        document.querySelector(".ingredients").style.display = "none"
    })
})
