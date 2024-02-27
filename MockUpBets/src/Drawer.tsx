import * as React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { IGames, GamesBySportKey, GamesByLeague, gamesDict } from './SideBar';
import {FormLabel } from '@mui/material';
import TextField from '@mui/material/TextField';
import { FormControl, Input, InputLabel } from '@mui/material';
import MaskedInput, { MaskedInputProps } from 'react-text-mask';
import { NumericFormat } from 'react-number-format';
import { useState } from 'react';

const drawerBleeding = 56;

interface Props {
	game : IGames,
	myOutcome : number,
  window?: () => Window;
}


const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor:
    theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const StyledBox = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled('div')(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));
// ... (your other imports)

export default function SwipeableEdgeDrawer({ game, outcomeI }: { game: IGames | null, outcomeI: number | null }) {
  const [open, setOpen] = React.useState(false);
    console.table(game); console.log(outcomeI);

 React.useEffect(() => {
    // Check if both game and outcomeI have values
    if (game !== null && outcomeI !== null) {
      setOpen(true);
    }
  }, [game, outcomeI]);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  // This is used only for the example
  const container =
    typeof window !== 'undefined' ? () => window.document.body : undefined;

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: 'visible',
            right: "20vw",
            left: "60vw",
          },
        }}
      />
      <Box sx={{ textAlign: 'center', pt: 1 }}>
        <Button onClick={toggleDrawer(true)}>Open</Button>
      </Box>
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            px: 3,
            pb: 2,
            height: '100%',
            overflow: 'auto',
          }}
        >
          <Skeleton variant="rectangular" height="100%" />
          {game !== null && outcomeI !== undefined && <MatchDetails game={game} outcomeI={outcomeI} />}

        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

function MatchDetails({ game, outcomeI }: { game: IGames | null, outcomeI: number | null }) {
  const [inputValue, setInputValue] = useState('0');

  const handleInputChange = (value: any) => {
    setInputValue(value);
  };

  if (game == null || outcomeI == null) return <></>; // or return null;

  const firstOutcome = game.bookmakers[0].markets[0].outcomes[0];
  const selectedOutcome = game.bookmakers[0].markets[0].outcomes[outcomeI];

  return (
    <>
      <div style={betbtnDiv()}>
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0, fontSize: '10px' }}>
          <li>{firstOutcome.name}</li>
          <li>{game.bookmakers[0].markets[0].outcomes[1].name}</li>
          <li>{game.commence_time}</li>
        </ul>
        <p style={{ padding: 6, margin: 5, fontSize: '13px' }}> {selectedOutcome.name}</p>
        <p style={{ padding: 0, margin: 0, fontSize: '13px' }}> {selectedOutcome.price}</p>
      </div>

      <div style={placebetbtnDiv()}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <MyStyledTextField onValueChange={handleInputChange} />
          <PlaceBetButton />
          <p style={{ padding: 3, margin: 0, fontSize: '10px', alignSelf: 'right', textAlign: 'center' }}>
            win: {selectedOutcome.price * parseFloat(inputValue)}
          </p>
        </div>
      </div>
    </>
  );
}



interface MyStyledTextFieldProps {
  onValueChange: (value: any) => void;
}

const MyStyledTextField: React.FC<MyStyledTextFieldProps> = ({ onValueChange }) => {
  const containerStyle: React.CSSProperties = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    border: '0px solid #ccc',
    borderRadius: '0px',
    padding: '1px',
    transform: 'translate(-50%, -50%)',
    height: '40%',
    width: '60%',
    backgroundColor: 'rgba(250, 250, 250, 1)',
  };

  const materialUITextFieldProps: any = {
    id: "filled-multiline-flexible",
    label: "Bet",
    multiline: true,
    maxRows: 4,
    variant: "filled",
  };

  // State to hold the current value
  const [inputValue, setInputValue] = useState<string>('');

  const handleValueChange = (values: { value: string }) => {
    setInputValue(values.value);
    onValueChange(values.value); // Pass the value to the parent component
  };

  return (
    <div style={containerStyle}>
      <NumericFormat
        value={inputValue}
        allowNegative={false}
        allowLeadingZeros={false}
        customInput={TextField}
        onValueChange={handleValueChange}
        {...materialUITextFieldProps}
      />
      {/* You can now access the value using the 'inputValue' state */}
    </div>
  );
};



const PlaceBetButton = () => {
  // Define the click handler for the button
  const handleClick = () => {
    // Implement your logic for handling the click event
    console.log('Place Bet clicked');
  };

  return (
    <div>
      <Button  style={{ 	
	  position: 'absolute',
    top: '80%', 
    left: '50%',    transform: 'translate(-50%, -50%)',

    border: '0px solid #ccc',
    borderRadius: '50px',
    padding: '9px',
	 height: '10%', // You may want to use a fixed value or adjust as needed
    width: '60%', }} variant="contained" color="primary" onClick={handleClick}>
        Bet
      </Button>
    </div>
  );
};
function betbtnDiv(): React.CSSProperties {
  const css: React.CSSProperties = {
    position: 'absolute',
    height: '20%', // You may want to use a fixed value or adjust as needed
    width: '80%',
    top: '25%', // Center vertically
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    backgroundColor: 'rgba(250, 0, 250, 0.6)',
    opacity: '1',
	alignItems: 'center'
  };
  return css;
}
function placebetbtnDiv(): React.CSSProperties {
  const css: React.CSSProperties = {
    position: 'absolute',
    height: '30%', // You may want to use a fixed value or adjust as needed
    width: '80%',
    top: '80%', // Center vertically
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(250, 250, 0, 0.6)',
    opacity: '1',
	alignItems: 'right',
	    display: 'flex',

  };
  return css;
}

