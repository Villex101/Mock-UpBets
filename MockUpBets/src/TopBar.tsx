import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "./Theme";
import GetButtons from "./Buttons";
import TicTacToe from "./TicTacToe";

type TopBarProps = {
  view: string;
    config: any;

};

export default function TopBar(props: TopBarProps) {
console.log(props.view)

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="relative" sx={{ height: "10vh", zIndex: -1, backgroundColor:'rgba(0, 70, 180, 0.5)',  boxShadow: '0 0 10px rgba(100, 100, 200, 1)', 
  
 }}>
        <Toolbar>
<Typography
  variant="h4"
  color="primary"
  component="div"  // Use "div" as the component to allow textAlign
  sx={{ flexGrow: 1, textAlign: 'left' }}  // Set textAlign to 'left'
>            MaksuhäiriöVeikkaus
          </Typography>
          {(props.view == "register" || props.view == "login" || props.view == "landing")   && (
            <>
              <GetButtons label="Register" handler={() =>  <TicTacToe config={props.config} view="register" />  } />
              <GetButtons label="Login" handler={() =>  <TicTacToe config={props.config} view="login" />  } />
            </>
          )  }
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}