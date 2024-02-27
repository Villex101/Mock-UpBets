import React from 'react';
import { useState, useEffect } from 'react';

import { ThemeProvider, Typography, TextField, Stack} from '@mui/material';
import { theme } from "./Theme";
import GetButtons from "./Buttons";

type LobbyProps = {
  config: any;
  view: string;
  setView: any;
};
const lb = {  //background, this is where is control the what the background looks like 
	sizex:  40, 
	sizey:  40, 

} 
let viewSetter: any;

export default function Admin(props: LobbyProps) {
  viewSetter = props.setView;
  const config = props.config;
  let email: string = '';
  let pass: string = '';
 
  return (
    <ThemeProvider theme={theme}>
	  <Stack spacing={2} direction="row">
      <div style={loginDiv()}>
{ShowUsers()} 
      </div>
	  	 </Stack>
    </ThemeProvider>
  );
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
    backgroundColor: 'rgba(250, 250, 250, 1)',
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
  const users = ["GenLeagues", "TestGetOdds", "GetOdds"];

  const handleButtonClick = (index: number) => {
  if(index == 0){ console.log("GenLeagues");
  
  
  }
  if(index == 1) console.log("TestGetOdds");
  if(index == 2) console.log("GetOdds");
  };

  const buttons = users.map((user, index) => (
    <GetButtons
      key={user}
      label={user}
      handler={() => handleButtonClick(index)}
      myVariant={"text"}
      myColor="primary"
    />
  ));

  return buttons;
}

