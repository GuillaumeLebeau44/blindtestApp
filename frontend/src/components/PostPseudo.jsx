import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

function PostPseudo({ onSubmit }) {
  const [pseudo, setPseudo] = useState(["", "", "", "", ""]);
  const inputRefs = useRef([]);
  const firstInputRef = useRef(null);
  const [error, setError] = useState(null);

  const handleChange = (index, value) => {
    setError(null);
    const alphanumericValue = value.replace(/[^a-zA-Z0-9]/g, "");
    const upperCaseValue = alphanumericValue.toUpperCase();

    const updatedPseudo = [...pseudo];
    updatedPseudo[index] = upperCaseValue;
    setPseudo(updatedPseudo);
  };

  const handleBackspace = (event, index) => {
    if (event.key === "Backspace" && index > 0) {
      if (pseudo[index] === "") {
        // Si la touche Backspace est pressée et le champ est vide
        // Mettre le focus sur le champ d'entrée précédent
        inputRefs.current[index - 1].focus();
      } else {
        // Si le champ n'est pas vide, effacer son contenu
        const updatedPseudo = [...pseudo];
        updatedPseudo[index] = "";
        setPseudo(updatedPseudo);
      }
    }
  };

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, [firstInputRef.current]);

  useEffect(() => {
    const nextIndex = pseudo.findIndex(
      (letter, index) => letter === "" && index >= 0
    );
    const prevIndex = pseudo.findIndex(
      (letter, index) => letter === "" && index < pseudo.length - 1
    );

    if (nextIndex !== -1) {
      inputRefs.current[nextIndex].focus();
    } else if (prevIndex !== -1) {
      inputRefs.current[prevIndex].focus();
    } else {
      inputRefs.current[pseudo.length - 1].focus();
    }
  }, [pseudo]);

  const handleSubmit = () => {
    const formattedPseudo = pseudo.join("");
    if (formattedPseudo.length === 5) {
      onSubmit(formattedPseudo);
    } else {
      setError("Le pseudo doit comporter 5 caractères.");
    }
  };

  const handleKeyBegin = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  return (
    <div className="mainPseudoWindow">
      <div className="pseudoWindow">
        <p>Veuillez indiquer votre pseudo : </p>
        <div className="inputWindow">
          <div className="letterMap">
            {pseudo.map((letter, index) => (
              <input
                key={uuidv4()}
                className="letterInput"
                type="text"
                maxLength={1}
                value={letter}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => {
                  handleBackspace(e, index);
                  handleKeyBegin(e);
                }}
                ref={(input) => {
                  inputRefs.current[index] = input;
                  if (index === 0) {
                    firstInputRef.current = input;
                  }
                }}
              />
            ))}
          </div>

          <button className="startButton" type="button" onClick={handleSubmit}>
            Commencer
          </button>
        </div>
        {error && <div className="errorMsg">{error}</div>}
      </div>
    </div>
  );
}

PostPseudo.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default PostPseudo;
