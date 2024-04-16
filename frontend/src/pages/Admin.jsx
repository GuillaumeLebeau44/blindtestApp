import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Connexion from "../components/Connexion";
import PostSongForm from "../components/PostSongForm";
import DeleteSongForm from "../components/DeleteSongForm";
import EditSongForm from "../components/EditSongForm";

function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedTab, setSelectedTab] = useState(
    localStorage.getItem("selectedTab") || "tab1"
  );

  useEffect(() => {
    // Vérifier si le token est présent dans le localStorage
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  if (!isLoggedIn) {
    return <Connexion connexion={isLoggedIn} setConnexion={setIsLoggedIn} />;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("selectedTab");
    setIsLoggedIn(false);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    localStorage.setItem("selectedTab", tab);
  };

  return (
    <div className="adminContainer">
      <div className="link">
        <NavLink to="/">Vers le site</NavLink>
        <button type="button" onClick={handleLogout}>
          Deconnexion
        </button>
      </div>
      <div className="adminButtons">
        <div className="tabSwitch">
          <button type="button" onClick={() => handleTabChange("tab1")}>
            <img src="/src/assets/add-lg-svgrepo-com.svg" alt="IconeAjout" />
          </button>
          <button type="button" onClick={() => handleTabChange("tab2")}>
            <img src="/src/assets/trash-svgrepo-com.svg" alt="IconeSupprimer" />
          </button>
          <button type="button" onClick={() => handleTabChange("tab3")}>
            <img src="/src/assets/edit-2-svgrepo-com.svg" alt="IconeEditer" />
          </button>
        </div>
        <button className="refreshButton" type="button" onClick={handleRefresh}>
          <img src="/src/assets/reset-svgrepo-com.svg" alt="refresh button" />
        </button>
      </div>

      <div className="addRemoveForms">
        {selectedTab === "tab1" && (
          <PostSongForm setIsLoggedIn={setIsLoggedIn} />
        )}
        {selectedTab === "tab2" && (
          <DeleteSongForm setIsLoggedIn={setIsLoggedIn} />
        )}
        {selectedTab === "tab3" && (
          <EditSongForm setIsLoggedIn={setIsLoggedIn} />
        )}
      </div>
    </div>
  );
}

export default Admin;
