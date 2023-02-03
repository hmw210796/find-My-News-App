import { TextField } from "@mui/material";
import { useContext, useState } from "react";
import { Button } from "@mui/material";
import NewsContext from "../../store/news-context";
import React from "react";

const Searchbar = (props) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const newsCtx = useContext(NewsContext);

  const searchOnChangeHandler = (event) => {
    setSearchKeyword(event.target.value);
  };

  const searchHandler = () => {
    newsCtx.retrieveNews(searchKeyword);
    props.onClose(false);
  };

  return (
    <div className="my-auto flex w-full space-x-10">
      <TextField
        type="text"
        fullWidth
        placeholder="What do you want to search? (Ex.Bitcoin)"
        sx={{
          input: {
            color: "white",
            fontSize: "1rem",
            border: "1px solid white",
          },
        }}
        size="large"
        onChange={searchOnChangeHandler}
      />
      <Button variant="contained" size="small" onClick={searchHandler}>
        Search News
      </Button>
    </div>
  );
};

export default Searchbar;
