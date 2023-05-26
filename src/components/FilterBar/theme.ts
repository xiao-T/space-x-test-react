// override styles
import { Theme, createTheme } from "@mui/material/styles";
const filterTheme: Theme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) =>
          theme.unstable_sx({
            p: theme.spacing(1),
          }),
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: ({ theme }) =>
          theme.unstable_sx({
            fontSize: "14px",
          }),
      },
    },
  },
});

export default filterTheme;
