import React from 'react';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "./Theme";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
type GetButtonsProps = {
  label: string;
  handler: any;
  myVariant?: "outlined" | "text" | "contained";
  myColor?: "secondary" | "inherit" | "primary" | "success" | "error" | "info" | "warning";
};

export default function GetButtons(props: GetButtonsProps) {
  const vari = props.myVariant ?? "outlined";
  const colo = props.myColor ?? "secondary";

  return (
    <ThemeProvider theme={theme}>
      <div style={{ marginBottom: '10px' /* Add your desired styling here */ }}>
        <Button variant={vari} color={colo} onClick={props.handler}>
          {props.label}
        </Button>
      </div>

    </ThemeProvider>
  );
}