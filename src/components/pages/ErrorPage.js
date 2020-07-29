import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";

export class ErrorPage extends Component {
  render() {
    return (
      <Box textAlign="center">
        <SentimentDissatisfiedIcon
          color="secondary"
          style={{ fontSize: 120 }}
        />
        <Typography variant="h1">404</Typography>
        <Typography variant="subtitle1">Page not found</Typography>
      </Box>
    );
  }
}

export default ErrorPage;
