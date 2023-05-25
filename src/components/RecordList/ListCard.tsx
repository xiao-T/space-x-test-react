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

// card item type
type TListCardType = {
  id: string;
  image: string;
  name: string;
  time: string;
};
const ListCard: FC<TListCardType> = ({ image, name, time }) => {
  return (
    <Card>
      <CardMedia sx={{ aspectRatio: 16 / 9 }} image={image} title={name} />
      <CardContent>
        <Typography variant="body2">{time}</Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="outlined">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default ListCard;
