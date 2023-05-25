// override styles
import { createTheme } from "@mui/material/styles";
const recordListTheme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#000",
          color: "#fff",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          paddingInline: 0,
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          paddingInline: 0,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderColor: "rgba(255, 255, 255, 0.3)",
          color: "#fff",
          borderRadius: 0,

          "&:hover": {
            borderColor: "rgba(255, 255, 255, 1)",
          },
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        item: ({ theme }) => {
          return {
            width: "50%",
            [theme.breakpoints.down("sm")]: {
              width: "100%",
            },
          };
        },
      },
    },
  },
});

export default recordListTheme;
