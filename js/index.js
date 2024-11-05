/// <reference types="../@types/jquery" />

// Loading Screen

function showLoading() {
  $(".loading-screen").removeClass("d-none");
}

function hideLoading() {
  $(".loading-screen").addClass("d-none");
}

function openSideBar() {
  $("aside").animate({ left: "0" });
  $("aside .side-nav span").html("<i class='fa-solid fa-xmark'></i>");
  $("aside .side-tab ul li").animate({ top: "0" });
  $("aside .side-tab .side-links").animate({ left: "0" });
}
function cloeSideBar() {
  let sideBarWidth = $("aside .side-tab").innerWidth();
  let linksWidth = $("aside .side-tab .side-links").innerWidth();
  $("aside").animate({ left: -sideBarWidth });
  $("aside .side-nav span").html("<i class='fa-solid fa-bars'></i>");
  $("aside .side-tab ul li").animate({ top: "300px" });
  $("aside .side-tab .side-links").animate({ left: -linksWidth });
}

// SideBar

$("aside .side-nav span").on("click", function () {
  let sideBarWidth = $("aside .side-tab").innerWidth();
  if ($("aside").css("left") == `${-sideBarWidth}px`) {
    openSideBar();
  } else if ($("aside").css("left") == `0px`) {
    cloeSideBar();
  }
});

startAPP();
async function startAPP() {
  await getMeals();
  showDetailsPage();
  showSearchPage();
  showCategoriesPage();
  showAreaPage();
  showIngredientsPage();
  showContactPage();
}

// Details Page (Open-Close)

function showDetailsPage() {
  $(".row-item").on("click", function () {
    getDetails(this.id);
    $("#rowDefault").addClass("d-none");
    $("#search").addClass("d-none");
    $("#categories").addClass("d-none");
    $("#mealDetails").removeClass("d-none");
  });
}

function closeDetailsPage() {
  $(".top-content span").on("click", function () {
    $("#rowDefault").removeClass("d-none");
    $("#mealDetails").addClass("d-none");
  });
}

// Fetching Apis

async function getMeals() {
  showLoading();
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s="
  );
  const result = await response.json();
  const meals = result.meals;
  displayHome(meals);
  hideLoading();
}

async function getDetails(id) {
  showLoading();
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const result = await response.json();
  const details = result.meals;
  displayDetails(details);
  hideLoading();
}

async function getMealByName(term) {
  showLoading();
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
  const result = await response.json();
  const details = result.meals;
  displaySearchResults(details);
  hideLoading();
}

async function getMealByLetter(term) {
  showLoading();
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`
  );
  const result = await response.json();
  const details = result.meals;
  displaySearchResults(details);
  hideLoading();
}

async function getCategories() {
  showLoading();
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  const result = await response.json();
  const categoriesList = result.categories;
  displayCategories(categoriesList);
  hideLoading();
}

async function getCategoryByName(categoryName) {
  showLoading();
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
  );
  const result = await response.json();
  const categoryMeals = result.meals;
  displayCategoryByName(categoryMeals);
  hideLoading();
}

async function getAreas() {
  showLoading();
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  const result = await response.json();
  const areaList = result.meals;
  displayAreas(areaList);
  hideLoading();
}

async function getMealsByArea(areaName) {
  showLoading();
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`
  );
  const result = await response.json();
  const areaMeals = result.meals;
  displayMealsByArea(areaMeals);
  hideLoading();
}

async function getIngredients() {
  showLoading();
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  const result = await response.json();
  const ingredientsList = result.meals;
  displayIngredients(ingredientsList);
  hideLoading();
}

async function getMealsByIngredient(ingredientName) {
  showLoading();
  const response = await fetch(
    `https://themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`
  );
  const result = await response.json();
  const ingredientMeals = result.meals;
  displayMealsByIngredient(ingredientMeals);
  hideLoading();
}

// Displaying Data

function displayHome(arr) {
  let deafultMeals = ``;
  for (i = 0; i < arr.length; i++) {
    deafultMeals += `
                    <div class="col-md-3">
                        <div class="row-item position-relative" id="${arr[i].idMeal}">
                            <img src="${arr[i].strMealThumb}" class="w-100 rounded-2" alt="meal-img">
                            <div class="row-item-layer d-flex justify-content-start align-items-center position-absolute p-2 text-black rounded-2">
                                <h3>${arr[i].strMeal}</h3>
                            </div>
                        </div>
                    </div>
        `;
  }
  document.getElementById("rowDefault").innerHTML = deafultMeals;
}

