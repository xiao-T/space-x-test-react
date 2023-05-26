// detail page override styles

import { Theme, createTheme } from "@mui/material";

const detailTheme: Theme = createTheme({
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          color: "#fff",
        },
      },
    },
  },
});

export default detailTheme;
