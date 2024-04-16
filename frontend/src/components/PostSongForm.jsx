import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

function PostSongForm({ setIsLoggedIn }) {
  const songData = useLoaderData();

  const [newSong, setNewSong] = useState({
    song_title: "",
    song_link: "",
    song_embed: "",
    song_game: "",
  });
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const filteredValue = value.replace(/[<>]/g, "");

    setNewSong((prevSong) => ({
      ...prevSong,
      [name]: filteredValue,
    }));
  };

  const handlePostSong = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
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
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        setMessage("Musique ajoutee avec succes !");
        setNewSong({
          song_title: "",
          song_link: "",
          song_embed: "",
          song_game: "",
        });
      } else {
        setMessage(`Une erreur est survenue : ${response.statusText}`);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setIsLoggedIn(false);
      } else {
        setMessage(`Erreur inattendue : ${error}`);
        setNewSong({
          song_title: "",
          song_link: "",
          song_embed: "",
          song_game: "",
        });
      }
    }
    setTimeout(() => {
      setMessage("");
    }, 5000);
  };
  return (
    <div className="addForm">
      <h2>Ajouter une musique</h2>
      <form onSubmit={handlePostSong}>
        <label htmlFor="song_title">Titre:</label>
        <input
          type="text"
          id="song_title"
          name="song_title"
          value={newSong.song_title}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="song_link">Lien:</label>
        <input
          type="text"
          id="song_link"
          name="song_link"
          value={newSong.song_link}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="song_embed">Lien Embed:</label>
        <input
          type="text"
          id="song_embed"
          name="song_embed"
          value={newSong.song_embed}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="song_game">Jeu:</label>
        <input
          type="text"
          id="song_game"
          list="gameList"
          name="song_game"
          value={newSong.song_game}
          onChange={handleInputChange}
          required
        />
        <datalist id="gameList">
          {Array.from(new Set(songData.map((s) => s.game))).map((game) => (
            <option key={game} value={game}>
              {game}
            </option>
          ))}
        </datalist>

        <button type="submit">
          <p>Ajouter</p>
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default PostSongForm;

PostSongForm.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};