function displayDetails(arr) {
  let deafultMeals = ``;
  for (i = 0; i < arr.length; i++) {
    const meal = arr[i];
    deafultMeals += `
                    <div class="col-md-4 px-4">
                        <img src="${meal.strMealThumb}" alt="meal-img" class="w-100 rounded-3 mb-2">
                        <h2>${meal.strMeal}</h2>
                    </div>
                    <div class="col-md-8">
                        <div class="top-content d-flex justify-content-between align-items-center">
                            <h2>Instructions</h2>
                            <span class="fs-2"><i class="fa-solid fa-xmark"></i></span>
                        </div>
                        <div class="main-details pe-5">
                            <p>${meal.strInstructions}</p>
                            <h3>Area : <span>${meal.strArea}</span></h3>
                            <h3>Category : <span>${meal.strCategory}</span></h3>
                            <h3 class="mb-3">Recipes :</h3>
                            <ul class="list-unstyled d-flex flex-wrap recipes" id="recipes">
                             `;
    for (i = 0; i < 20; i++) {
      const measure = meal[`strMeasure${i}`];
      const ingredient = meal[`strIngredient${i}`];
      if (measure && ingredient) {
        deafultMeals += `
                                        <li class="alert alert-info">${measure} ${ingredient}</li>
                                        `;
      }
    }
    deafultMeals += `   
                            </ul>
                            <h3 class="mb-3">Tags :</h3>
                            <ul class="list-unstyled d-flex flex-wrap tags" id="tags">
                             `;
    if (`${meal.strTags}`) {
      let tags = meal?.strTags?.split(",");
      if (!tags) {
        tags = [];
      }
      for (i = 0; i < tags.length; i++) {
        deafultMeals += `
                                        <li class="alert alert-danger">${tags[i]}</li>
    `;
      }
    }
    deafultMeals += `   
                            </ul>
                            <a href="${meal.strSource}" class="btn btn-success" target="_blank">Source</a>
                            <a href="${meal.strYoutube}" class="btn btn-danger" target="_blank">Youtube</a>
                        </div>
                    </div>
        `;
  }

  document.getElementById("mealDetails").innerHTML = deafultMeals;
  closeDetailsPage();
}

function displaySearchResults(arr) {
  let searchResult = ``;
  for (i = 0; i < arr.length; i++) {
    searchResult += `
                    <div class="col-md-3">
                        <div class="row-item position-relative" id="${arr[i].idMeal}">
                            <img src="${arr[i].strMealThumb}" class="w-100 rounded-2" alt="meal-img">
                            <div class="row-item-layer d-flex justify-content-start align-items-center position-absolute p-2 text-black rounded-2">
                                <h3>${arr[i].strMeal}</h3>
                            </div>
                        </div>
                    </div>
        `;
  }
  document.getElementById("searchRow").innerHTML = searchResult;
  showSearchDetails();
}

function displayCategories(arr) {
  let categoriesData = ``;
  for (i = 0; i < arr.length; i++) {
    categoriesData += `
            <div class="col-md-3">
                <div class="category-item position-relative" id="${
                  arr[i].idCategory
                }">
                    <img src="${
                      arr[i].strCategoryThumb
                    }" class="w-100 rounded-2" alt="meal-img">
                    <div class="category-item-layer d-flex flex-column justify-content-center align-items-center position-absolute p-2 text-black rounded-2 text-center">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.slice(" ", 135)}</p>
                    </div>
                </div>
            </div>
        `;
  }
  document.getElementById("categoriesRow").innerHTML = categoriesData;
  showCategoryMeals();
}

function displayCategoryByName(arr) {
  let categoryData = ``;
  for (i = 0; i < arr.length; i++) {
    categoryData += `
                    <div class="col-md-3">
                        <div class="row-item cat-by-name position-relative" id="${arr[i].idMeal}">
                            <img src="${arr[i].strMealThumb}" class="w-100 rounded-2" alt="meal-img">
                            <div class="row-item-layer d-flex justify-content-start align-items-center position-absolute p-2 text-black rounded-2">
                                <h3>${arr[i].strMeal}</h3>
                            </div>
                        </div>
                    </div>
        `;
  }
  document.getElementById("categoryByName").innerHTML = categoryData;
  showMealCategoryDetails();
}

function displayAreas(arr) {
  let areasData = ``;
  for (i = 0; i < arr.length; i++) {
    areasData += `
                    <div class="col-md-3">
                        <div class="area-item text-center">
                            <span class="area-icon"><i class="fa-solid fa-house-laptop"></i></span>
                            <h3>${arr[i].strArea}</h3>
                        </div>
                    </div>
          `;
  }
  document.getElementById("areaRow").innerHTML = areasData;
  showAreaMeals();
}

