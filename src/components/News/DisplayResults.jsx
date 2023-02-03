import NewsItem from "./NewsItem";
import "./DisplayResults.css";
import { Fragment, useContext } from "react";
import NewsContext from "../../store/news-context";
import { Button, CircularProgress, LinearProgress } from "@mui/material";

const DisplayResults = () => {
  const newsCtx = useContext(NewsContext);

  const { newsList, isLoading, error, moreNewsLoading } = newsCtx;

  let newsContent;

  if (newsList.length !== 0) {
    newsContent = (
      <Fragment>
        <div className="grid-group auto-rows grid  gap-4  p-10">
          {newsList.map((news) => (
            <NewsItem key={news.link} item={news} />
          ))}
        </div>{" "}
        <div className="flex items-center justify-center pb-10">
          {moreNewsLoading && <CircularProgress />}
          {!moreNewsLoading && (
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                newsCtx.retrieveMoreNews();
              }}
            >
              LOAD MORE
            </Button>
          )}
        </div>
      </Fragment>
    );
  } else {
    newsContent = (
      <div className="flex h-full  items-center justify-center">
        <h1 className="w-3/4 text-center text-5xl text-white">
          <span className="font-bold uppercase text-red-600">{error}</span>
          <br />
          Please search for your favorite topic to get started :)
        </h1>
      </div>
    );
  }

  return (
    <div
      className="h-full overflow-auto bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(/img/home-bg.jpg)` }}
    >
      {isLoading && <LinearProgress />}
      {!isLoading && newsContent}
    </div>
  );
};

export default DisplayResults;
