import PropTypes from "prop-types";

function Rules({ handleDisplayRules }) {
  return (
    <div className="mainBoxRules">
      <button type="button" className="closeRules" onClick={handleDisplayRules}>
        ✖️
      </button>
      <h1 className="ruleTitle">Regles :</h1>
      <div className="ruleExplanation">
        <p>Cliquez sur "JOUER" pour lancer la 1ere musique.</p>
        <div className="separator" />
        <p>Une partie dure 10 rounds, il y a donc 10 musiques a deviner.</p>
        <div className="separator" />
        <p>
          Essayez de trouver la musique en moins de 3 essais, le plus vite
          possible.
        </p>
        <div className="separator" />
        <p>Des indices vous sont donnes si vous vous trompez.</p>
        <div className="separator" />
        <p>Le but est de recolter le moins de points possible.</p>
        <div className="separator" />
        <p>
          Plus vous mettez du temps a trouver et plus vous vous trompez, plus
          vous recoltez de points.
        </p>
      </div>
    </div>
  );
}

export default Rules;

Rules.propTypes = {
  handleDisplayRules: PropTypes.func.isRequired,
};
