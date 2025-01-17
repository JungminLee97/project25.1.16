
//모듈화, api, ui 로 나눈 로직 가져오기
import { fetchMovies, fetchMovieDetails } from './api.js';
import { displayMovies, displayModal } from './ui.js';

const cardsContainer = document.querySelector(".cards");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const modal = document.querySelector(".modal");

let movies = [];

// 코드 시작 지점, top rated 영화들 api 가져오기
const init = () => { 
  fetchMovies("https://api.themoviedb.org/3/movie/top_rated?language=ko-kr&page=4")
    .then((data) => {
      movies = data;
      displayMovies(movies, cardsContainer);
    });
};

init(); 

// 필터링, html에서 input value 와 api를통해가져온 movies의 영화제목을 섞어 필터링할수있는로직을 displayMovies에 넣어줌
const filterMovies = () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm)
  );
  displayMovies(filteredMovies, cardsContainer);
};
//이벤트리스너 모음집
searchButton.addEventListener("click", filterMovies);
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") filterMovies();
});
searchInput.addEventListener("input", filterMovies);
//이벤트리스터를 활용한 모달 창열기까지연계, html에 이벤트 타겟으로 생성된div를 가리켜주고 set attribute를통한 id가져오는것을 준비해둔후
//id api 를 가져와 인자로 넣어주고, promise객체다보니 then 으로 이어받아 모달창여는것까지 이어서 작성해줬다!
cardsContainer.addEventListener("click", function (event) {
  const clickedCard = event.target.closest(".container1");
  if (clickedCard) {
    const movieId = clickedCard.getAttribute("data-id");
    fetchMovieDetails(movieId).then((data) => {
      displayModal(data, modal);
    });
  }
});


