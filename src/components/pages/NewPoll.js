import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { handleAddQuestion } from "../../redux/actions/shared";
import { Redirect } from "react-router-dom";
//Material UI
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

export class NewPoll extends Component {
  state = {
    valueForOption1: "",
    valueForOption2: "",
    submitted: false,
  };
  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { valueForOption1, valueForOption2 } = this.state;
    const { authedUser, handleAddQuestion } = this.props;

    //From ./utils/api.js we know that:
    // in order to to save a question in DB we have to call saveQuestion(question)
    // question parameter is an object resulted from formatQuestion function
    // formatQuestion({ optionOneText, optionTwoText, author })
    // handleAddQuestion(valueForOption1, valueForOption2, authedUser);

    handleAddQuestion(valueForOption1, valueForOption2, authedUser);
    this.setState({
      valueForOption1: "",
      valueForOption2: "",
    });
    this.setState({ submitted: true });
  };
  render() {
    if (this.state.submitted === true) {
      return <Redirect to="/" />;
    }

    const disabled =
      this.state.valueForOption1 !== "" && this.state.valueForOption2 !== ""
        ? false
        : true;

    return (
      <Card>
        <CardContent>
          <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Typography
                variant="h5"
                component="h1"
                color="primary"
                style={{ marginBottom: 32 }}
              >
                Create a new Poll
              </Typography>
              <TextField
                id="valueForOption1"
                label="Enter option one"
                value={this.state.valueForOption1}
                onChange={this.handleChange}
                variant="outlined"
                fullWidth={true}
                style={{ marginBottom: 16 }}
              />

              <TextField
                id="valueForOption2"
                label="Enter option two"
                value={this.state.valueForOption2}
                onChange={this.handleChange}
                variant="outlined"
                fullWidth={true}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: 16 }}
                disabled={disabled}
              >
                Submit
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    );
  }
}

NewPoll.propTypes = {
  authedUser: PropTypes.string.isRequired,
  handleAddQuestion: PropTypes.func.isRequired,
};

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}
export default connect(mapStateToProps, { handleAddQuestion })(NewPoll);
