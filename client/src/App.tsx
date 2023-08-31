import React from "react"
import { QueryClientProvider, QueryClient } from "react-query"
import { Grid } from "@mui/material"
import Question from "./components/Question"

const App = () => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Grid
        container
        className="app-container"
        justifyContent="center"
        alignItems="center"
      >
        <Question />
      </Grid>
    </QueryClientProvider>
  )
}

export default App
