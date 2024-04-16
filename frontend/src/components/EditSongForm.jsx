import { useState, useEffect } from "react";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import PropTypes from "prop-types";

function EditSongForm({ setIsLoggedIn }) {
  const songData = useLoaderData();

  const [searchResults, setSearchResults] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [modifiedSong, setModifiedSong] = useState({
    song_title: "",
    song_link: "",
    song_embed: "",
    song_game: "",
  });
  const [musicName, setMusicName] = useState("");
  const [gameName, setGameName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setSearchResults(songData);
  }, [songData]);

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

  const handleSelectSong = (song) => {
    setSelectedSong(song);
    const cleanedEmbed = song.embed.replace(/&autoplay=1/g, "");
    setModifiedSong({
      song_title: song.title,
      song_link: song.link,
      song_embed: cleanedEmbed,
      song_game: song.game,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const filteredValue = value.replace(/[<>]/g, "");

    setModifiedSong((prevSong) => ({
      ...prevSong,
      [name]: filteredValue,
    }));
  };

  const handleMusicNameChange = (e) => {
    const filteredValue = e.target.value.replace(/[<>]/g, "");
    setMusicName(filteredValue);
  };

  const handleGameNameChange = (e) => {
    const filteredValue = e.target.value.replace(/[<>]/g, "");
    setGameName(filteredValue);
  };

  const handleEditSong = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/songs/${selectedSong.id}`,
        modifiedSong,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setMessage("Musique modifiée avec succès !");
      } else {
        setMessage(`Une erreur est survenue : ${response.statusText}`);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setIsLoggedIn(false);
      } else {
        setMessage(`Erreur inattendue : ${error}`);
      }
    }
  };

  return (
    <div className="editForm">
      <h2>Modifier une musique</h2>
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
            list="gameList"
            value={gameName}
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
        <div className="searchAndEdit">
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
                    <button
                      type="button"
                      onClick={() => {
                        handleSelectSong(sr);
                      }}
                    >
                      🔄️
                    </button>
                  </div>
                );
              })
            )}
          </div>
          {selectedSong && (
            <form onSubmit={handleEditSong}>
              <label htmlFor="song_title">Titre:</label>
              <input
                type="text"
                id="song_title"
                name="song_title"
                value={modifiedSong.song_title}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="song_link">Lien:</label>
              <input
                type="text"
                id="song_link"
                name="song_link"
                value={modifiedSong.song_link}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="song_embed">Lien Embed:</label>
              <input
                type="text"
                id="song_embed"
                name="song_embed"
                value={modifiedSong.song_embed}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="song_game">Jeu:</label>
              <input
                type="text"
                id="song_game"
                name="song_game"
                value={modifiedSong.song_game}
                onChange={handleInputChange}
                required
              />
              <button type="submit">
                <p>Modifier</p>
              </button>
            </form>
          )}
        </div>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
}

export default EditSongForm;

EditSongForm.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};
