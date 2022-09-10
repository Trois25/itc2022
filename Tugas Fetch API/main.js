let movie
var currentPage = 1;
const leftArrow = document.getElementById('prev')
const rightArrow = document.getElementById('next')
const current = document.getElementById('current')
const input = document.querySelector('#search')
const ganemu = document.createElement('h1')


if (!input.value) {
    getMovies()
}

//membaca database
function getMovies() {
    axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=6142f67f627a38cee9fc27b07b61b89f&sort_by=popularity.desc&language=en-US&page=${currentPage}`)
        .then(function(response) {
            movie = response.data
            console.log("data==> ", movie)
            showMovies()

        })
        .catch(function(error) {
            console.log(error);
        })
}

//tampilkan movie
function showMovies() {
    for (let i = 0; i < movie.results.length; i++) {
        const card = document.createElement('div');
        const judul = document.createElement('h2');
        const alur = document.createElement('h3');
        const rating = document.createElement('p');
        judul.innerText = movie.results[i].title;
        if (!movie.results[i].poster_path) {
            card.innerHTML = `<img id="baron" src = "https://media.comicbook.com/files/img/default-movie.png" >`;
        } else {
            card.innerHTML = `<img id="baron" src = "https://image.tmdb.org/t/p/w500${movie.results[i].poster_path}" >`;
        }
        alur.innerText = movie.results[i].overview;
        rating.innerHTML = `<img id="star" src = "https://www.freepnglogos.com/uploads/star-png/file-gold-star-svg-wikimedia-commons-6.png">
        ${movie.results[i].vote_average}`;
        card.className = 'kartu';
        rating.className = 'rat';
        alur.className = 'overview';
        card.appendChild(judul);
        card.appendChild(alur);
        card.appendChild(rating);
        const main = document.querySelector('#main');
        main.appendChild(card);
        current.innerText = currentPage;
    }
}






//searching
input.addEventListener('input', () => {
    currentPage = 1;
    searchMovies(input.value)

})

function searchMovies(searchparam) {
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=6142f67f627a38cee9fc27b07b61b89f&query=${searchparam}&page=${currentPage}`)
        .then(function(response) {
            movie = response.data
            console.log("data==> ", movie)
            main.innerHTML = '';
            showMovies()
            if (movie.total_results == 0) {

                ganemu.innerText = 'Minimal ngetik yang bener laa, Jangan typo..!!'
                main.appendChild(ganemu);
            };
        })
        .catch(function(error) {
            console.log(error);

        })

}

//halaman page
leftArrow.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage = currentPage - 1;
        main.innerHTML = '';
        if (!input.value) {
            getMovies()
        } else {
            searchMovies(input.value)

        }

    }
})

rightArrow.addEventListener('click', () => {
    if (movie.total_pages != 1) {
        currentPage = currentPage + 1;
        main.innerHTML = '';
        if (!input.value) {
            getMovies()
        } else {
            searchMovies(input.value)

        }
    }

})