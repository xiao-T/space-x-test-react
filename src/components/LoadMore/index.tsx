// load more wrapper

import React, { FC, PropsWithChildren, useState, useEffect } from "react";
import { Box, Grid, Fab, CircularProgress } from "@mui/material";
import { ArrowUpward } from "@mui/icons-material";
import { ThemeProvider } from "@emotion/react";
import loadMoreTheme from "./theme";

let timer: any;

// detect scroll direction
let lastScrollTop = 0;
type TScrollDirection = "up" | "down";
const calcDirection = (): TScrollDirection => {
  const scrollTop = window.pageYOffset;
  let result: TScrollDirection = "down";
  if (scrollTop > lastScrollTop) {
    result = "down";
  } else if (scrollTop < lastScrollTop) {
    result = "up";
  }
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  return result;
};
// load more props
type TLoadMoreProps = {
  onLoadMore: () => Promise<boolean>;
  isLoading?: boolean;
};
const LoadMore: FC<PropsWithChildren<TLoadMoreProps>> = ({
  onLoadMore,
  isLoading = false,
  children,
}) => {
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
    const scrollDirection: TScrollDirection = calcDirection();
    if (scrollDirection === "up") {
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
        await onLoadMore();
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
  }, [onLoadMore]);
  return (
    <>
      {children}
      <ThemeProvider theme={loadMoreTheme}>
        {isLoading && (
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
