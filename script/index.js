


const categoriesContainer = document.getElementById("categories-container")
const cardContainer = document.getElementById("card-container");
const cartContainer = document.getElementById("cart-container");
const myModal = document.getElementById('my_modal_5');
const modalContainer = document.getElementById('modal-container');
const totalPrice = document.getElementById('total-price')

// Load Categories Function
const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
}

// Display Categories Data
const displayCategories = (data) => {
    data.forEach(categorie => {
        categoriesContainer.innerHTML += `
            <li id="${categorie.id}" class="py-4 px-2 text-[#1F2937] hover:bg-[#499766] hover:text-[#ffffff] rounded-md cursor-pointer btn w-full mb-2">${categorie.category_name}</li>
        `
    });

    // Categories Button Handler Function
    categoriesContainer.addEventListener("click", (event) => {
        const allLi = document.querySelectorAll("li");
        allLi.forEach(li => {
            li.classList.remove("bg-[#15803D]", "text-[#ffffff]")
        })
        if (event.target.localName === "li") {
            event.target.classList.add("bg-[#15803D]")
            loadPlants(event.target.id)
        }
        if (event.target.id === "all-trees") {
            loadAllPlants()
        }
    })
}
loadCategories()


// Load Plants by categores Function
const loadPlants = (plantsId) => {
    fetch(`https://openapi.programming-hero.com/api/category/${plantsId}`)
        .then(res => res.json())
        .then(data => displayPlants(data.plants))
}
const displayPlants = (plants) => {
    cardContainer.innerHTML = ""
    plants.forEach(plant => {
        cardContainer.innerHTML += `
            <div class="bg-[#ffffff] rounded-xl grid">
                <div class="h-[250px]">
                    <img class="h-[100%] w-[100%] rounded-t-xl" src="${plant.image}" />
                </div>
                <div class="p-4">
                    <h3  class="font-semibold text-[#1F2937] text-[1.25rem] mt-3">${plant.name}</h3>
                    <p class="my-5 text-[#1F2937] text-[14px] leading-4">${plant.description}</p>
                    <div class="flex justify-between">
                        <span class="bg-[#DCFCE7] py-1 px-3 rounded-full font-medium">${plant.category}</span>
                        <span class="font-semibold"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${plant.price}</span>
                    </div>
                    <button id="${plant.id}" class="mt-3 text-center bg-[#15803D] py-3 rounded-full btn w-full btn btn-block text-[#ffffff] font-medium cursor-pointer">Add to Cart</button>
                </div>
            </div>
        `
    })
}

// Load All Plants  Function
const loadAllPlants = () => {
    fetch("https://openapi.programming-hero.com/api/plants")
        .then(res => res.json())
        .then(data => displayPlants(data.plants))
}
const displayAllPlants = (allPlants) => {
    displayPlants(allPlants.id)
}
loadAllPlants()

let cartInfo = [];

// Card Button Event Handler
cardContainer.addEventListener("click", (event) => {
    const title = event.target.parentNode.children[0].innerText
    const price = event.target.parentNode.children[2].children[1].innerText
    const id = event.target.id;

    if (event.target.localName === "button") {
        cartInfo.push({
            title: title,
            price: price,
            id: id
        })
        showCartInfo()
    }

    if (event.target.localName === 'h3') {
        const id = event.target.parentNode.children[3].id;
        loadModalInfo(id)
    }
})

// show info on cart
const showCartInfo = () => {


    let totalAmount = 0;
    cartContainer.innerHTML = ""
    cartInfo.forEach(info => {
        totalAmount = totalAmount + Number(info.price)
        totalPrice.innerText = totalAmount;
        cartContainer.innerHTML += `
                            <div class="flex justify-between items-center bg-[#F0FDF4] p-2 px-3 mt-3 rounded-lg">
                                <div>
                                    <h4 class="font-bold">${info.title}</h4>
                                    <p class="text-gray-500">৳<span>${info.price}</p>
                                </div>
                                <div>
                                    <button onclick="handleRemoveItem('${info.id}')" class="rounded-full hover:bg-red-200 py-1 px-1.5 text-gray-500"><i class="fa-solid fa-xmark"></i></button>
                                </div>
                            </div>
            `
    })

}


// Close Button Event Handler
const handleRemoveItem = (id) => {
    const filteredCart = cartInfo.filter(item => item.id !== id)
    cartInfo = filteredCart
    if(cartInfo.length === 0){
        totalPrice.innerText = 0
    }
    showCartInfo(cartInfo)
}


// load modal information by id
const loadModalInfo = (id) => {
    fetch(`https://openapi.programming-hero.com/api/plant/${id}`).then(res => res.json()).then(data => {
        openModal(data.plants)
    })
}

// open Modal
const openModal = (data) => {

    modalContainer.innerHTML = `
    <div class="bg-[#ffffff] rounded-xl grid">
                <div class="h-[250px]">
                    <img class="h-[100%] w-[100%] rounded-t-xl" src="${data.image}" />
                </div>
                <div class="p-4">
                    <h3  class="font-semibold text-[#1F2937] text-[1.25rem] mt-3">${data.name}</h3>
                    <p class="my-5 text-[#1F2937] text-[14px] leading-4">${data.description}</p>
                    <div class="flex justify-between">
                        <span class="bg-[#DCFCE7] py-1 px-3 rounded-full font-medium">${data.category}</span>
                        <span class="font-semibold"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${data.price}</span>
                    </div>
                </div>
            </div>
    `
    myModal.showModal()
}
