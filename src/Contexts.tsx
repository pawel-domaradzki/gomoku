import React, { useState, createContext } from "react";
import { Maybe } from "./types";
import useLocalStorage from "./hooks/useLocalStorage";

export const GameModeContext = createContext({} as GameModeContextType);

export const PlayerContext = createContext({} as PlayerContextType);

export const GameModeContextProvider = ({ children }: ContextProviderProps) => {
  const [storageName] = useLocalStorage("gameMode", "");
  const [gameMode, setGameMode] = useState<string | null>(storageName);
  return (
    <GameModeContext.Provider value={{ gameMode, setGameMode }}>
      {children}
    </GameModeContext.Provider>
  );
};

export const PlayerContextProvider = ({ children }: ContextProviderProps) => {
  const [playerMark, setPlayerMark] = useState<string>("x");
  return (
    <PlayerContext.Provider value={{ playerMark, setPlayerMark }}>
      {children}
    </PlayerContext.Provider>
  );
};

interface ContextProviderProps {
  children: React.ReactNode;
}

interface GameModeContextType {
  gameMode: Maybe<string>;
  setGameMode: React.Dispatch<React.SetStateAction<Maybe<string>>>;
}

interface PlayerContextType {
  playerMark: Maybe<string>;
  setPlayerMark: React.Dispatch<React.SetStateAction<string>>;
}
