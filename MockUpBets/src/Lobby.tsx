import React from 'react';
import { useState, useEffect } from 'react';

import { ThemeProvider, Typography, TextField, Stack} from '@mui/material';
import { theme } from "./Theme";
import GetButtons from "./Buttons";
import SideBar from "./SideBar"
import { IGames, GamesBySportKey, GamesByLeague, gamesDict } from './SideBar';
import SwipeableEdgeDrawer from './Drawer';

type LobbyProps = {
  config: any;
  view: string;
  setView: any;
};

const lb = {  //background, this is where is control the what the background looks like 
	sizex:  40, 
	sizey:  40, 
} 


export default function Lobby(props: LobbyProps) {
  const [showLeague, setLeague] = useState<GamesByLeague | null>(null);
  const [showGame, setGame] = useState<IGames | null>(null);
  const [selectedOutcome, setSelectedOutcome] = useState<number | null>(null);

  // Function to handle game selection
  const handleGameSelection = (game: IGames, outcomeIndex: number) => {
    setGame(game);
    setSelectedOutcome(outcomeIndex);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <SwipeableEdgeDrawer game={showGame} outcomeI={selectedOutcome} />
        <Stack spacing={2} direction="row">
          <div style={loginDiv()}>
            {GetGames(showLeague, handleGameSelection)} {/* Pass handleGameSelection to GetGames */}
          </div>
        </Stack>
      </ThemeProvider>
      <SideBar view={props.view} setView={setLeague} config={props.config} />
    </>
  );
}

function GetGames(league: GamesByLeague | null, handleGameSelection: (game: IGames, outcomeIndex: number) => void) {
  return (
    <Stack spacing={12}>
      {league != null ? (
        <>
          <div style={headlineDiv()}>
            <h2>{league.title}</h2>
          </div>
          <div>
            {league.games.map((game: IGames) => (
              <div style={betbtnDiv()} key={game.id}>
                <ul style={{ listStyleType: 'none', padding: 0, margin: 0, fontSize: '12px' }}>
                  <li>{game.bookmakers[0].markets[0].outcomes[0].name}</li>
                  <li>{game.bookmakers[0].markets[0].outcomes[1].name}</li>
                  <li>{game.commence_time}</li>
                </ul>
                {BetBtns(game, game.bookmakers[0].markets[0].outcomes, handleGameSelection)} {/* Pass handleGameSelection to BetBtns */}
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>spinner...</p>
      )}
    </Stack>
  );
}

const BetBtns = (game: IGames, outcomes: any, handleGameSelection: (game: IGames, outcomeIndex: number) => void) => {
  const handleClick = (outcomeIndex: number) => {
    handleGameSelection(game, outcomeIndex);
  };

  return (
    <>
      {outcomes.map((outcome: any, index: number) => (
        <button key={index} onClick={() => handleClick(index)}>
          {outcome.price}
        </button>
      ))}
    </>
  );
};
function betbtnDiv(): React.CSSProperties {
  const css: React.CSSProperties = {
    position: 'relative',
    height: '10vh', // You may want to use a fixed value or adjust as needed
    width: '40vw',
    top: '0%', // Center vertically
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    backgroundColor: 'rgba(250, 0, 250, 1)',
    opacity: '1',
	alignItems: 'center'
  };
  return css;
}
function headlineDiv(): React.CSSProperties {
  const css: React.CSSProperties = {
    position: 'absolute',
    height: '20%', // You may want to use a fixed value or adjust as needed
    width: '40vw',
    top: '0%', // Center vertically
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'rgba(250, 250, 250, 1)',
    opacity: '1',
  };
  return css;
}

function loginDiv(): React.CSSProperties {
  const css: React.CSSProperties = {
    position: 'absolute',
    height: lb.sizex + '%',
    width: lb.sizey  + '%',
    top: '15vh',
    left: '50%',
    transform: 'translate(-50%, 0%)',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'rgba(250, 250, 250, 0.1)',
    opacity: '1',
  };
  return css;
}
function buttonDiv(): React.CSSProperties {
  const css: React.CSSProperties = {
    position: 'absolute',
    height:"5vh",
    width: lb.sizex  + '%',
    top: '70vh',
    left: '50%',
    transform: 'translate(-50%, 0%)',
    display: 'flex',
    justifyContent: 'center',
    opacity: '1',
  };
  return css;
}

function ShowUsers() {
  const users = ["123", "jeppis", "juujaa", "viimeinenmohis", "karvis"];
  const [selected, setSelected] = useState<number | null>(null);

  const handleButtonClick = (index: number) => {
    setSelected(index);
  };

  const buttons = users.map((user, index) => (
    <GetButtons
      key={user}
      label={user}
      handler={() => handleButtonClick(index)}
      myVariant={selected === index ? "contained" : "text"}
      myColor="primary"
    />
  ));

  return buttons;
}



