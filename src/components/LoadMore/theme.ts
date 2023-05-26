// override styles
import { Theme, createTheme } from "@mui/material/styles";
const loadMoreTheme: Theme = createTheme({
  components: {
    MuiFab: {
      styleOverrides: {
        root: ({ theme }) => {
          return {
            position: "fixed",
            bottom: theme.spacing(2),
            right: theme.spacing(2),
            opacity: 0.6,
            "&:hover": {
              opacity: 0.8,
            },
          };
        },
      },
    },
  },
});

export default loadMoreTheme;
