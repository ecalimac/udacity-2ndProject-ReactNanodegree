import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
//Connection to the store
import { connect } from "react-redux";
//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
//subcomponents
import PollContent from "./PollContent";

// Requirements
// * A polling question links to details of that poll.
// The details of the poll are available at questions/:question_id.
// When a poll is clicked on the home page, the following is shown:

//     the text “Would You Rather”;
//     the picture of the user who posted the polling question; and
//     the two options.

// For answered polls, each of the two options contains the following:

//     the text of the option;
//     the number of people who voted for that option;
//     the percentage of people who voted for that option.

const styles = (theme) => ({
  cardContainer: {
    marginBottom: 20,
    borderTop: "2px solid",
    borderColor: theme.palette.primary.light,
  },
  bigAvatar: {
    width: 80,
    height: 80,
    margin: "auto",
  },
});
export class UserCard extends Component {
  render() {
    const {
      classes,
      author,
      question,
      answered,
      wrong_question_id,
      pollType,
    } = this.props;

    if (wrong_question_id) {
      return <Redirect to="/questions/wrong_question_id" />;
    }

    return (
      <Card className={classes.cardContainer}>
        <Grid container style={{ padding: 16 }}>
          <Grid
            item
            xs={3}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              alignContent="center"
            >
              <Avatar
                alt={author.name}
                src={author.avatarURL}
                className={classes.bigAvatar}
              />
              <Box textAlign="center" mt={1}>
                <Typography color="primary">{author.name} asks:</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={1}>
            <Divider orientation="vertical" style={{ margin: "auto" }} />
          </Grid>
          <Grid item xs={8}>
            <PollContent
              pollType={pollType}
              question={question}
              answered={answered}
            />
          </Grid>
        </Grid>
      </Card>
    );
  }
}

function mapStateToProps(
  { authedUser, users, questions },
  { question_id, match }
) {
  // For all the cards we need to show the author's name and avatar
  // The content to the right of the avatar may differ on the userCard

  let author,
    question,
    pollType,
    wrong_question_id = false;
  //Move this comments
  // If we are on the homepage, regardless of whether the question is in the answered or unanswered category, we display the text from option one.
  // For the answered questions we display a button with the text "see the results".
  // For unanswered questions we display a button with the text "answer the question".
  // Either button leads to "questions /: question_id"

  // Variables for UserCard on Home - from which we receive question_id as a prop
  // "/" route
  if (question_id !== undefined) {
    question = questions[question_id];
    author = users[question.author];
    pollType = "POLL_PREVIEW";
  } else {
    // Variables for UserCard on question details
    // "/questions/:questionID" route
    const { questionID } = match.params;
    question = questions[questionID];
    // If question doesn't exists(in case that questionID is not a property of the questions object) we show the 404 page
    if (question === undefined) {
      wrong_question_id = true;
    } else {
      author = users[question.author];
      pollType = "POLL_QUESTION";
      if (Object.keys(users[authedUser].answers).includes(questionID)) {
        pollType = "POLL_RESULTS";
      }
    }
  }

  return {
    author,
    question,
    pollType,
    wrong_question_id,
  };
}

UserCard.propTypes = {
  //From Home
  question_id: PropTypes.string,
  answered: PropTypes.bool,
  // From mapStateToProps
  author: PropTypes.object,
  question: PropTypes.object,
  pollType: PropTypes.string,
  question_id_missing: PropTypes.bool,
};
export default connect(mapStateToProps)(withStyles(styles)(UserCard));
