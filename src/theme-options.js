import { ThemeOptions } from "@mui/material";
import { blue, cyan, green, orange, lime, red, indigo } from "@mui/material/colors";

export const themeOptions = {
  palette: {
    primary: indigo,
    secondary: lime,
    error: red,
    warning: orange,
    info: cyan,
    success: green,
  },
  typography: {
    fontFamily: ["Noto Sans", "Yu Gothic", "Roboto", "sans-serif"].join(","),
    fontSize: 14,
  },
};
