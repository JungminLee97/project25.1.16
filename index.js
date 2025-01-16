
import { fetchMovies, fetchMovieDetails } from './api.js';
import { displayMovies, displayModal } from './ui.js';

const cardsContainer = document.querySelector(".cards");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const modal = document.querySelector(".modal");

let movies = [];

const init = () => {
  fetchMovies("https://api.themoviedb.org/3/movie/top_rated?language=ko-kr&page=4")
    .then((data) => {
      movies = data;
      displayMovies(movies, cardsContainer);
    });
};

init(); 

const filterMovies = () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm)
  );
  displayMovies(filteredMovies, cardsContainer);
};

searchButton.addEventListener("click", filterMovies);
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") filterMovies();
});
searchInput.addEventListener("input", filterMovies);

cardsContainer.addEventListener("click", function (event) {
  const clickedCard = event.target.closest(".container1");
  if (clickedCard) {
    const movieId = clickedCard.getAttribute("data-id");
    fetchMovieDetails(movieId).then((data) => {
      displayModal(data, modal);
    });
  }
});

