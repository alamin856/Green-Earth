const categoriesContainer = document.getElementById("categories-container")

const loadCategories = () =>{
    fetch("https://openapi.programming-hero.com/api/categories")
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
}
const displayCategories = (data) =>{
    data.forEach(categorie => {
        console.log(categorie.category_name)
    });
}
loadCategories()