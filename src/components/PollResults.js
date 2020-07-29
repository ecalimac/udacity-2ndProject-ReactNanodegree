import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 30,
    borderRadius: 20,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    background: "linear-gradient(to left, #F2709C, #FF9472)",
    boxShadow: "0 3px 3px -5px #F2709C, 0 2px 5px #F2709C",
    borderRadius: 20,
    transition: "1s ease 0.3s",
  },
}))(LinearProgress);

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1} my={2}>
        <BorderLinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

function YourVote() {
  return (
    <Box className="ribbon">
      <Box component="span" m={1}>
        Your Vote
      </Box>
    </Box>
  );
}

export class PollResults extends Component {
  static propTypes = {
    question: PropTypes.object.isRequired,
    authedUser: PropTypes.string,
  };
  state = {
    progressState: 0,
  };

  handleBackToHome = () => {
    this.props.history.push("/");
  };
  render() {
    const { question, authedUser } = this.props;
    let option1, option2, totalVotes, progress1, progress2;

    option1 = question.optionOne.votes.length;
    option2 = question.optionTwo.votes.length;
    totalVotes = option1 + option2;
    progress1 = (option1 / totalVotes) * 100;
    progress2 = (option2 / totalVotes) * 100;

    return (
      <CardContent>
        <Typography variant="h5" component="h1" color="primary">
          Results
        </Typography>
        <Typography color="textSecondary" style={{ marginBottom: 24 }}>
          Would you rather
        </Typography>
        <Box position="relative">
          {question.optionOne.votes.includes(authedUser) && <YourVote />}
          <Paper elevation={3} style={{ padding: 10, marginBottom: 24 }}>
            <Typography variant="h6">{question.optionOne.text}</Typography>
            <LinearProgressWithLabel value={progress1} />
            <Typography variant="body1" color="textSecondary">
              {option1} out of {totalVotes} votes
            </Typography>
          </Paper>
        </Box>
        <Box position="relative">
          {question.optionTwo.votes.includes(authedUser) && <YourVote />}
          <Paper elevation={3} style={{ padding: 10, marginBottom: 24 }}>
            <Typography variant="h6">{question.optionTwo.text}</Typography>
            <LinearProgressWithLabel value={progress2} />
            <Typography variant="body1" color="textSecondary">
              {option2} out of {totalVotes} votes
            </Typography>
          </Paper>
        </Box>
        <Box textAlign="right">
          <Box bgcolor="secondary.light" clone>
            <IconButton
              aria-label="goBack"
              onClick={this.handleBackToHome}
              size="small"
            >
              <ArrowBackIcon />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default withRouter(connect(mapStateToProps)(PollResults));
