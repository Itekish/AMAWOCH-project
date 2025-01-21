const API_KEY = `3e583686cb2086cb013a828648700a47`
const image_path = `https://image.tmdb.org/t/p/w1280`


const input = document.querySelector('.search input');
const btn = document.querySelector('.search button')
const mainTitle = document.querySelector('.favorites h1')
const mainDiv = document.querySelector('.favorites .moviesDiv')

const trendingElement = document.querySelector('.trending .moviesDiv')

const favorite = document.querySelector('.favorites h1')

const displayMovieDetails = document.querySelector('.detailsDiv')
const displayUsername = document.querySelector('h3');
const userImg = document.getElementById("userImg");
const defaultIcon = document.getElementById("defaultIcon");
const uploadInput = document.getElementById("uploadInput");
const subscribe = document.getElementById('subscribe');

function gotoSubscribe(){
    window.location.href = '../otherHtmlFiles/subscribe.html'
}

let premiumUser = false;
// console.log(premiumUser);

const isPremiumUser = localStorage.getItem("premiumUser") === "true";

if (isPremiumUser) {
    premiumUser = true
    subscribe.style.display = 'none'
    premiumBadge.style.display = 'block'
    // console.log("User is premium.");
} else {
    // console.log("User is not premium.");
}



function clickCard (cards) {
    cards.forEach(card => {
        card.addEventListener('click', () => show_popup(card))
    })
}

// SEARCH MOVIES
async function getMovieBySearch (searchTerm) {
    const resp = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}`)
    const respData = await resp.json()
    
    return respData.results
}

btn.addEventListener('click', displaySearchedMovies)

async function displaySearchedMovies() {
    const data = await getMovieBySearch(input.value)
    // console.log(data);
    

    mainTitle.innerText = `Search Results`
   mainDiv.innerHTML = data.map(e => {
        return `
            <div class="card" data-id="${e.id}">
                <div class="img">
                    <img src="${image_path + e.poster_path}">
                </div>
                <div class="info">
                    <h2>${e.title}</h2>
                    <div class="single-info">
                        <span>Rate: </span>
                        <span>${e.vote_average} / 10</span>
                    </div>
                    <div class="single-info">
                        <span>Release Date: </span>
                        <span>${e.release_date}</span>
                    </div>
                </div>
            </div>
        `
    }).join('')

    const cards = document.querySelectorAll('.card')
    clickCard(cards)
}

// POPUP
async function getMovies (id) {
    const resp = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
    const respData = await resp.json()
    
    return respData
}

async function getMovieTrailer(id) {
    const resp = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`);
    const respData = await resp.json();

    if (respData.results && respData.results.length > 0) {
        const trailer = respData.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
        if (trailer) {
            return trailer.key;
        }
    }
    return null; 
}


