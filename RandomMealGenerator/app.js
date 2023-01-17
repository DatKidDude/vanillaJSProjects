const btn = document.querySelector("button");

btn.addEventListener("click", getMeal);

async function getMeal() {
  // fetch a random meal from the api
  const url = "https://www.themealdb.com/api/json/v1/1/random.php";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const data = await response.json();
    const meals = data.meals[0];
    displayResults(meals);
  } catch (error) {
    console.log(error);
  }
}

function displayResults(meals) {
  const mealContainer = document.querySelector(".meal-container");
  const ingredients = [];

  console.log(meals);
  for (let i = 1; i <= 20; i++) {
    if (meals[`strIngredient${i}`]) {
      ingredients.push(
        `${meals[`strIngredient${i}`]} - ${meals[`strMeasure${i}`]}`
      );
    }
  }

  const innerHtml = `
  <h2>${meals.strMeal}</h2>
  <div class="meal-img">
    <img
      src="${meals.strMealThumb}"
      alt="${meals.strMeal}"
    />
  </div>
  <div class="tags">
    ${
      meals.strCategory
        ? `<p><span class="bold">Category:</span>${meals.strCategory}</p>`
        : ""
    }
    
    ${
      meals.strArea
        ? `<p><span class="bold">Area:</span>${meals.strArea}</p>`
        : ""
    }

    ${
      meals.strTags
        ? `<p><span class="bold">Tags:</span>${meals.strTags
            .split(",")
            .join(", ")}</p>`
        : ""
    }
  </div>
  <div class="ingredients">
    <h3>Ingredients</h3>
    <ul>
      ${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
    </ul>
  </div>
  <div class="meal-instructions">
    <h3>Instructions</h3>
    <p>
      ${meals.strInstructions}
    </p>
  </div>
  <div class="meal-video">
    <h3>Video Recipe</h3>
    <div class="video-wrapper">
      <iframe
        src="${meals.strYoutube}"
        frameborder="0"
      ></iframe>
    </div>
  </div>
  `;

  mealContainer.innerHTML = innerHtml;
}
