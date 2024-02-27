import React from 'react';
import { Dispatch, SetStateAction } from 'react';
import { TextField, Button } from '@mui/material';
import Game from './Game';
import Main from "./Main"
import Login from "./Login"
import configureApp from "./App"
import TopBar from "./TopBar"
import Lobby from "./Lobby"
import SideBar from "./SideBar"
import Admin from "./Admin"


//What i want to do user to do: Login/Register --> lobby <--> game
//Ill use this function to assemble everything as there is already nice example on how to call diffrent parts 
type TicTacToeProps = {
  config: any;
  view: string;
};
function TicTacToe(props: TicTacToeProps) {
  let config = props.config;

	let [view, setView] = React.useState(props.view);

	let ret;
  console.log(props.view);

  switch (view) {
     case "lobby":
          ret = (
        <>
          	 <Main size={50} height={100} config={config} view={props.view}  />
			<Lobby view={props.view} setView={setView} config={config}  />
        </>
      );
      break;
        case "login":
    case "register":
     ret  = (
	 <>
	 <Main size={30} height={90} config={config} view={props.view}/>
	 <Login view={props.view} setView={setView} config={config}  />
	 </>
	 );
      break;
    default:
	      ret = (
        <>
          	 <Main size={0} height={-1} config={config} view={props.view} />
			 <p>something went wrong:(</p>
        </>
      );;
	  console.log(view)
      break;
  }

  return ret;
}

export default TicTacToe;
