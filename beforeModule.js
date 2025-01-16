const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMDA4NDM3MDAxYjU0NDhmMGUyMjc2ODMyZGY2ZTdmYyIsIm5iZiI6MTczNjI5OTMyMC45MDIwMDAyLCJzdWIiOiI2NzdkZDMzODQ0ZDY0OWZmYWU3YWY1ZDkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.MnEUNN8JRqq537XAhhEgok-_A58U8shXU0PsG9tyqt8",
    },
  };
  
  const cardsContainer = document.querySelector(".cards");
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const modal = document.querySelector(".modal");
  let movies = [];
  
  
  function fetchmovies() {
    fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=ko-kr&page=4",
      options
    )
      .then((res) => res.json())
      .then((data) => {
        movies = data.results;
        displayMovies(movies);
      })
      .catch((err) => console.error(err));  
  };
  fetchmovies();
  
  
  function displayMovies(movies) {
    cardsContainer.innerHTML = "";
    movies.forEach((movie) => {
      const card = document.createElement("div");
      card.className = "container1";
      card.setAttribute("data-id", movie.id);
      const posterPath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  
      card.innerHTML = `
          <img src="${posterPath}" alt="${movie.title}" class="imgcard">
          <p class="namecard">${movie.title}</p>
          <h5 class="pointcard">평점: ${movie.vote_average}</h5>
        `;
      cardsContainer.appendChild(card);
    });
  };
  
  function filterMovies() {
    const searchTerm = searchInput.value.toLowerCase();
  
    const filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchTerm)
    );
  
    displayMovies(filteredMovies);
  };
  
  searchButton.addEventListener("click", () => {
    filterMovies();
  });
  
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      filterMovies();
    };
  });
  
  searchInput.addEventListener("input", () => {
    filterMovies();
  });
  
  cardsContainer.addEventListener("click", function (event) {
    const clickedCard = event.target.closest(".container1");
    if (!clickedCard) return;
    const movieId = clickedCard.getAttribute("data-id");
    fetchMovieDetails(movieId);
  });
  
  
  function fetchMovieDetails(id) {
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=ko-kr`, options)
      .then((res) => res.json())
      .then((data) => {
        displayModal(data);
      })
      .catch((err) => console.error("Error fetching movie details:", err));
  };
  
  function displayModal(movie) {
    const modalContent = document.querySelector(".modal-content");
  
    const posterPath = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  
    modalContent.innerHTML = `
      <span class="close">&times;</span>
      <img src="${posterPath}" alt="${movie.title}">
      <h2>${movie.title}</h2>
      <p><strong>줄거리:</strong> ${movie.overview}</p>
      <p><strong>개봉일:</strong> ${movie.release_date}</p>
      <p><strong>평점:</strong> ${movie.vote_average}</p>
    `;
  
    modal.style.display = "block";
  
    modalContent.querySelector(".close").addEventListener("click", function () {
      modal.style.display = "none";
    });
  };
  
  