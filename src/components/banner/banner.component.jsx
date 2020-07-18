import React, { useState, useEffect } from "react";

import axios from "../../api/axios";
import requests from "../../api/requests";

import "./banner.styles.scss";

function Banner() {
  const [cover, setCover] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchOriginals);

      setCover(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length) - 1
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${
          cover?.backdrop_path || cover?.poster_path
        }")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {cover?.title || cover?.name || cover?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">
          {truncate(cover?.overview, 150)}
        </h1>
      </div>
      <div className="banner__fadeBottom"></div>
    </header>
  );
}

export default Banner;
