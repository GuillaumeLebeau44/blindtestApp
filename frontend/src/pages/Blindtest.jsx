import { useState, useEffect, useRef } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import PostPseudo from "../components/PostPseudo";
import { usePseudo } from "../context/PseudoContext";
import Rules from "../components/Rules";
import GameParams from "../components/GameParams";
import FailedRound from "../components/FailedRound";
import WinRound from "../components/WinRound";
import About from "../components/About";

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
  const [displayRules, setDisplayRules] = useState(false);
  const [displayAbout, setDisplayAbout] = useState(false);

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

  const handleUserAnswerChange = (e) => {
    const { value } = e.target;
    const filteredValue = value.replace(/[<>]/g, "");

    setUserAnswer(filteredValue);
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
    if (finishedGame === true && pseudo.length === 5 && !Number.isNaN(score)) {
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

  const handleDisplayRules = () => {
    setDisplayRules((prevDisplayRules) => !prevDisplayRules);
    setDisplayAbout(false);
  };

  const handleDisplayAbout = () => {
    setDisplayAbout((prevDisplayAbout) => !prevDisplayAbout);
    setDisplayRules(false);
  };

  const rulesRef = useRef();
  const aboutRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        rulesRef.current &&
        !rulesRef.current.contains(event.target) &&
        aboutRef.current &&
        !aboutRef.current.contains(event.target)
      ) {
        setDisplayRules(false);
        setDisplayAbout(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const replayGame = () => {
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

    localStorage.removeItem("gameStarted");
  };

  return (
    <div className="mainWindow">
      <div className="topButtons">
        <button
          type="button"
          className="rulesButton"
          onClick={handleDisplayRules}
        >
          <p>📖</p>
        </button>
        <button
          type="button"
          className="linkScore"
          onClick={() => navigate("leaderboard")}
        >
          <p>🏆</p>
        </button>
        <button
          type="button"
          className="aboutButton"
          onClick={handleDisplayAbout}
        >
          <p>❔</p>
        </button>
      </div>
      <div
        className={`rulesBox ${displayRules ? "fadeIn" : ""}`}
        ref={rulesRef}
      >
        {displayRules && <Rules handleDisplayRules={handleDisplayRules} />}
      </div>
      <div
        className={`aboutBox ${displayAbout ? "fadeIn" : ""}`}
        ref={aboutRef}
      >
        {displayAbout && <About handleDisplayAbout={handleDisplayAbout} />}
      </div>

      <GameParams
        setCurrentMusicIndex={setCurrentMusicIndex}
        setUserAnswer={setUserAnswer}
        setIsCorrectAnswer={setIsCorrectAnswer}
        setTimerId={setTimerId}
        setElapsedTime={setElapsedTime}
        setSubmissionTime={setSubmissionTime}
        setDisabledButton={setDisabledButton}
        setUsedIndices={setUsedIndices}
        setAttempts={setAttempts}
        setRounds={setRounds}
        setFinishedGame={setFinishedGame}
        setScore={setScore}
        savePseudo={savePseudo}
        setGameStarted={setGameStarted}
        pseudo={pseudo}
      />

      {gameStarted ? (
        <div className={!finishedGame ? "gameWindow" : "endScreen"}>
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
              alt="play icon"
            />
          </button>
          <div className="gameRecap">
            <p>Round {rounds}/10</p>
            <p>Essais : {attempts}/3</p>
          </div>
          <div className="answerDiv">
            <div className="playerInput">
              <label htmlFor="userAnswer">Votre reponse :</label>
              <div className="datalist-container">
                <input
                  type="text"
                  id="userAnswer"
                  list="userAnswerList"
                  value={userAnswer}
                  onChange={handleUserAnswerChange}
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
            <WinRound
              submissionTime={submissionTime}
              songs={songs}
              currentMusicIndex={currentMusicIndex}
            />
          )}
          {attempts === 3 && (
            <FailedRound songs={songs} currentMusicIndex={currentMusicIndex} />
          )}
        </div>
      ) : (
        <PostPseudo onSubmit={handlePseudoSubmit} />
      )}
      {finishedGame && (
        <div className="finishedGame">
          <p>Partie terminee</p>
          <div>Score : {score} points</div>
          <button type="button" onClick={replayGame}>
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
