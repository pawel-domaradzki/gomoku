import { Route, Routes } from "react-router-dom";

import Game from "./pages/Game";
import NewGameMenu from "./pages/NewGameMenu";
import NoMatch from "./pages/NoMatch";

import { GameModeContextProvider, PlayerContextProvider } from "./Contexts";

function App() {
  return (
    <PlayerContextProvider>
      <GameModeContextProvider>
        <div className="wrapper">
          <Routes>
            <Route index element={<NewGameMenu />} />
            <Route path="game" element={<Game />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </div>
      </GameModeContextProvider>
    </PlayerContextProvider>
  );
}

export default App;
