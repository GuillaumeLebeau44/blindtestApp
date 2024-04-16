import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

function WinRound({ submissionTime, songs, currentMusicIndex }) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="correctAnswer">
      <p>Bonne Reponse !</p>
      {currentPath === "/" ? <p>Temps: {submissionTime} secondes</p> : ""}
      <div className="linksToPlatforms">
        <p>Retrouvez cette musique sur YouTube :</p>
        <div className="youtubeLink">
          <a
            aria-label="youtubeLink"
            href={songs[currentMusicIndex].link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/src/assets/youtube-svgrepo-com.svg" alt="youtube icon" />
          </a>
        </div>
      </div>
    </div>
  );
}

WinRound.propTypes = {
  songs: PropTypes.arrayOf(
    PropTypes.shape({
      embed: PropTypes.string.isRequired,
      game: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      link: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  currentMusicIndex: PropTypes.number.isRequired,
  submissionTime: PropTypes.number,
};

WinRound.defaultProps = {
  submissionTime: 0,
};

export default WinRound;
