
export const displayMovies = (movies, cardsContainer) => {
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
  
  export const displayModal = (movie, modal) => {
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
  
    modalContent.querySelector(".close").addEventListener("click", () => {
      modal.style.display = "none";
    });
  };
  
  