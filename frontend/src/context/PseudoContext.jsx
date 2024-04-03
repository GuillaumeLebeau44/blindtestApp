import React, { createContext, useContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

const PseudoContext = createContext();

export const usePseudo = () => useContext(PseudoContext);

export function PseudoProvider({ children }) {
  const [pseudo, setPseudo] = useState("");

  const savePseudo = (newPseudo) => {
    setPseudo(newPseudo);
  };

  const pseudoContextValue = useMemo(
    () => ({ pseudo, savePseudo }),
    [pseudo, savePseudo]
  );

  return (
    <PseudoContext.Provider value={pseudoContextValue}>
      {children}
    </PseudoContext.Provider>
  );
}

PseudoProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
