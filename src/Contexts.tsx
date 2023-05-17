import React, { useState, createContext } from "react";
import { Maybe } from "./types";

interface ContextProviderProps {
  children: React.ReactNode;
}

interface GameModeContextType {
  gameMode: Maybe<string>;
  setGameMode: React.Dispatch<React.SetStateAction<Maybe<string>>>;
}

interface PlayerContextType {
  playerMark: Maybe<string>;
  setPlayerMark: React.Dispatch<React.SetStateAction<Maybe<string>>>;
}

export const GameModeContext = createContext({} as GameModeContextType);

export const PlayerContext = createContext({} as PlayerContextType);

export const GameModeContextProvider = ({ children }: ContextProviderProps) => {
  const [gameMode, setGameMode] = useState<string | null>(null);
  return (
    <GameModeContext.Provider value={{ gameMode, setGameMode }}>
      {children}
    </GameModeContext.Provider>
  );
};

export const PlayerContextProvider = ({ children }: ContextProviderProps) => {
  const [playerMark, setPlayerMark] = useState<Maybe<string>>("x");
  return (
    <PlayerContext.Provider value={{ playerMark, setPlayerMark }}>
      {children}
    </PlayerContext.Provider>
  );
};
