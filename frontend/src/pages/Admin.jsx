import { useState } from "react";
import axios from "axios";
import { NavLink, useLoaderData } from "react-router-dom";
import Connexion from "../components/Connexion";

function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const songData = useLoaderData();
  const [newSong, setNewSong] = useState({
    song_title: "",
    song_link: "",
    song_embed: "",
    song_game: "",
  });
  const [musicName, setMusicName] = useState("");
  const [gameName, setGameName] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  if (!isLoggedIn) {
    return <Connexion connexion={isLoggedIn} setConnexion={setIsLoggedIn} />;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSong((prevSong) => ({
      ...prevSong,
      [name]: value,
    }));
  };

  const handlePostSong = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/songsadd`,
        {
          title: newSong.song_title,
          link: newSong.song_link,
          embed: newSong.song_embed,
          game: newSong.song_game,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        console.info("Song has successfully been added !");
        setNewSong({
          song_title: "",
          song_link: "",
          song_embed: "",
          song_game: "",
        });
      } else {
        console.error("An error has occurred :", response.statusText);
      }
    } catch (error) {
      console.error("Unexpected error :", error);
      setNewSong({
        song_title: "",
        song_link: "",
        song_embed: "",
        song_game: "",
      });
    }
  };

  const confirmDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/songsdel/${id}`
      );
      if (response.status === 200) {
        console.info("Music has been successfully deleted!");
      } else {
        console.error("An error occurred:", response.statusText);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  const handleSearch = () => {
    const searchResult = songData.filter(
      (song) =>
        song.title.toLowerCase().includes(musicName.toLowerCase()) &&
        song.game.toLowerCase().includes(gameName.toLowerCase())
    );
    setSearchResults(searchResult);
    setGameName("");
    setMusicName("");
  };

  const handleMusicNameChange = (e) => {
    setMusicName(e.target.value);
  };

  const handleGameNameChange = (e) => {
    setGameName(e.target.value);
  };

  return (
    <div className="adminContainer">
      <div className="link">
        <NavLink to="/">Retour</NavLink>
        <button type="button" onClick={handleLogout}>
          Déconnexion
        </button>
      </div>
      <div className="addRemoveForms">
        <div className="addForm">
          <h2>Add a New Song</h2>
          <form onSubmit={handlePostSong}>
            <label htmlFor="song_title">Title:</label>
            <input
              type="text"
              id="song_title"
              name="song_title"
              value={newSong.song_title}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="song_link">Link:</label>
            <input
              type="text"
              id="song_link"
              name="song_link"
              value={newSong.song_link}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="song_embed">Embed Code:</label>
            <input
              type="text"
              id="song_embed"
              name="song_embed"
              value={newSong.song_embed}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="song_game">Game:</label>
            <input
              type="text"
              id="song_game"
              name="song_game"
              value={newSong.song_game}
              onChange={handleInputChange}
              required
            />

            <button type="submit">
              <p>Add Song</p>
            </button>
          </form>
        </div>
        <div className="removeForm">
          <h2>Remove a Song</h2>
          <div className="adminSearchForm">
            <label htmlFor="musicName">Music Name:</label>
            <input
              type="text"
              id="musicName"
              list="nameList"
              value={musicName}
              onChange={handleMusicNameChange}
            />
            <datalist id="nameList">
              {Array.from(new Set(songData.map((s) => s.title))).map(
                (title) => (
                  <option key={title} value={title}>
                    {title}
                  </option>
                )
              )}
            </datalist>

            <label htmlFor="gameName">Game Name:</label>
            <input
              type="text"
              id="gameName"
              value={gameName}
              list="gameList"
              onChange={handleGameNameChange}
            />
            <datalist id="gameList">
              {Array.from(new Set(songData.map((s) => s.game))).map((game) => (
                <option key={game} value={game}>
                  {game}
                </option>
              ))}
            </datalist>

            <button type="button" onClick={handleSearch}>
              <p>Search</p>
            </button>
          </div>
          <div className="searchSongList">
            {searchResults.map((sr) => {
              return (
                <div className="songList" key={sr.id}>
                  <p>
                    {sr.title}: {sr.game}
                  </p>
                  <button type="button" onClick={() => confirmDelete(sr.id)}>
                    ❌
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
