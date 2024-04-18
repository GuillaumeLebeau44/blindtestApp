import PropTypes from "prop-types";

function About({ handleDisplayAbout }) {
  return (
    <div className="mainBoxAbout">
      <button type="button" className="closeAbout" onClick={handleDisplayAbout}>
        ✖️
      </button>
      <h1 className="aboutTitle">A propos</h1>
      <div className="aboutExplanation">
        <p>
          Ce blindtest est un projet que j'ai demarre pendant ma formation de
          devolppeur web.
        </p>
        <div className="separator" />
        <p>
          Le but etait de mettre en pratique un peu tout ce qu'on a pu
          apprendre.
        </p>
        <div className="separator" />
        <p>
          Etant passione de jeux videos, je me suis dit "autant lier l'utile a
          l'agreable", et voici donc un blindtest sur les musiques de jeux
          videos. Si cela peut en plus faire decouvrir des jeux un peu moins
          connus, ou faire redecouvrir des grands classiques, alors c'est
          parfait !
        </p>
        <div className="separator" />
        <p>
          Le fond d'ecran a ete realise par{" "}
          <a
            aria-label="Artist link"
            href="https://x.com/Tuttilium"
            target="_blank"
            rel="noopener noreferrer"
          >
            @Tuttilium
          </a>
          , vous pourrez retrouver son travail sur Twitter et Instagram.
        </p>
      </div>
    </div>
  );
}

export default About;

About.propTypes = {
  handleDisplayAbout: PropTypes.func.isRequired,
};
