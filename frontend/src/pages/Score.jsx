import { NavLink, useLoaderData } from "react-router-dom";

function Score() {
  const scores = useLoaderData();

  return (
    <div>
      <div className="link">
        <NavLink to="/">Retour</NavLink>
      </div>
      <div>
        {scores.map((score) => (
          <div key={score.id}>
            {score.username}: {score.points}
          </div>
        ))}
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
