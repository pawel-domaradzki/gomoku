import { Route, Routes } from "react-router-dom";
import "./App.css";

import NewGameMenu from "./pages/NewGameMenu";
import Game from "./pages/Game";
import NoMatch from "./pages/NoMatch";

function App() {
  return (
    <div>
      <Routes>
        <Route index element={<NewGameMenu />} />
        <Route path="game" element={<Game />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}

export default App;
