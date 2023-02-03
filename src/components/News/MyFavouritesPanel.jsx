import { Button, Grid } from "@mui/material";
import React, { useContext } from "react";
import NewsContext from "../../store/news-context";
import FavoriteItem from "./FavoriteItem";

const MyFavouritesPanel = () => {
  const newsCtx = useContext(NewsContext);

  return (
    <div
      className=" flex h-full flex-col bg-cover bg-no-repeat py-4 text-white"
      style={{ backgroundImage: `url(/img/home-bg.jpg)` }}
    >
      <Grid item className="flex w-full items-center justify-between py-4 px-4">
        <h2 className="text-xl">My Favorites: {newsCtx.favoriteNews.length}</h2>
        <Button
          variant="contained"
          onClick={() => newsCtx.clearFavoriteNewsList()}
        >
          Clear
        </Button>
      </Grid>
      <Grid item className="h-full overflow-y-scroll">
        <ul className="h-full divide-y-2">
          {newsCtx.favoriteNews.map((newsItem) => (
            <FavoriteItem key={newsItem.link} item={newsItem} />
          ))}
        </ul>
      </Grid>
    </div>
  );
};

export default MyFavouritesPanel;
