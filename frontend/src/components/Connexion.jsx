import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

function Connexion({ connexion, setConnexion }) {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/login`,
        {
          inputEmail,
          inputPassword,
        }
      );

      // Vérification si l'utilisateur est administrateur
      if (res.data.user && res.data.user.is_admin === 1) {
        // Stocker le jeton d'authentification dans le localStorage
        localStorage.setItem("token", res.data.token);
        setConnexion(!connexion);
      } else {
        setErrorMessage("Vous n'avez pas les autorisations nécessaires.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Adresse e-mail ou mot de passe incorrect.");
    }
  }

  return !connexion ? (
    <div className="connexion">
      <div className="connexionModal">
        {/* Formulaires de connexion */}
        <form onSubmit={handleSubmit}>
          {/* Champ pour l'adresse e-mail */}
          <input
            type="email"
            name="Email"
            placeholder="E-mail"
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
          />
          {/* Champ pour le mot de passe */}
          <input
            type="password"
            name="Password"
            placeholder="Mot de passe"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
          />
          {/* Bouton de connexion */}
          <button className="connexionBtn" type="submit">
            Se connecter
          </button>
        </form>
        {/* Affichage du message d'erreur */}
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  ) : null;
}

Connexion.propTypes = {
  connexion: PropTypes.bool.isRequired,
  setConnexion: PropTypes.func.isRequired,
};

export default Connexion;
