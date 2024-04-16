import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";

function GameParams({
  setCurrentMusicIndex,
  setUserAnswer,
  setIsCorrectAnswer,
  setTimerId,
  setElapsedTime,
  setSubmissionTime,
  setDisabledButton,
  setUsedIndices,
  setAttempts,
  setRounds,
  setFinishedGame,
  setScore,
  savePseudo,
  setGameStarted,
  pseudo,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname;

  const toggleGameMode = () => {
    const nextPage = currentPath === "/" ? "/endless" : "/";
    navigate(nextPage);
  };
  const resetGame = () => {
    setCurrentMusicIndex(null);
    setUserAnswer("");
    setIsCorrectAnswer(false);
    setTimerId(null);
    setElapsedTime(0);
    setSubmissionTime(null);
    setDisabledButton(false);
    setUsedIndices([]);
    setAttempts(0);
    setRounds(0);
    setFinishedGame(false);
    setScore(0);

    savePseudo("");
    setGameStarted(false);

    localStorage.removeItem("pseudo");
    localStorage.removeItem("gameStarted");
  };

  return (
    <div className="gameParams">
      <button type="button" className="gameMode" onClick={toggleGameMode}>
        Mode infini
        <img src="/src/assets/infinite-svgrepo-com.svg" alt="infinite icon" /> :
        {currentPath === "/" ? " OFF" : " ON"}
      </button>
      <div className="pseudoReset">
        <button className="resetButton" type="button" onClick={resetGame}>
          <img src="/src/assets/reset-svgrepo-com.svg" alt="reset icon" />
        </button>
        {currentPath === "/" ? (
          <div className="pseudoInfo">
            <p>Pseudo : {pseudo}</p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

GameParams.propTypes = {
  setCurrentMusicIndex: PropTypes.func.isRequired,
  setUserAnswer: PropTypes.func.isRequired,
  setIsCorrectAnswer: PropTypes.func.isRequired,
  setTimerId: PropTypes.func,
  setElapsedTime: PropTypes.func,
  setSubmissionTime: PropTypes.func,
  setDisabledButton: PropTypes.func.isRequired,
  setUsedIndices: PropTypes.func.isRequired,
  setAttempts: PropTypes.func.isRequired,
  setRounds: PropTypes.func.isRequired,
  setFinishedGame: PropTypes.func.isRequired,
  setScore: PropTypes.func,
  setGameStarted: PropTypes.func,
  savePseudo: PropTypes.func,
  pseudo: PropTypes.string,
};

GameParams.defaultProps = {
  setTimerId: () => {},
  setElapsedTime: () => {},
  setSubmissionTime: () => {},
  setScore: () => {},
  setGameStarted: () => {},
  savePseudo: () => {},
  pseudo: "",
};

export default GameParams;
