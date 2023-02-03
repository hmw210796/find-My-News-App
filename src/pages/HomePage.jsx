import React from "react";
import Header from "../components/UI/Header";
import { Grid } from "@mui/material";
import MyFavouritesPanel from "../components/News/MyFavouritesPanel";
import DisplayResults from "../components/News/DisplayResults";

const HomePage = () => {
  return (
    <div className="main-container flex h-screen flex-col overflow-hidden ">
      <div className="header-container h-[10vh] w-full">
        <Header />
      </div>
      <div className="content-container h-[90vh] ">
        <div className="flex h-full flex-col xl:flex-row">
          <Grid
            className="left-panel-container h-[25%] xl:h-full xl:w-[25%]  "
            item
            xs={12}
            lg={2.5}
          >
            <MyFavouritesPanel />
          </Grid>
          <Grid
            className="result-container h-[75%]  xl:h-full xl:w-[75%]"
            item
            lg={9.5}
          >
            <DisplayResults />
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
