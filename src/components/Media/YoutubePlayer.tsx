// youtube player

import React, { FC } from "react";
import { Box } from "@mui/material";
type TYoutubePlayer = {
  embedId: string;
  title?: string;
};
const YoutubePlayer: FC<TYoutubePlayer> = ({ embedId, title }) => {
  return (
    <Box sx={{ aspectRatio: 16 / 9 }}>
      <iframe
        allowFullScreen
        frameBorder="0"
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${embedId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      />
    </Box>
  );
};

export default YoutubePlayer;
