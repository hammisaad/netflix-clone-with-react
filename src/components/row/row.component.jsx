import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import axios from "../../api/axios";

import "./row.styles.scss";

function Row({ title, fetchUrl, isLargeRow }) {
  const baseUrl = "https://image.tmdb.org/t/p/original";
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);

      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  function showTrailer(movie) {
    if (trailerUrl) {
      setTrailerUrl(null);
    } else {
      movie?.name
        ? movieTrailer(movie.name)
            .then((url) => {
              const urlParams = new URLSearchParams(new URL(url).search);
              setTrailerUrl(urlParams.get("v"));
            })
            .catch((err) => console.log(err))
        : console.log("no movie trailers");
    }
  }

  const scrollStep = 100;

  function scrollRight(e) {
    e.preventDefault();
    let rowPosters = e.target.parentElement;
    let sl = rowPosters.scrollLeft,
      cw = rowPosters.scrollWidth;

    if (sl + scrollStep >= cw) {
      rowPosters.scrollTo({ left: cw, behavior: "smooth" });
    } else {
      rowPosters.scrollTo({ left: sl + scrollStep, behavior: "smooth" });
    }
  }

  function scrollLeft(e) {
    e.preventDefault();

    let rowPosters = e.target.parentElement;
    let sl = rowPosters.scrollRight,
      cw = rowPosters.scrollWidth;

    if (sl + scrollStep >= cw) {
      rowPosters.scrollTo({ left: cw, behavior: "smooth" });
    } else {
      rowPosters.scrollTo({ left: sl + scrollStep, behavior: "smooth" });
    }
  }

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        <div className="row__scroll__left" onClick={(e) => scrollLeft(e)}></div>
        {movies.map((movie) => (
          <img
            key={movie.id}
            src={`${baseUrl}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            onClick={() => showTrailer(movie)}
          />
        ))}
        <div
          className="row__scroll__right"
          onClick={(e) => scrollRight(e)}
        ></div>
      </div>

      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
