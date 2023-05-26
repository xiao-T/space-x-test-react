// media component

import React, { FC } from "react";
import { CardMedia } from "@mui/material";
// local components
import YoutubePlayer from "./YoutubePlayer";

type TMedia = {
  type: "image" | "mp4";
  url?: string;
  title?: string;
  embedId?: string;
};

const Media: FC<TMedia> = ({ type, url, title, embedId }): JSX.Element => {
  let element = <></>;
  if (type === "image") {
    element = (
      <CardMedia
        component={"img"}
        sx={{ aspectRatio: 16 / 9 }}
        image={url}
        alt={title}
      />
    );
  }
  if (type === "mp4") {
    element = <YoutubePlayer embedId={embedId!} title={title} />;
  }
  return element;
};

export default Media;
