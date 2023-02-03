import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import React, { useContext, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NewsContext from "../../store/news-context";

const NewsItem = (props) => {
  const [onHoverCard, setOnHoverCard] = useState(false);
  const newsCtx = useContext(NewsContext);

  const { addFavoriteNews, removeFavoriteNews, newsIsFavorite } = newsCtx;

  const {
    title,
    description,
    source_id: source,
    link: url,
    image_url: image,
    pubDate: publishedDate,
  } = props.item;

  let formattedDate = new Date(publishedDate).toISOString().split("T");

  let onHoverClass = onHoverCard
    ? { border: "3px solid orange", height: "450px" }
    : {};

  let iconClass = newsIsFavorite(title) ? "warning" : "";

  const toggleFavoritesHandler = () => {
    if (newsIsFavorite(title)) {
      removeFavoriteNews(title);
    } else {
      addFavoriteNews(props.item);
    }
  };

  return (
    <Card
      sx={onHoverClass}
      onMouseEnter={() => setOnHoverCard(true)}
      onMouseLeave={() => setOnHoverCard(false)}
      className="flex flex-col"
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            {source.split("")[0]}
          </Avatar>
        }
        title={source}
        subheader={formattedDate[0]}
      />
      {!onHoverCard && (
        <div>
          <CardMedia
            component="img"
            sx={{ height: 200 }}
            image={image || `/img/placeholder.jpg`}
            alt="News Image"
          />
        </div>
      )}
      <CardContent>
        <Typography
          variant="body2"
          fontSize="large"
          color="text.primary"
          className="line-clamp-3"
        >
          {description}
        </Typography>
      </CardContent>

      {onHoverCard && (
        <a
          href={url}
          target="_blank"
          className=" flex justify-center"
          rel="noreferrer"
        >
          <Button variant="contained" className="w-[80%]">
            Read Article
          </Button>
        </a>
      )}

      <CardActions className="mt-auto">
        <IconButton
          aria-label="add to favorites"
          onClick={toggleFavoritesHandler}
        >
          <FavoriteIcon color={iconClass} />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default NewsItem;
