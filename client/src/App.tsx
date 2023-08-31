import React from "react";
import { Grid, Typography } from "@mui/material";

const App = () => {
  return (
    <Grid
      container
      className="app-container"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h1">Hello World!</Typography>
    </Grid>
  );
};

export default App;
