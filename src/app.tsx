import React from "react";
import { Board } from "./component/board.component";
import { MODE } from "./core/gamestatus";
import { AppLayout } from "./layouts/app-layout";

export const App = () => {
  const [currentGameMode, setcurrentGameMode] = React.useState(MODE.PvP);

  const changeCurrentGameMode = (newMode:string) => {
    setcurrentGameMode(newMode);
  }

  return (
    <AppLayout changeCurrentGameMode={changeCurrentGameMode}>
      <Board currentGameMode={currentGameMode}/>
    </AppLayout>
  );
};
