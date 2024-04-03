import { Outlet } from "react-router-dom";
import { PseudoProvider } from "./context/PseudoContext";

function App() {
  return (
    <PseudoProvider>
      <div>
        <Outlet />
      </div>
    </PseudoProvider>
  );
}

export default App;
