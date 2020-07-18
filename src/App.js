import React from "react";

import Row from "./components/row/row.component";
import Banner from "./components/banner/banner.component";
import NavBar from "./components/navBar/navbar.component";

import requests from "./api/requests";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Banner />
      <Row
        isLargeRow
        fetchUrl={requests.fetchOriginals}
        title={"netflix originals"}
      />
      <Row fetchUrl={requests.fetchTrending} title={"trending now"} />
      <Row fetchUrl={requests.fetchTopRated} title={"top rated"} />
      <Row fetchUrl={requests.fetchActionMovies} title={"action movies"} />
      <Row fetchUrl={requests.fetchComedyMovies} title={"comedy movies"} />
      <Row fetchUrl={requests.fetchHorrorMovies} title={"horror movies"} />
      <Row fetchUrl={requests.fetchRomanceMovies} title={"romance movies"} />
      <Row fetchUrl={requests.fetchDocumentaries} title={"documetaries"} />
    </div>
  );
}

export default App;
