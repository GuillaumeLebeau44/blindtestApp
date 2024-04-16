import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import GameParams from "../components/GameParams";
import FailedRound from "../components/FailedRound";
import WinRound from "../components/WinRound";

function EndlessBlindtest() {
  const songs = useLoaderData();

  const [currentMusicIndex, setCurrentMusicIndex] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  const [usedIndices, setUsedIndices] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [hints, setHints] = useState("");
  const [finishedGame, setFinishedGame] = useState(false);

  const getRandomIndex = () => {
    let random;
    do {
      random = Math.floor(Math.random() * songs.length);
    } while (usedIndices.includes(random));
    setUsedIndices((prevUsedIndices) => [...prevUsedIndices, random]);
    return random;
  };

  const playRandomSong = () => {
    const randomIndex = getRandomIndex();
    if (rounds === songs.length) {
      setFinishedGame(true);
    } else {
      setCurrentMusicIndex(randomIndex);
      setIsCorrectAnswer(false);
      setDisabledButton(true);
      setAttempts(0);
      setRounds(rounds + 1);
    }
  };

  const generateHint = () => {
    if (currentMusicIndex !== null) {
      const currentSong = songs[currentMusicIndex];

      if (attempts === 0) {
        const firstHint = currentSong.game.charAt(0).toUpperCase();
        setHints(firstHint);
        setUserAnswer((prevUserAnswer) => prevUserAnswer + firstHint);
      } else if (attempts === 1) {
        const secondHint = currentSong.game.charAt(1).toLowerCase();
        setHints((prevHints) => prevHints + secondHint);
        setUserAnswer((prevUserAnswer) => prevUserAnswer + hints + secondHint);
      }
    }
  };

  const handleSubmit = () => {
    if (currentMusicIndex !== null) {
      const currentSong = songs[currentMusicIndex];
      const isAnswerCorrect =
        userAnswer.toLowerCase() === currentSong.game.toLowerCase();
      setIsCorrectAnswer(isAnswerCorrect);
      if (isAnswerCorrect === true) {
        setUserAnswer("");
        setDisabledButton(false);
      } else {
        setUserAnswer("");
        setAttempts(attempts + 1);
        generateHint();
        if (attempts === 2) {
          setDisabledButton(false);
        }
      }
    }
  };

  const handleKeySubmit = (e) => {
    if (userAnswer.length >= 3 && e.key === "Enter") {
      handleSubmit();
    }
  };

  let displayText;
  if (!disabledButton && rounds === 0) {
    displayText = "Jouer";
  } else if (rounds > 0 && isCorrectAnswer) {
    displayText = "Musique suivante";
  } else if (rounds < 10 && attempts === 3 && !isCorrectAnswer) {
    displayText = "Musique suivante";
  } else {
    displayText = "En cours";
  }

  return (
    <div className="mainWindowE">
      <GameParams
        setCurrentMusicIndex={setCurrentMusicIndex}
        setUserAnswer={setUserAnswer}
        setIsCorrectAnswer={setIsCorrectAnswer}
        setDisabledButton={setDisabledButton}
        setUsedIndices={setUsedIndices}
        setAttempts={setAttempts}
        setRounds={setRounds}
        setFinishedGame={setFinishedGame}
      />
      <div className={!finishedGame ? "gameWindowE" : "endScreenE"}>
        <div className="musicPlayerOnE">
          {currentMusicIndex !== null && (
            <iframe
              width="0"
              height="0"
              src={
                isCorrectAnswer || attempts === 3
                  ? "https://www.youtube.com/embed/dQw4w9WgXcQ?si=mWTvfLKlX8Ls-_AY&autoplay=0"
                  : songs[currentMusicIndex].embed
              }
              title="YouTube Video Player"
              allow="autoplay;"
            />
          )}
        </div>
        <button
          type="button"
          className="playButtonE"
          onClick={playRandomSong}
          disabled={disabledButton}
        >
          <p>{displayText}</p>
          <img
            src="/src/assets/play-button-movie-svgrepo-com.svg"
            alt="playicon"
          />
        </button>
        <div className="gameRecapE">
          <p>
            Round {rounds}/
            <img
              src="/src/assets/infinite-svgrepo-com.svg"
              alt="infiniteicon"
            />
          </p>
          <p>Essais : {attempts}/3</p>
        </div>
        <div className="answerDivE">
          <div className="playerInputE">
            <label htmlFor="userAnswer">Votre reponse :</label>
            <div className="datalist-containerE">
              <input
                type="text"
                id="userAnswer"
                list="userAnswerList"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={handleKeySubmit}
                disabled={attempts > 2 || isCorrectAnswer}
              />
              <datalist id="userAnswerList">
                {Array.from(new Set(songs.map((s) => s.game)))
                  .sort()
                  .map((game) => (
                    <option key={game} value={game}>
                      {game}
                    </option>
                  ))}
              </datalist>
            </div>
          </div>
          {userAnswer.length >= 3 && (
            <button
              type="button"
              className="answerButtonE"
              onClick={handleSubmit}
              disabled={attempts > 2 || isCorrectAnswer}
            >
              <p>Valider</p>
            </button>
          )}
        </div>
        {isCorrectAnswer && (
          <WinRound songs={songs} currentMusicIndex={currentMusicIndex} />
        )}
        {attempts === 3 && (
          <FailedRound songs={songs} currentMusicIndex={currentMusicIndex} />
        )}
      </div>
      {finishedGame && (
        <div className="finishedGameE">
          <p>Vous avez fait le tour de toutes les musiques disponibles !</p>
          <p>🎉Merci d'avoir joue🎉</p>
        </div>
      )}
    </div>
  );
}

export default EndlessBlindtest;
