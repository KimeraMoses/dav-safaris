import React from "react";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

const Theme = (props) => {
  const ThemeColors = {
    primary: "#5BC787",
    secondary: "#f15d30",
  };
  const theme = createTheme({
    palette: {
      type: "light",
      primary: {
        main: ThemeColors.primary,
        dark: "#588048",
        contrastText: "#fff",
      },
      secondary: {
        main: ThemeColors.secondary,
        contrastText: "#fff",
      },
      error:{
        main: '#d32f2f',
        dark: '#ff5722',
      }
      
    },
  });
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};
export default Theme;
