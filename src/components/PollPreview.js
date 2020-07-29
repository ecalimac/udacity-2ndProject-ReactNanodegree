import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = (theme) => ({
  button: {
    padding: 0,
    marginTop: 10,
  },
});

export class PollPreview extends Component {
  state = {
    seeDetails: false,
  };
  handleClick = (event) => {
    this.setState((prevState) => ({
      seeDetails: !prevState.seeDetails,
    }));
  };
  render() {
    const { classes, question, answered } = this.props;
    if (this.state.seeDetails === true) {
      return <Redirect push to={`/questions/${question.id}`} />;
    }
    return (
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Would you rather
        </Typography>
        <Typography variant="h5" component="h2">
          {question.optionOne.text}...
        </Typography>
        <CardActions className={classes.button}>
          {answered === true && (
            <Button
              onClick={this.handleClick}
              size="small"
              variant="contained"
              color="secondary"
            >
              See results
            </Button>
          )}
          {answered === false && (
            <Button
              onClick={this.handleClick}
              size="small"
              variant="contained"
              color="secondary"
            >
              Answer
            </Button>
          )}
        </CardActions>
      </CardContent>
    );
  }
}
PollPreview.propTypes = {
  question: PropTypes.object,
  answered: PropTypes.bool,
};

export default withStyles(styles)(PollPreview);
