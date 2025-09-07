const categoriesContainer = document.getElementById("categories-container")
const cardContainer = document.getElementById("card-container");

// Load Categories Function
const loadCategories = () =>{
    fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
}

// Display Categories Data
const displayCategories = (data) =>{
    data.forEach(categorie => {
        categoriesContainer.innerHTML += `
            <li id="${categorie.id}" class="py-4 px-2 text-[#1F2937] hover:bg-[#499766] hover:text-[#ffffff] rounded-md cursor-pointer btn w-full mb-2">${categorie.category_name}</li>
        `
    });

    // Categories Button Handler Function
    categoriesContainer.addEventListener("click", (event) =>{
        const allLi = document.querySelectorAll("li");
        allLi.forEach(li => {
            li.classList.remove("bg-[#15803D]")
        })
        if(event.target.localName === "li"){
            event.target.classList.add("bg-[#15803D]")
            loadPlants(event.target.id)
        }
    })
}
loadCategories()

// Load All Plants  Function
const loadAllPlants = () =>{
    fetch("https://openapi.programming-hero.com/api/plants")
    .then(res => res.json())
    .then(data => displayPlants(data.plants))
}
const displayAllPlants = (allPlants) =>{
    allPlants.forEach(allPlant => {
        console.log(allPlant)
        cardContainer.innerHTML += `
            <div class="bg-[#ffffff] rounded-xl">
                <div class="h-[250px]">
                    <img class="h-[100%] w-[100%] rounded-t-xl" src="${plant.image}" />
                </div>
                <div class="p-4">
                    <h3 class="font-semibold text-[#1F2937] text-[1.25rem] mt-3">${plant.name}</h3>
                    <p class="my-2 text-[#1F2937] text-[14px] leading-4 text-justify">${plant.description}</p>
                    <div class="flex justify-between">
                        <span class="bg-[#DCFCE7] py-1 px-3 rounded-full font-medium">${plant.category}</span>
                        <span class="font-semibold"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${plant.price}</span>
                    </div>
                    <div class="mt-3 text-center bg-[#15803D] py-3 rounded-full btn w-full">
                        <button class="text-[#ffffff] font-medium cursor-pointer">Add to Cart</button>
                    </div>
                </div>
            </div>
        `
    })
}
loadAllPlants()

// Load Plants by categores Function
const loadPlants = (plantsId) =>{
    fetch(`https://openapi.programming-hero.com/api/category/${plantsId}`)
    .then(res => res.json())
    .then(data => displayPlants(data.plants))
}
const displayPlants = (plants) =>{
    cardContainer.innerHTML = ""
    plants.forEach(plant => {
        console.log(plant)
        cardContainer.innerHTML += `
            <div class="bg-[#ffffff] rounded-xl">
                <div class="h-[250px]">
                    <img class="h-[100%] w-[100%] rounded-t-xl" src="${plant.image}" />
                </div>
                <div class="p-4">
                    <h3 class="font-semibold text-[#1F2937] text-[1.25rem] mt-3">${plant.name}</h3>
                    <p class="my-2 text-[#1F2937] text-[14px] leading-4 text-justify">${plant.description}</p>
                    <div class="flex justify-between">
                        <span class="bg-[#DCFCE7] py-1 px-3 rounded-full font-medium">${plant.category}</span>
                        <span class="font-semibold"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${plant.price}</span>
                    </div>
                    <div class="mt-3 text-center bg-[#15803D] py-3 rounded-full btn w-full">
                        <button class="text-[#ffffff] font-medium cursor-pointer">Add to Cart</button>
                    </div>
                </div>
            </div>
        `
    })
}

