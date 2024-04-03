import { useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import PostPseudo from "../components/PostPseudo";
import { usePseudo } from "../context/PseudoContext";

function Blindtest() {
  const songs = useLoaderData();
  const navigate = useNavigate();
  const { pseudo, savePseudo } = usePseudo();
  const [currentMusicIndex, setCurrentMusicIndex] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [submissionTime, setSubmissionTime] = useState(null);
  const [disabledButton, setDisabledButton] = useState(false);
  const [usedIndices, setUsedIndices] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [finishedGame, setFinishedGame] = useState(false);
  const [score, setScore] = useState(0);
  const [hints, setHints] = useState("");
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const savedPseudo = localStorage.getItem("pseudo");
    const savedGameStarted = localStorage.getItem("gameStarted");

    if (savedPseudo) {
      savePseudo(savedPseudo);
    }

    if (savedGameStarted === "true") {
      setGameStarted(true);
    }
  }, []);

  const handlePseudoSubmit = (submittedPseudo) => {
    savePseudo(submittedPseudo);
    setGameStarted(true);

    localStorage.setItem("pseudo", submittedPseudo);
    localStorage.setItem("gameStarted", "true");
  };

  const getRandomIndex = () => {
    let random;
    do {
      random = Math.floor(Math.random() * songs.length);
    } while (usedIndices.includes(random));
    setUsedIndices((prevUsedIndices) => [...prevUsedIndices, random]);
    return random;
  };

  const startTimer = () => {
    const startTime = performance.now();

    const id = setInterval(() => {
      const currentTime = performance.now();
      const elapsedTimeInSeconds = Math.floor((currentTime - startTime) / 1000);
      setElapsedTime(elapsedTimeInSeconds);
    }, 1000);
    setTimerId(id);
  };

  const stopTimer = () => {
    clearInterval(timerId);
    setTimerId(null);
  };

  const playRandomSong = () => {
    const randomIndex = getRandomIndex();
    if (rounds === 10) {
      setFinishedGame(true);
      setSubmissionTime(elapsedTime);
      stopTimer();
    } else {
      setCurrentMusicIndex(randomIndex);
      setSubmissionTime(null);
      setIsCorrectAnswer(false);
      setDisabledButton(true);
      setElapsedTime(0);
      startTimer();
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
        const pointsForGoodAnswer = 10 * (attempts + 1) * elapsedTime;
        setUserAnswer("");
        setDisabledButton(false);
        setSubmissionTime(elapsedTime);
        stopTimer();
        setScore(score + pointsForGoodAnswer);

        if (rounds === 10) {
          setFinishedGame(true);
          setSubmissionTime(elapsedTime);
          stopTimer();
        }
      } else {
        setUserAnswer("");
        setAttempts(attempts + 1);
        generateHint();
        if (attempts === 2) {
          const penalty = 300 * elapsedTime;
          stopTimer();
          setDisabledButton(false);
          setScore(score + penalty);
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
  } else if (rounds === 10 && attempts === 3 && !isCorrectAnswer) {
    displayText = "Voir mon score";
  } else {
    displayText = "En cours";
  }

  useEffect(() => {
    if (currentMusicIndex !== null && !isCorrectAnswer) {
      startTimer();
    } else {
      stopTimer();
    }

    return () => {
      stopTimer();
    };
  }, [currentMusicIndex, isCorrectAnswer]);

  async function handleScore() {
    if (finishedGame === true) {
      try {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/scores`, {
          score,
          username: pseudo,
        });
      } catch (error) {
        console.error("Error POST request:", error);
      }
    }
  }
  useEffect(() => {
    handleScore();
  }, [finishedGame]);

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
    <div className="mainWindow">
      <div className="topButtons">
        <button type="button" className="rulesButton">
          <p>📖</p>
        </button>
        <button
          type="button"
          className="linkScore"
          onClick={() => navigate("leaderboard")}
        >
          <p>🏆</p>
        </button>
      </div>

      {gameStarted ? (
        <div className={!finishedGame ? "gameWindow" : "endScreen"}>
          <button className="resetButton" type="button" onClick={resetGame}>
            <img src="/src/assets/reset-svgrepo-com.svg" alt="reseticon" />
          </button>
          <div className="musicPlayerOn">
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
            className="playButton"
            onClick={playRandomSong}
            disabled={disabledButton}
          >
            <p>{displayText}</p>
            <img
              src={
                displayText === "Voir mon score"
                  ? "/src/assets/trophy-svgrepo-com.svg"
                  : "/src/assets/play-button-movie-svgrepo-com.svg"
              }
              alt="playicon"
            />
          </button>
          <div className="gameRecap">
            <p>Round {rounds}/10</p>
            <p>Essais : {attempts}/3</p>
          </div>
          <div className="answerDiv">
            <div className="playerInput">
              <label htmlFor="userAnswer">Votre réponse :</label>
              <div className="datalist-container">
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
                className="answerButton"
                onClick={handleSubmit}
                disabled={attempts > 2 || isCorrectAnswer}
              >
                <p>Valider</p>
              </button>
            )}
          </div>
          {isCorrectAnswer && (
            <div className="correctAnswer">
              <p>Bonne Réponse !</p>
              <p>Temps: {submissionTime} secondes</p>
              <div className="linksToPlatforms">
                <p>Retrouvez cette musique sur YouTube :</p>
                <div className="youtubeLink">
                  <a
                    aria-label="youtubeLink"
                    href={songs[currentMusicIndex].link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/src/assets/youtube-svgrepo-com.svg"
                      alt="youtubeicon"
                    />
                  </a>
                </div>
              </div>
            </div>
          )}
          {attempts === 3 && (
            <div className="failedRound">
              <p>La bonne réponse était : {songs[currentMusicIndex].game}</p>
            </div>
          )}
        </div>
      ) : (
        <PostPseudo onSubmit={handlePseudoSubmit} />
      )}
      {finishedGame && (
        <div className="finishedGame">
          <p>Partie terminée</p>
          <div>Score : {score} points</div>
          <button type="button" onClick={resetGame}>
            Recommencer
          </button>
        </div>
      )}
    </div>
  );
}

export const loadSongsData = async () => {
  try {
    const songsData = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/songs`
    );
    const data = await songsData.json();
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export default Blindtest;
