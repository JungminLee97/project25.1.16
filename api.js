
export const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMDA4NDM3MDAxYjU0NDhmMGUyMjc2ODMyZGY2ZTdmYyIsIm5iZiI6MTczNjI5OTMyMC45MDIwMDAyLCJzdWIiOiI2NzdkZDMzODQ0ZDY0OWZmYWU3YWY1ZDkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.MnEUNN8JRqq537XAhhEgok-_A58U8shXU0PsG9tyqt8",
    }
  };
  
  export const fetchMovies = (url) => {
    return fetch(url, options)
      .then((res) => res.json())
      .then((data) => data.results)
      .catch((err) => console.error("Error fetching movies:", err));
  };
  
  export const fetchMovieDetails = (id) => {
    return fetch(`https://api.themoviedb.org/3/movie/${id}?language=ko-kr`, options)
      .then((res) => res.json())
      .catch((err) => console.error("Error fetching movie details:", err));
  };
  