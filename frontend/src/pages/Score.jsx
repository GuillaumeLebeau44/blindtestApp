import { NavLink, useLoaderData } from "react-router-dom";

function Score() {
  const scores = useLoaderData();

  const isScoresEmpty = scores.length === 0;

  return (
    <div className="mainScoreWindow">
      <div className="link">
        <NavLink to="/">Retour</NavLink>
      </div>
      <div className="leaderboard">
        <h1>LEADERBOARD</h1>
        {isScoresEmpty ? (
          <p>
            Personne n'a inscrit de score pour le moment ! <br /> A vous de
            jouer !
          </p>
        ) : (
          <ul className="scoreboard scoreboard-with-padding">
            {scores.map((score) => (
              <li key={score.id} className="userScore">
                <span className="userPseudo">{score.username}</span>
                <span className="dotsBetween">
                  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                  . . . . . . . . . . . . . . . . . . . . . . . . . . .
                </span>
                <span className="userPoints">{score.points}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export const loadScoresData = async () => {
  try {
    const scoresData = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/scores`
    );
    const data = await scoresData.json();
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export default Score;
