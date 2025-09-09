const categoriesContainer = document.getElementById("categories-container")
const cardContainer = document.getElementById("card-container");
const cartContainer = document.getElementById("cart-container");

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
        if(event.target.id === "all-trees"){
            loadAllPlants()
        }
    })
}
loadCategories()

// Load Plants by categores Function
const loadPlants = (plantsId) =>{
    fetch(`https://openapi.programming-hero.com/api/category/${plantsId}`)
    .then(res => res.json())
    .then(data => displayPlants(data.plants))
}
const displayPlants = (plants) =>{
    cardContainer.innerHTML = ""
    plants.forEach(plant => {
        cardContainer.innerHTML += `
            <div class="bg-[#ffffff] rounded-xl grid">
                <div class="h-[250px]">
                    <img class="h-[100%] w-[100%] rounded-t-xl" src="${plant.image}" />
                </div>
                <div class="p-4">
                    <h3 onclick="my_modal_5.showModal()" class="font-semibold text-[#1F2937] text-[1.25rem] mt-3">${plant.name}</h3>
                    <p class="my-5 text-[#1F2937] text-[14px] leading-4">${plant.description}</p>
                    <div class="flex justify-between">
                        <span class="bg-[#DCFCE7] py-1 px-3 rounded-full font-medium">${plant.category}</span>
                        <span class="font-semibold"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${plant.price}</span>
                    </div>
                    <button class="mt-3 text-center bg-[#15803D] py-3 rounded-full btn w-full btn btn-block text-[#ffffff] font-medium cursor-pointer">Add to Cart</button>
                </div>
            </div>
        `
    })
}

// Load All Plants  Function
const loadAllPlants = () =>{
    fetch("https://openapi.programming-hero.com/api/plants")
    .then(res => res.json())
    .then(data => displayPlants(data.plants))
}
const displayAllPlants = (allPlants) =>{
    displayPlants(allPlants)
}
loadAllPlants()

// Card Button Event Handler
cardContainer.addEventListener("click", (event) =>{
    const title = event.target.parentNode.children[0].innerText
    const price = Number(event.target.parentNode.children[2].children[1].innerText)
    let totalPrice = Number(document.getElementById("total-price").innerText);
    if(event.target.localName === "button"){
        cartContainer.innerHTML += `
            <div class="bg-[#CFF0DC] rounded-xl p-3 flex items-center justify-between my-5">
                <div class="">
                    <h2 class="text-[#1F2937] font-semibold mb-2">${title}</h2>
                    <p class="text-[#1F2937]"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${price}</p>
                </div>
                <button class="fa-solid fa-xmark close-btn cursor-pointer"></button>
            </div>
        `
        totalPrice = totalPrice + price
        document.getElementById("total-price").innerText = totalPrice
    }
})

// Close Button Event Handler
document.getElementById("cart-container").addEventListener("click", (event) =>{
    const price = Number(event.target.parentNode.children[0].children[1].innerText);
    let totalPrice = Number(event.target.parentNode.parentNode.parentNode.children[2].children[1].children[1].innerText)
    if(event.target.localName === "button"){
        totalPrice = totalPrice - price
    }
    document.getElementById("total-price").innerText = totalPrice
})

// Modal Functionality
cardContainer.addEventListener("click", (event) =>{
    if(event.target.localName === "h3"){

    }
})
