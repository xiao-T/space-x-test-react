// load more wrapper

import React, { FC, PropsWithChildren, useState, useEffect } from "react";
import { Box, Grid, Fab, CircularProgress } from "@mui/material";
import { ArrowUpward } from "@mui/icons-material";
import { ThemeProvider } from "@emotion/react";
import loadMoreTheme from "./theme";

let timer: any;

// load more props
type TLoadMoreProps = {
  onLoadMore: () => Promise<boolean>;
};
const LoadMore: FC<PropsWithChildren<TLoadMoreProps>> = ({
  onLoadMore,
  children,
}) => {
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [showBackTop, setShowBackTop] = useState<boolean>(false);

  // back to page top
  const handleBackToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  // load more
  const loadMore = (): void => {
    if (window.scrollY === 0) {
      setShowBackTop(false);
    } else {
      setShowBackTop(true);
    }
    if (!hasNextPage) {
      return;
    }
    if (timer) {
      clearTimeout(timer);
    }
    // throttle
    timer = setTimeout(async () => {
      const endOfPage =
        window.innerHeight + window.pageYOffset >=
        document.body.offsetHeight - 150;

      if (endOfPage) {
        // page += 1;
        const result = await onLoadMore();
        setHasNextPage(result);
      }
    }, 150);
  };
  // load more listener
  useEffect(() => {
    window.addEventListener("scroll", loadMore);
    // component unmount clear timer
    // remove listener
    return (): void => {
      if (timer) {
        clearTimeout(timer);
      }
      window.removeEventListener("scroll", loadMore);
    };
  }, [hasNextPage]);
  return (
    <>
      {children}
      <ThemeProvider theme={loadMoreTheme}>
        {hasNextPage && (
          <Box py={2}>
            <Grid container justifyContent={"center"} alignItems={"center"}>
              <CircularProgress size={24} />
            </Grid>
          </Box>
        )}
        {showBackTop && (
          <Fab onClick={handleBackToTop}>
            <ArrowUpward />
          </Fab>
        )}
      </ThemeProvider>
    </>
  );
};

export default LoadMore;
