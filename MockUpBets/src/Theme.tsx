import { createTheme } from '@mui/material/styles';

export const theme = createTheme({

});

theme.palette.primary = theme.palette.augmentColor({
  color: {
    main: 'rgba(10, 0, 100, 0.9)',
  },
  name: 'primary',
});

theme.palette.secondary = theme.palette.augmentColor({
  color: {
    main: 'rgba(245, 245, 240, 0.97)',
  },
  name: 'secondary',
});