// record list card item
import React, { FC } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";

import defaultImage from "./assets/default.png";
import { Link } from "react-router-dom";
// card item type
type TListCardType = {
  id: string;
  image: string;
  name: string;
  time: string;
};
const ListCard: FC<TListCardType> = ({
  id,
  image,
  name,
  time,
}): JSX.Element => {
  return (
    <Card>
      <CardMedia
        component={"img"}
        sx={{ aspectRatio: 16 / 9 }}
        data-lazy={image}
        image={defaultImage}
        alt={name}
      />
      <CardContent>
        <Typography variant="body2">{time}</Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`${id}`}>
          <Button size="small" variant="outlined">
            Learn More{" "}
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default ListCard;