async function show_popup (card) {
   displayMovieDetails.classList.add('show-popup')

    const movie_id = card.getAttribute('data-id')
    const movie = await getMovies(movie_id)
    const movieTrailerKey = await getMovieTrailer(movie_id);

    console.log(movie);
    

    let trailerEmbed = '';
if (movieTrailerKey) {
    trailerEmbed = `
        <div class="trailer-container">
            <iframe width="100%" height="400" src="https://www.youtube.com/embed/${movieTrailerKey}?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>`;
} else {
    trailerEmbed = `<p>No trailer available.</p>`;
}

    console.log(trailerEmbed);
    
    const movieTrailer = await getMovieTrailer(movie_id)

   displayMovieDetails.style.background = `linear-gradient(rgba(0, 0, 0, .8), rgba(0, 0, 0, 1)), url(${image_path + movie.poster_path})`

   displayMovieDetails.innerHTML = `
            <span class="x-icon">&#10006;</span>
            <div class="content">
                <div class="left">
                    <div class="poster-img">
                        <img src="${image_path + movie.poster_path}" alt="">
                    </div>
                    <div class="single-info">
                        <span>Add to favorites:</span>
                        <span class="heart-icon">&#9829;</span>
                    </div>
                </div>
                <div class="right">
                    <h1>${movie.title}</h1>
                    <h3>${movie.tagline}</h3>
                    <div class="single-info-container">
                        <div class="single-info">
                            <span>Language:</span>
                            <span>${movie.spoken_languages[0].name}</span>
                        </div>
                        <div class="single-info">
                            <span>Length:</span>
                            <span>${movie.runtime} minutes</span>
                        </div>
                        <div class="single-info">
                            <span>Rate:</span>
                            <span>${movie.vote_average} / 10</span>
                        </div>
                        <div class="single-info">
                            <span>Budget:</span>
                            <span>$ ${movie.budget}</span>
                        </div>
                        <div class="single-info">
                            <span>Release Date:</span>
                            <span>${movie.release_date}</span>
                        </div>
                    </div>
                    <div class="genres">
                        <h2>Genres</h2>
                        <ul>
                            ${movie.genres.map(e => `<li>${e.name}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="overview">
                        <h2>Overview</h2>
                        <p>${movie.overview}</p>
                    </div>
                   
                    <div>
                    ${trailerEmbed}
                    <div/>
                   <!-- <button style="margin: auto; padding: .5em;" onclick="watch-full-movie()">Watch full movie</button>-->
                </div>
                </div>
                </div>
                </div>

    `
    const x_icon = document.querySelector('.x-icon')
    x_icon.addEventListener('click', () =>{displayMovieDetails.classList.remove('show-popup')
        window.location.href = './home.html'
    })

    const heart_icon =displayMovieDetails.querySelector('.heart-icon')

    const movie_ids = getLocalStorage()
    for(let i = 0; i <= movie_ids.length; i++) {
        if (movie_ids[i] == movie_id) heart_icon.classList.add('change-color')
    }

    heart_icon.addEventListener('click', () => {
        if(heart_icon.classList.contains('change-color')) {
            remove_LS(movie_id)
            heart_icon.classList.remove('change-color')
        } else {
            addToLocalStorage(movie_id)
            heart_icon.classList.add('change-color')
        }
        fetchFavoriteMovies()
    })
}

function watchFullMovie(){
    window.location.href = '../otherHtmlFiles/fullMovie.html'
}

// Local Storage
function getLocalStorage () {
    const movie_ids = JSON.parse(localStorage.getItem('movie-id'))
    return movie_ids === null ? [] : movie_ids
}
function addToLocalStorage (id) {
    const movie_ids = getLocalStorage()
    localStorage.setItem('movie-id', JSON.stringify([...movie_ids, id]))
}
function remove_LS (id) {
    const movie_ids = getLocalStorage()
    localStorage.setItem('movie-id', JSON.stringify(movie_ids.filter(e => e !== id)))
}

// Favorite Movies
fetchFavoriteMovies()
async function fetchFavoriteMovies () {
   mainDiv.innerHTML = ''

    const movies_LS = await getLocalStorage()
    const movies = []
    for(let i = 0; i <= movies_LS.length - 1; i++) {
        const movie_id = movies_LS[i]
        let movie = await getMovies(movie_id)
        getFavoritesFromLocalStorage(movie)
        movies.push(movie)
    }
}

function getFavoritesFromLocalStorage (movie_data) {

    favorite.innerHTML = 'Favorites'
   mainDiv.innerHTML += `
        <div class="card" data-id="${movie_data.id}">
            <div class="img">
                <img src="${image_path + movie_data.poster_path}">
            </div>
            <div class="info">
                <h2>${movie_data.title}</h2>
                <div class="single-info">
                    <span>Rate: </span>
                    <span>${movie_data.vote_average} / 10</span>
                </div>
                <div class="single-info">
                    <span>Release Date: </span>
                    <span>${movie_data.release_date}</span>
                </div>
            </div>
        </div>
    `
    
    const cards = document.querySelectorAll('.card')
    clickCard(cards)
}

// Trending Movies
getTrendingMovies()
async function getTrendingMovies () {
    const resp = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`)
    const respData = await resp.json()

    return respData.results
}

trendingMoviesContainer()
async function trendingMoviesContainer () {

    const data = await getTrendingMovies()
    
    trendingElement.innerHTML = data.slice(0, 10).map(e => {
        return `
            <div class="card" data-id="${e.id}">
                <div class="img">
                    <img src="${image_path + e.poster_path}">
                </div>
                <div class="info">
                    <h2>${e.title}</h2>
                    <div class="single-info">
                        <span>Rate: </span>
                        <span>${e.vote_average} / 10</span>
                    </div>
                    <div class="single-info">
                        <span>Release Date: </span>
                        <span>${e.release_date}</span>
                    </div>
                </div>
            </div>
        `
    }).join('')
}

const loadProfilePic = () => {
    const savedImage = localStorage.getItem("profilePicture");
    if (savedImage) {
        userImg.src = savedImage;
        userImg.style.display = "block";
        defaultIcon.style.display = "none";
    }
};

uploadInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            localStorage.setItem("profilePicture", reader.result);
            userImg.src = reader.result;
            userImg.style.display = "block";
            defaultIcon.style.display = "none";
        };
        reader.readAsDataURL(file);
    }
});

defaultIcon.addEventListener("click", () => uploadInput.click());

window.onload = loadProfilePic;

