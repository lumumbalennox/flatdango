// Code goes here
document.addEventListener('DOMContentLoaded',onPageLoad); 

function onPageLoad (){ 
    firstFilmDetails()
    allFilms();
    updataDetails();
    refreshFilm();
}

//first film/movie display.
function firstFilmDetails(){
    fetch('http://localhost:3000/films/1')  
    .then(res=>res.json())
    .then(films=>refreshFilm(films))
   }
   
    function refreshFilm(films){
        document.getElementById('title').textContent = films.title;
        document.querySelector('#poster').src = films.poster;
        document.getElementById('runtime').textContent= films.runtime;
        document.getElementById('showtime').textContent= films.showtime;
        document.getElementById('film-info').textContent= films.description; 
        const totalCount = document.getElementById("ticket-num");

        // Variable to track count
        let count = films.capacity - films.tickets_sold;
        // Display initial count value
        totalCount.innerHTML = count; 

        // Function to decrement the films remaining until the counter is zero
        const handleDecrement = () => {
            if (count >0){
            count--;
            }
            totalCount.innerHTML = count;
            
    };
       document.getElementById("buy-ticket").addEventListener("click", handleDecrement);
         
    }

function allFilms(){
fetch('http://localhost:3000/films')
.then(response=>response.json())
.then(films =>{
       const filmsList = document.getElementById('films');
       const existingItems = Array.from(filmsList.children);
       existingItems.forEach(item=>item.remove());   
       films.forEach(films=>{
       let filmsItem = document.createElement('li');
       filmsItem.textContent = films.title;
       filmsItem.addEventListener('click',displayInMain)  
       filmsList.appendChild(filmsItem); 
});
})
.catch(error=>console.log(error))
}
//Make the li elements clickable
const list = document.querySelector('li');
list.addEventListener(
    "click",
    (ev) =>{
        if(EvalError.target.tagName === "LI"); {
            ev.target.classList.toggle("done");
        }

    },
    false
);


document.querySelector('#review-form').addEventListener('submit',(e)=>{
    e.preventDefault(); 
    const customerReview = document.getElementById('review').value;
    let listItem = document.createElement('li');
    listItem.textContent = customerReview;
    listItem.addEventListener('click',()=>listItem.remove());
    document.getElementById('review-list').appendChild(listItem);
   
    fetch(`http://localhost:3000/films`)
    .then(response=>response.json())
    .then(movie=>{
        const labelleFilmName = document.getElementById('title').textContent;
        let similarFilm  = films.find(element=>{
            return element.title ===  labelledFilmName 
    })

    similarFilms.reviews.push(customerReview)
    fetch(`http://localhost:3000/films/${title.id}`,{
        method: 'PATCH',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({"reviews":similarFilms.description})
    })
    .then(response=>response.json())
    .then(data=>console.log(data))
    .catch(error=>console.log(error))    
    }).catch();
    })


function displayInMain(event){
const clickedmovieName = event.target.textContent;   
fetch('http://localhost:3000/films')                
.then(res=>res.json())
.then(films=>{
let similarFilms = films.find(element=>{
               return element.title === clickedmovieName  
    });
    
    refreshFilm(similarFilms)            
})
.catch(error=>console.log(error))
}

