import PropTypes from "prop-types";

function FailedRound({ songs, currentMusicIndex }) {
  return (
    <div className="failedRound">
      <p>La bonne reponse etait : {songs[currentMusicIndex].game}</p>
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

FailedRound.propTypes = {
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
};

export default FailedRound;
