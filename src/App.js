import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
//Custom Mui Theme
import { ThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeObject from "./utils/theme";
import Grid from "@material-ui/core/Grid";
//Components
import Navbar from "./components/Navbar";
//Views or Pages
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import UserCard from "./components/UserCard";
import NewPoll from "./components/pages/NewPoll";
import Leaderboard from "./components/pages/Leaderboard";
import ErrorPage from "./components/pages/ErrorPage";
//Used to get state from the store
import { connect } from "react-redux";
import { handleInitialData } from "./redux/actions/shared";
//App styles
import "./App.css";

const theme = createMuiTheme(themeObject);

class App extends Component {
  static propTypes = {
    authedUser: PropTypes.string,
  };
  //1. When the component mounts we want to send users and questions to the store
  //      * in order to do this we dispatch 2 action creatos: receiveUsers and receiveQuestions
  //      * because this operation is async, we use a thunk action creator: handleInitialData()
  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    // 2. We get the authenticated user from the store (at first it is null)
    const { authedUser } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Router>
          {authedUser === null ? (
            <Route render={() => <Login />} />
          ) : (
            <Fragment>
              <Navbar />
              <Grid container>
                <Grid item xs={12} sm={2} md={3}></Grid>
                <Grid item xs={12} sm={8} md={6}>
                  {/* Switch Renders the first child Route or Redirect that matches the location. */}
                  <Switch>
                    <Route exact path="/" component={Home} />
                    {/* For the next two routes the order is important */}
                    <Route
                      path="/questions/wrong_question_id"
                      component={ErrorPage}
                    />
                    <Route path="/questions/:questionID" component={UserCard} />
                    <Route path="/newPoll" component={NewPoll} />
                    <Route path="/leaderboard" component={Leaderboard} />
                    <Route component={ErrorPage} />
                  </Switch>
                </Grid>
                <Grid item xs={12} sm={2} md={3}></Grid>
              </Grid>
            </Fragment>
          )}
        </Router>
      </ThemeProvider>
    );
  }
}

//With mapStateToProps we get what we need from the store: authenticated user (at first it is null)
// If mapStateToProps argument is specified, the new component will subscribe to Redux store updates.
// This means that any time the store is updated, mapStateToProps will be called.
function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

//The second argument of the connect function is mapDispatchToProps function allows us to bind dispatch
// to action creators before they ever hit the component.
export default connect(mapStateToProps, { handleInitialData })(App);
