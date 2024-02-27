import React from 'react';
import { useState, useEffect } from 'react';

import { ThemeProvider, Typography, TextField, Stack} from '@mui/material';
import { theme } from "./Theme";
import Button from '@mui/material/Button';
import GetButtons from "./Buttons";
import leaguesJSON from "./leaguesJSON.json";



type LobbyProps = {
  config: any;
  view: string;
  setView: any;
};
const lb = {  //background, this is where is control the what the background looks like 
	sizex:  100, 
	sizey:  10, 
	left: 15,
} 
let leagueSetter: any;


export default function SideBar(props : any) {
  leagueSetter = props.setView;
  const config = props.config;
  return (
    <ThemeProvider theme={theme}>
		<div style={loginDiv()}>
		
          {ShowUsers(config)}
        </div>
    </ThemeProvider>
  );
}

function loginDiv(): React.CSSProperties {
  const css: React.CSSProperties = {
    position: 'absolute',
    height: lb.sizex + '%',
    width: lb.sizey  + '%',
    top: '15vh',
    left: lb.left  + '%',
    transform: 'translate(-50%, 0%)',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'rgba(250, 250, 250, 0.95)',
    opacity: '1',
  };
  return css;
}
function buttonDiv(): React.CSSProperties {
  const css: React.CSSProperties = {
    position: 'absolute',
    height:"5vh",
    width: lb.sizex  + '%',
    top: '10vh',
    left: '10%',
    transform: 'translate(-50%, 0%)',
    display: 'flex',
    justifyContent: 'center',
    opacity: '1',
  };
  return css;
}

function ShowUsers(c : any) {
  const [Selected, setSelected] = useState<string | null>(null);

  const handleButtonClick = (group: string, key: string, isLeagueBtn = false) => {
  if (!isLeagueBtn) {
    setSelected(group); 
  } else if (key != null && gamesDict[key] == null) { 
  console.log("Make request to game " + key)
    sendForGame(key, c);
  } else {
  console.log("set games from memory " + key)
    leagueSetter(gamesDict[key]);
  }
};


  const groupDict: { [key: string]: any[] } = {};
  
  leaguesJSON.forEach((league) => {
    const group = league.group;
    // Check if the group is not already in the dictionary
    if (!(group in groupDict)) {
      groupDict[group] = [];
    }
    groupDict[group].push(league);
  });
	
  let myJson = Selected == null ? leaguesJSON : groupDict[Selected];
  const leagueButtons = myJson.map((league, index) => (
	<Button
      key={league.key}
      variant={Selected === league.group ? "contained" : "text"}
      color="primary"
      onClick={() =>{ 
	  handleButtonClick(league.group, league.key, true);
	  
	  }}
    >
      {league.title}
    </Button>
	  ));
	const uniqueGroupKeys = new Set(myJson.map((league) => league.group));
	 const groupButtons = Array.from(uniqueGroupKeys).map((groupKey) => (
    <Button
      key={groupKey}
      variant={Selected === groupKey ? "contained" : "text"}
      color="primary"
      onClick={() => handleButtonClick(groupKey, "")}
    >
      {groupKey}
    </Button>
  ));
  return (
    <Stack spacing={2} direction="column">
	               <Button
            key="back"
            variant="outlined"
            color="primary"
            onClick={() => setSelected(null)}
          >
            Back
          </Button>
      {Selected != null ? leagueButtons : groupButtons}
    </Stack>
  );
}
function showError(e : any,)
{
	console.log(e)


}
export interface IGames {
  id: string;
  sport_key: string;
  sport_title: string;
  commence_time: string;
  home_team: string;
  away_team: string;
  bookmakers: any;
}

export type GamesByLeague = {
  title: string;
  games: IGames[];
}
export type GamesBySportKey = { [sport_key: string]: GamesByLeague };

export let gamesDict: GamesBySportKey = {};

function handleResponse(j: any) {
  let data;
  data = j.stuff;
  console.log(data);
const sportKey = data[0]?.sport_key;

  data.forEach((gameData: IGames) => {
    // Check if the sport_key exists in gamesDict
    if (!gamesDict[sportKey]) {
      gamesDict[sportKey] = {
        title: gameData.sport_title,
        games: [],
      };
    }

const newGame: IGames = {
  id: gameData.id,
  sport_key: gameData.sport_key,
  sport_title: gameData.sport_title,
  commence_time: gameData.commence_time,
  home_team: gameData.home_team,
  away_team: gameData.away_team,
  bookmakers: JSON.parse(gameData.bookmakers),
};
    // Add the game to the array for the corresponding sport_key
    gamesDict[sportKey].games.push(newGame);
  });
  return gamesDict[sportKey]
}




function sendForGame(l : any, c : any) {
    let obj = { message: "League", league: l };
    fetch(c.serviceroot + c.receiver, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(obj)
    })
    .then(r => {
        if (!r.ok) {
            throw new Error('Network kaput');
        }
        return r.text();
    })
    .then(responseText => {
        if (responseText.trim() === "") {
            // Handle empty response or other non-JSON response
            console.error("Response kaput");
            return;  // Or handle accordingly
        }
        // Parse the response and return the result of handleResponse
        return JSON.parse(responseText);
    })
    .then(j => {
        // Call handleResponse and get the result
        const result = handleResponse(j);
        // Call leagueSetter with the result
		console.log(result);
        leagueSetter(result);
    })
    .catch(e => showError(e));
}
