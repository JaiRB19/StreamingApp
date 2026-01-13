// Aquí defines tu "puente" con TMDB
const API_KEY = '49f820d037db828960dc754fc2f90dd4'; // ⚠️ Pega aquí la clave que obtuviste en la web
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'; // w500 es el tamaño de la imagen

// Función para obtener películas populares
export const getTrendingMovies = async () => {
  try {
    // Pedimos peliculas populares en español
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-MX&page=1`
    );
    const json = await response.json();
    return json.results; // Retornamos solo la lista de películas
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

// Función auxiliar para obtener la URL completa de la imagen
export const getPosterUrl = (path: string) => {
  return path ? `${IMAGE_BASE_URL}${path}` : null;
};

// Agrega esta función al final de src/api/tmdb.ts

export const searchMovies = async (query: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=es-MX&query=${encodeURIComponent(query)}&page=1`
    );
    const json = await response.json();
    return json.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
};

// Agrega esto al final de src/api/tmdb.ts

export const getPopularSeries = async () => {
  try {
    // Fíjate que el endpoint es /tv/popular en vez de /movie/popular
    const response = await fetch(
      `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=es-MX&page=1`
    );
    const json = await response.json();
    return json.results;
  } catch (error) {
    console.error("Error fetching TV shows:", error);
    return [];
  }
};

// Agrega esto al final de src/api/tmdb.ts

export const getTopRatedMovies = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=es-MX&page=1`
    );
    const json = await response.json();
    return json.results;
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    return [];
  }
};