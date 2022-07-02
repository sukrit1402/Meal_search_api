const searchbtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeClosedbtn = document.getElementById('recipe-close-btn');

//event listner
searchbtn.addEventListener('click', getMealList);
mealList.addEventListener('click',getMealRecipe);
recipeClosedbtn.addEventListener('click',()=>{
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});
function getMealList() {
    let searchInputtext = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputtext}`)
        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                    <div class="meal-item"data-id="${meal.idMeal}" data>
                        <div class="meal-img">
                            <img src="${meal.strMealThumb}" alt="None">
                        </div>
                        <div class="meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href="#" class="recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `
                });
                mealList.classList.remove('notfound');
            }
            else{
                html="Sorry, we didn't find any Meal!";
                mealList.classList.add('notfound');
            }
            mealList.innerHTML=html;
        });

}
// get recipe of the meal
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}

// create a modal
function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html=`
    <h2 class="recipe-title">${meal.strMeal}</h2>
                        <p class="recipe-category">${meal.strCategory}</p>
                        <div class="recipe-instruct">
                            <h3>Instructions</h3>
                            <p>
                               ${meal.strInstructions} 
                            </p>
                        </div>
                        <div class="recipe-meal-img">
                            <img src="${meal.strMealThumb}" alt="">
                        </div>
                        <div class="recipe-link">
                            <a href="${meal.strYoutube}" target="blank">Watch Video</a>
                        </div>
    `;
    mealDetailsContent.innerHTML=html;
    mealDetailsContent.parentElement.classList.add('showRecipe');

    
}