function displayMealsByArea(arr) {
  let areaData = ``;
  for (i = 0; i < arr.length; i++) {
    areaData += `
                      <div class="col-md-3">
                          <div class="row-item area-by-name position-relative" id="${arr[i].idMeal}">
                              <img src="${arr[i].strMealThumb}" class="w-100 rounded-2" alt="meal-img">
                              <div class="row-item-layer d-flex justify-content-start align-items-center position-absolute p-2 text-black rounded-2">
                                  <h3>${arr[i].strMeal}</h3>
                              </div>
                          </div>
                      </div>
          `;
  }
  document.getElementById("mealArea").innerHTML = areaData;
  showMealByAreaDetails();
}

function displayIngredients(arr) {
  let areasData = ``;
  for (i = 0; i < 20; i++) {
    areasData += `
                      <div class="col-md-3">
                          <div class="ingredient-item text-center" id="${arr[i].idIngredient}>
                              <span class="ingredient-icon"><i class="fa-solid fa-drumstick-bite fa-4x"></i></span>
                              <h3>${arr[i].strIngredient}</h3>
                              `;
    if (arr[i].strDescription) {
      areasData += `<p>${arr[i].strDescription.slice("", 98)}</p>`;
    }
    areasData += `                          
                              </div>
                      </div>
            `;
  }
  document.getElementById("ingredientsRow").innerHTML = areasData;
  showMealsByIngredient();
}

function displayMealsByIngredient(arr) {
  let ingredientData = ``;
  for (i = 0; i < arr.length; i++) {
    ingredientData += `
                      <div class="col-md-3">
                          <div class="row-item ingredient-by-item position-relative" id="${arr[i].idMeal}">
                              <img src="${arr[i].strMealThumb}" class="w-100 rounded-2" alt="meal-img">
                              <div class="row-item-layer d-flex justify-content-start align-items-center position-absolute p-2 text-black rounded-2">
                                  <h3>${arr[i].strMeal}</h3>
                              </div>
                          </div>
                      </div>
          `;
  }
  document.getElementById("mealByIngredient").innerHTML = ingredientData;
  showMealByIngredientDetails();
}

function showSearchDetails() {
  $("#searchRow .row-item").on("click", function () {
    getDetails(this.id);
    $("#rowDefault").addClass("d-none");
    $("#searchRow").addClass("d-none");
    $("#mealDetails").removeClass("d-none");
  });
}

function showCategoryMeals() {
  $(".category-item").on("click", function () {
    $("#categoriesRow").addClass("d-none");
    $("#categoryByName").removeClass("d-none");
    const categoryName = $(this).find("h3").text();
    getCategoryByName(categoryName);
  });
}

function showMealCategoryDetails() {
  $(".cat-by-name").on("click", function () {
    getDetails(this.id);
    $("#rowDefault").addClass("d-none");
    $("#mealDetails").removeClass("d-none");
    $("#search").addClass("d-none");
    $("#categories").addClass("d-none");
  });
}

function showAreaMeals() {
  $(".area-item").on("click", function () {
    $("#areaRow").addClass("d-none");
    $("#mealArea").removeClass("d-none");
    const areaName = $(this).find("h3").text();
    getMealsByArea(areaName);
  });
}

function showMealByAreaDetails() {
  $(".area-by-name").on("click", function () {
    getDetails(this.id);
    $("#rowDefault").addClass("d-none");
    $("#mealDetails").removeClass("d-none");
    $("#search").addClass("d-none");
    $("#categories").addClass("d-none");
    $("#area").addClass("d-none");
  });
}

function showMealsByIngredient() {
  $(".ingredient-item").on("click", function () {
    $("#ingredientsRow").addClass("d-none");
    $("#mealByIngredient").removeClass("d-none");
    const ingredientName = $(this).find("h3").text();
    getMealsByIngredient(ingredientName);
  });
}

function showMealByIngredientDetails() {
  $(".ingredient-by-item").on("click", function () {
    getDetails(this.id);
    $("#rowDefault").addClass("d-none");
    $("#mealDetails").removeClass("d-none");
    $("#search").addClass("d-none");
    $("#categories").addClass("d-none");
    $("#area").addClass("d-none");
    $("#ingredients").addClass("d-none");
  });
}

// Search Events

$("#searchByName").on("input", function () {
  //   $(".loading-screen").css("inset", "100px");
  getMealByName(this.value);
});

$("#searchByLetter").on("input", function () {
  //   $(".loading-screen").css("inset", "100px");
  getMealByLetter(this.value);
});

// SideBar Buttons Events

