import { useState, useEffect } from "react";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import PropTypes from "prop-types";

function DeleteSongForm({ setIsLoggedIn }) {
  const songData = useLoaderData();
  const [musicName, setMusicName] = useState("");
  const [gameName, setGameName] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setSearchResults(songData);
  }, [songData]);

  const confirmDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/songsdel/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.info("Music has been successfully deleted!");
        setSearchResults((prevSearchResults) =>
          prevSearchResults.filter((song) => song.id !== id)
        );
      } else {
        console.error("An error occurred:", response.statusText);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setIsLoggedIn(false);
      } else {
        console.error("Unexpected error:", error);
      }
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
    const filteredValue = e.target.value.replace(/[<>]/g, "");
    setMusicName(filteredValue);
  };

  const handleGameNameChange = (e) => {
    const filteredValue = e.target.value.replace(/[<>]/g, "");
    setGameName(filteredValue);
  };

  return (
    <div className="removeForm">
      <h2>Supprimer une musique</h2>
      <div className="formList">
        <div className="adminSearchForm">
          <input
            type="text"
            list="nameList"
            value={musicName}
            onChange={handleMusicNameChange}
            placeholder="Par titre..."
          />
          <datalist id="nameList">
            {Array.from(new Set(songData.map((s) => s.title))).map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </datalist>

          <input
            type="text"
            value={gameName}
            list="gameList"
            onChange={handleGameNameChange}
            placeholder="Par jeu..."
          />
          <datalist id="gameList">
            {Array.from(new Set(songData.map((s) => s.game))).map((game) => (
              <option key={game} value={game}>
                {game}
              </option>
            ))}
          </datalist>

          <button type="button" onClick={handleSearch}>
            <p>Rechercher</p>
          </button>
        </div>
        <div className="searchSongList">
          {searchResults.length === 0 ? (
            <p>Aucun titre trouve</p>
          ) : (
            searchResults.map((sr) => {
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
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default DeleteSongForm;

DeleteSongForm.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};
