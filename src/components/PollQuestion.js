import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { handleSaveUserVote } from "../redux/actions/shared";
//Material UI
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";

export class PollQuestion extends Component {
  static propTypes = {
    //from the parent component
    question: PropTypes.object.isRequired,
    //from the store
    authedUser: PropTypes.string.isRequired,
    //from the action import
    handleSaveUserVote: PropTypes.func.isRequired,
  };
  state = {
    vote: "",
  };

  handleRadioChange = (event, value) => this.setState({ vote: value });

  handleSubmit = (event) => {
    event.preventDefault();
    //     //if radio button is selected we can dispatch the action
    if (this.state.vote !== "") {
      const { authedUser, question, handleSaveUserVote } = this.props;
      //   console.log(question.id, authedUser, this.state.vote);
      handleSaveUserVote(authedUser, question.id, this.state.vote);
    }
  };

  handleBackToHome = () => {
    this.props.history.push("/");
  };

  render() {
    const { question } = this.props;
    const disableSubmit = this.state.vote === "" ? true : false;
    return (
      <CardContent>
        <form onSubmit={this.handleSubmit}>
          <FormControl component="fieldset">
            <FormLabel component="legend" style={{ marginBottom: 16 }}>
              Would you rather
            </FormLabel>
            <RadioGroup
              aria-label="quiz"
              name="quiz"
              value={this.state.vote}
              onChange={this.handleRadioChange}
            >
              <FormControlLabel
                value="optionOne"
                control={<Radio />}
                label={question.optionOne.text}
              />
              <FormControlLabel
                value="optionTwo"
                control={<Radio />}
                label={question.optionTwo.text}
              />
            </RadioGroup>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: 16 }}
              disabled={disableSubmit}
            >
              Submit
            </Button>
          </FormControl>
        </form>
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
//ce tre sa fac aici
// in momentul cand dau submit la formular tre sa modific store-ul
//DONE hai cu dispatchu

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}
export default withRouter(
  connect(mapStateToProps, { handleSaveUserVote })(PollQuestion)
);
