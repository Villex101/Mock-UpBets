import React from 'react';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { TextField, Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "./Theme"
import GetButtons from "./Buttons"
import TicTacToe from "./TicTacToe";


const lg = {  //background, this is where is control the what the background looks like 
	size:  30, 
} 
type LoginProps = {
  config: any;
  view: string;
setView: any;
};
let viewSetter : any;
export default function Login(props : LoginProps) 
{
	viewSetter = props.setView;
	let config = props.config;
	let email : string = "";
	let pass : string = "";
	
	let header = props.view === "login" ? "Login" : "Register" 

	 return (
	   <ThemeProvider theme={theme}>

    <div style={loginDiv()}>
      <Stack spacing={2} direction="column">
	    <Typography variant="h6" color="secondary" component="div" sx={{ flexGrow: 1, }}>
		{header}
         </Typography>
        <TextField onChange={e => {email = e.target.value;}} label="Email" style={textFieldStyle()} />
        <TextField onChange={e => {pass = e.target.value;}} label="Pass" style={textFieldStyle()} />
        <GetButtons
		label="Sign in (or create a new account and sign it with it :-)"
		handler={(e: React.MouseEvent<HTMLButtonElement>) => getSession(e, email, pass, config)}
		/>
      </Stack>
    </div>
		</ThemeProvider>

  );
}

function loginDiv(): React.CSSProperties {
  const css: React.CSSProperties = {
    zIndex: "10",
    position: 'absolute',
    height: lg.size + "%",
    width: lg.size + "%",
    top:  "10vh",
    left: '50%',
    transform: 'translate(-50%, 0%)',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'rgba(200, 200, 200, 0.2',
    padding: '2rem',
    opacity: '1',
  };
  return css;
}

function textFieldStyle(): React.CSSProperties {
  const css: React.CSSProperties = {
    margin: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    padding: '0.5rem',
    width: '80%',
	 height: '6vh',
    fontSize: '16px',
	backgroundColor: 'white',
  };
  
  return css;
}
function confirmSession(j : any, c: any | undefined)
{
	if (j.success)
	{
		console.log(j)
		viewSetter("lobby");
	}

	else 
	{
			console.log(j)

		alert("Whooooops... something went wrong, you now need to dig up the .jsx and .php files and start checking what it might have been. This message from TicTacToe.tsx, confirmSession-function.");

	}
}

function showError(e : any)
{
	alert("Whoops... communication with the server did not work out... or the JSON has some weirdness in it... Check out the console.");
	console.log(e);

}

function getSession(event : any, m: string, p: string, c : any)
{
	let obu = { email : m, pass : p};
	console.log(m +" " + p +"")
 	fetch(c.serviceroot+c.login, { method : "POST", mode : "cors", credentials : "include",
                                             headers: {'Content-Type': 'text/plain'}, 
                                             body : JSON.stringify(obu) }).
	then( r => r.json() ).then( j => { confirmSession(j,c)} ).catch( e => showError(e));
}

function logout()
{
	//EXERCISE 3:  This is not enough! The server side needs to be contacted to reset the uid in the session there too!
	//	       If you don't do that the next person sitting in front of the same browser will get to play another users'
        //             games! But before you get there you need to add a "logout"-button to the top-/sidebar you've added?!-)
}


