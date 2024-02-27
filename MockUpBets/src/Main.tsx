import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { theme } from "./Theme"
import TopBar from "./TopBar"


const bg = {  //background, this is where is control the what the background looks like 
	size:  30, 
	height: -1,
	backgroundColor: 'rgba(4, 0, 2, 0.1)',
	mainTableColor: 'rgba(0, 0, 30, 0.8)',
} 
type MainProps = {
  size: number;
  height: number;
  config: any;
  view: string;
};
export default function Main(props : MainProps) { 

bg.size = props.size;
bg.height = props.height < 0 ? props.size : props.height ;

  return (
	<>
<TopBar view={props.view} config={props.config} />
<MainDiv />


</>
  );
}
//<Login key={view} config={config}/>
function MainDiv() { 
  return (
  <ThemeProvider theme={theme}>
    <div style={backgroundDiv()}>	
	<div style={mainTableDiv()}>
	</div>
    </div>		
	</ThemeProvider>
	);
}




function backgroundDiv(): React.CSSProperties {  //0.8 opacity background
  const bigDivStyle: React.CSSProperties = {
  
    position: 'absolute',
    height: "100%",
    width: '100%',
    top:  '0vh',
    right: '0',
    backgroundColor: bg.backgroundColor,
    //padding: '2rem',
    opacity: '1',
  };
  return bigDivStyle;
}

function mainTableDiv(): React.CSSProperties {
const tableDivStyle: React.CSSProperties = {
  position: 'absolute',
  height: bg.height + '%',
  width: bg.size + "%",
  top:  "10vh",
  left: '50%',
  transform: 'translate(-50%, 0%)',
  display: 'flex',
  justifyContent: 'center',
  backgroundColor: bg.mainTableColor,
  //padding: '2rem',
  opacity: '1',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', 
};
  return tableDivStyle;
}


