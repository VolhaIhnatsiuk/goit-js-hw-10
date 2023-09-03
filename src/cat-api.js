import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';
const PRIVATE_KEY = 'live_pnWdDrUfXQvcd9jZzEtMbuL8DN7q46DVKndy4HH3T6ZA47LhtQdktp9ITo2p21Os'
const searchOptions = {
    headers: {'x-api-key' : PRIVATE_KEY },
}

const loader = document.querySelector(".loader")
const errorDiv = document.querySelector(".error")
const catDiv = document.querySelector(".cat-info")
const selection = document.querySelector(".breed-select")
loader.style.display = "none"

export function fetchBreeds() {
    loader.style.display = "block" 
    fetch("https://api.thecatapi.com/v1/breeds")
    .then(response => {
        if (!response.ok) {
            throw new Error(response.statusText)
         }
    
        return response.json()
        
        })
      .then(data => {
        loader.style.display = "none"
        data.forEach(element => {
            const option = `<option value="${element.id}">${element.name}</option>`
            selection.insertAdjacentHTML("beforeend", option) 
          
        });

        new SlimSelect({
            select: '#cats'
        })

    })  
    
        .catch(error => {
            loader.style.display = "none"
            errorDiv.style.color = "red"
            errorDiv.innerHTML = "Oops! Something went wrong! Try reloading the page!";     
    })  
    
}

export function addCatInfo(event) {
    errorDiv.setAttribute("hidden", "")
    catDiv.style.display = "none"
    loader.style.display = "block"
    const breed = event.target.value;
    fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${breed}`, searchOptions)
            
        .then(response => {
            if (!response.ok) {
                throw new Error("Oops! Something went wrong! Try reloading the page!")
            }
            errorDiv.setAttribute("hidden", "")
            return response.json()
        })
            
        .then(data => {
            catDiv.innerHTML = ``
            const markU = `<div class="text-div"><h1 class="text-div-title">${data[0].breeds[0].name}</h1><p class="text-div-description">${data[0].breeds[0].description}</p><p class="text-div-temperament"><b>Temperament: </b>${data[0].breeds[0].temperament}</p></div>`

            const image = new Image();
            image.src = data[0].url;
            image.width =  500;
            image.height = 500;
            image.onload = function () {
                catDiv.innerHTML = markU
                catDiv.appendChild(image);
                loader.style.display = "none";
            }

            catDiv.style.display = "flex"
        }) 
            
        .catch(error => {
            errorDiv.removeAttribute("hidden")
            loader.style.display = "none"
            errorDiv.style.color = "red"
            errorDiv.innerHTML = "Oops! Something went wrong! Try reloading the page!";
            catDiv.setAttribute("hidden", "")
        })
    
}