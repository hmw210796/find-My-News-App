import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

const NewsContext = React.createContext({
  isLoading: "",
  newsList: [],
  keyword: "",
  onSearch: () => {},
  favoriteNews: [],
  retrieveNews: () => {},
  addFavoriteNews: () => {},
  removeFavoriteNews: () => {},
  newsIsFavorite: "",
  clearFavoriteNewsList: () => {},
  retrieveMoreNews: () => {},
  retrieveFavNews: () => {},
  error: "",
  userIdChange: () => {},
  moreNewsLoading: "",
});

export const NewsContextProvider = (props) => {
  // const { userId } = useContext(UserContext);

  const [userId, setUserId] = useState(localStorage.getItem("userId") ?? "");

  const [isLoading, setIsLoading] = useState(false);
  const [moreNewsLoading, setMoreNewsLoading] = useState(false);

  const [newsList, setNewsList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [pageNo, setPageNo] = useState("");
  const [favoriteNews, setFavoriteNews] = useState([]);
  const [error, setError] = useState(null);

  // let pageNo = 0;

  const retrieveNews = useCallback(async (keyword) => {
    setIsLoading(true);
    const searchKeyword = keyword || "everything";
    setSearchKeyword(searchKeyword);

    try {
      const response = await axios.get(
        `https://newsdata.io/api/1/news?apikey=${process.env.REACT_APP_NEWS_API}&language=en&qInTitle=${searchKeyword}`
      );

      if (!response.data) {
        throw new Error("Something went wrong!");
      }

      if (response.data.totalResults === 0) {
        throw new Error(`No articles for ${keyword}`);
      }

      console.log(response.data);
      setPageNo(response.data.nextPage);

      setNewsList(response.data.results);
    } catch (err) {
      setError(err.message || "Something went wrong!");
      setNewsList([]);
    }
    setIsLoading(false);
  }, []);

  const retrieveMoreNews = useCallback(async () => {
    setMoreNewsLoading(true);

    const response = await axios.get(
      `https://newsdata.io/api/1/news?apikey=${process.env.REACT_APP_NEWS_API}&language=en&qInTitle=${searchKeyword}&page=${pageNo}  `
    );

    if (!response.data) {
      throw new Error("Something went wrong!");
    }

    setNewsList((prevNews) => [...prevNews, ...response.data.results]);
    setPageNo(response.data.nextPage);
    setMoreNewsLoading(false);
  }, [pageNo, searchKeyword]);

  const addFavoriteNews = useCallback(
    (news) => {
      setFavoriteNews((prevNews) => prevNews.concat(news));
      localStorage.setItem(
        "favoriteNews",
        JSON.stringify(favoriteNews.concat(news))
      );

      fetch(
        `https://mynewspoject-default-rtdb.asia-southeast1.firebasedatabase.app/${userId}.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(news),
        }
      );
    },
    [favoriteNews, userId]
  );

  const userIdChange = (id) => {
    setUserId(id);
    setFavoriteNews([]);
    setNewsList([]);
  };

  const removeFavoriteNews = useCallback(
    (newsTitle) => {
      console.log(userId);
      setFavoriteNews((prevNews) =>
        prevNews.filter((news) => news.title !== newsTitle)
      );
      const updatedFavNews = JSON.parse(localStorage.getItem("favoriteNews"));

      localStorage.setItem(
        "favoriteNews",
        JSON.stringify(
          updatedFavNews.filter((news) => news.title !== newsTitle)
        )
      );

      const latestFavNews = JSON.parse(localStorage.getItem("favoriteNews"));

      fetch(
        `https://mynewspoject-default-rtdb.asia-southeast1.firebasedatabase.app/${userId}.json`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(latestFavNews),
        }
      );
    },
    [userId]
  );

  const newsIsFavorite = (newsTitle) => {
    return favoriteNews.some((news) => news.title === newsTitle);
  };

  const clearFavoriteNewsList = () => {
    localStorage.removeItem("favoriteNews");
    fetch(
      `https://mynewspoject-default-rtdb.asia-southeast1.firebasedatabase.app/${userId}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setFavoriteNews([]);
  };

  const retrieveFavNews = async (userId) => {
    let loadedData = [];
    const response = await fetch(
      `https://mynewspoject-default-rtdb.asia-southeast1.firebasedatabase.app/${userId}.json`
    );
    const data = await response.json();

    if (!data) {
      return;
    }
    for (let key in data) {
      loadedData.push(data[key]);
    }
    localStorage.setItem("favoriteNews", JSON.stringify(loadedData));
    setFavoriteNews(loadedData);
  };

  useEffect(() => {
    retrieveFavNews(userId);
    console.log("retrieve news");
  }, [userId]);

  return (
    <NewsContext.Provider
      value={{
        isLoading,
        newsList,
        favoriteNews,
        retrieveNews,
        addFavoriteNews,
        removeFavoriteNews,
        newsIsFavorite,
        clearFavoriteNewsList,
        retrieveMoreNews,
        error,
        retrieveFavNews,
        userIdChange,
        moreNewsLoading,
      }}
    >
      {props.children}
    </NewsContext.Provider>
  );
};

export default NewsContext;