function showSearchPage() {
  $("#searchNav").on("click", function () {
    $("#rowDefault").addClass("d-none");
    $("#mealDetails").addClass("d-none");
    $("#search").removeClass("d-none");
    $("#searchRow").removeClass("d-none");
    $("#categories").addClass("d-none");
    $("#categoriesRow").addClass("d-none");
    $("#categoryByName").addClass("d-none");
    $("#area").addClass("d-none");
    $("#mealByIngredient").addClass("d-none");
    $("#ingredients").addClass("d-none");
    $("#ingredientsRow").addClass("d-none");
    $("#contact").addClass("d-none");
    cloeSideBar();
  });
}

function showCategoriesPage() {
  $("#categoriesNav").on("click", function () {
    getCategories();
    $("#rowDefault").addClass("d-none");
    $("#mealDetails").addClass("d-none");
    $("#search").addClass("d-none");
    $("#categories").removeClass("d-none");
    $("#categoriesRow").removeClass("d-none");
    $("#categoryByName").addClass("d-none");
    $("#area").addClass("d-none");
    $("#mealByIngredient").addClass("d-none");
    $("#ingredients").addClass("d-none");
    $("#ingredientsRow").addClass("d-none");
    $("#contact").addClass("d-none");
    cloeSideBar();
  });
}

function showAreaPage() {
  $("#areaNav").on("click", function () {
    getAreas();
    $("#rowDefault").addClass("d-none");
    $("#mealDetails").addClass("d-none");
    $("#search").addClass("d-none");
    $("#categories").addClass("d-none");
    $("#categoriesRow").addClass("d-none");
    $("#categoryByName").addClass("d-none");
    $("#area").removeClass("d-none");
    $("#areaRow").removeClass("d-none");
    $("#mealByIngredient").addClass("d-none");
    $("#ingredients").addClass("d-none");
    $("#ingredientsRow").addClass("d-none");
    $("#contact").addClass("d-none");
    cloeSideBar();
  });
}

function showIngredientsPage() {
  $("#ingNav").on("click", function () {
    getIngredients();
    $("#rowDefault").addClass("d-none");
    $("#mealDetails").addClass("d-none");
    $("#search").addClass("d-none");
    $("#categories").addClass("d-none");
    $("#categoriesRow").addClass("d-none");
    $("#categoryByName").addClass("d-none");
    $("#area").addClass("d-none");
    $("#mealByIngredient").addClass("d-none");
    $("#ingredients").removeClass("d-none");
    $("#ingredientsRow").removeClass("d-none");
    $("#contact").addClass("d-none");
    cloeSideBar();
  });
}

function showContactPage() {
  $("#contactNav").on("click", function () {
    $("#rowDefault").addClass("d-none");
    $("#mealDetails").addClass("d-none");
    $("#search").addClass("d-none");
    $("#categories").addClass("d-none");
    $("#categoriesRow").addClass("d-none");
    $("#categoryByName").addClass("d-none");
    $("#area").addClass("d-none");
    $("#mealByIngredient").addClass("d-none");
    $("#ingredients").addClass("d-none");
    $("#ingredientsRow").addClass("d-none");
    $("#contact").removeClass("d-none");
    cloeSideBar();
  });
}

// Form Validation

const validationStatus = {
  nameInput: false,
  emailInput: false,
  phoneInput: false,
  ageInput: false,
  passwordInput: false,
  repasswordInput: false,
};

function validation(term, inputId) {
  const myRegex = {
    nameInput: /^[A-Z][a-z]{3,15}$/,
    emailInput: /^\w{3,15}@(gmail|hotmail|yahoo).com$/,
    phoneInput: /^(01(0|1|2|5)\d{8})$/,
    ageInput: /^([1-8][0-9]|90)$/,
    passwordInput: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    repasswordInput: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  };

  const regex = myRegex[inputId];
  if (regex.test(term)) {
    $(`#${inputId}`).addClass("is-valid");
    $(`#${inputId}`).removeClass("is-invalid");
    if (inputId != "repasswordInput") {
      $(`#${inputId}Alert`).addClass("d-none");
    }
    validationStatus[inputId] = true;
  } else {
    $(`#${inputId}`).removeClass("is-valid");
    $(`#${inputId}`).addClass("is-invalid");
    $(`#${inputId}Alert`).removeClass("d-none");
    validationStatus[inputId] = false;
  }

  checkAllValid();
}


function checkAllValid() {
  const allValid = Object.values(validationStatus).every(Boolean);
  if(allValid && $("#passwordInput").val()==$("#repasswordInput").val()){
    $("#submitBtn").removeClass("disabled")
  }else{
    $("#submitBtn").addClass("disabled")
  }
}

$(".contact input").on("input", function () {
  validation(this.value, this.id);
});
