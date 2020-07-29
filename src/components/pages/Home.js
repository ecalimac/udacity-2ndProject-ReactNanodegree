import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
//Material UI
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
//Connection to the store
import { connect } from "react-redux";
// import TestQuestion from "../components/TestQuestion";
import UserCard from "../UserCard";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export class Home extends Component {
  // The unanswered questions are shown by default.
  state = {
    selectedTab: 0,
  };

  handleChangeTab = (event, value) => {
    this.setState({ selectedTab: value });
  };

  render() {
    const { filteredQuestions } = this.props;
    return (
      <Fragment>
        <AppBar position="relative" color="transparent">
          <Tabs
            value={this.state.selectedTab}
            onChange={this.handleChangeTab}
            aria-label="Answered vs. Unanswered Questions"
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Unanswered" {...a11yProps(0)} />
            <Tab label="Answered" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <Box pt={2}>
          <TabPanel value={this.state.selectedTab} index={0}>
            {filteredQuestions.unanswered.map((question) => (
              // <TestQuestion key={question.id} {...question} />
              <UserCard
                key={question.id}
                question_id={question.id}
                answered={false}
              />
            ))}
          </TabPanel>
          <TabPanel value={this.state.selectedTab} index={1}>
            {filteredQuestions.answered.map((question) => (
              // <TestQuestion key={question.id} {...question} />
              <UserCard
                key={question.id}
                question_id={question.id}
                answered={true}
              />
            ))}
          </TabPanel>
        </Box>
      </Fragment>
    );
  }
}
Home.propTypes = {
  filteredQuestions: PropTypes.object.isRequired,
};

function mapStateToProps({ authedUser, users, questions }) {
  const answeredIds = Object.keys(users[authedUser].answers);
  // const unansweredIds = Object.keys(questions).filter(
  //   (q) => !answeredIds.includes(q)
  // );
  //unansweredIds and even answeredIds are not enough because we need more datas: author, optionOne for teaser and the timestamp for ordering the questions

  //The polls in both categories are arranged from the most recently created (top) to the least recently created (bottom)
  const answered = Object.values(questions)
    .filter((question) => answeredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);
  const unanswered = Object.values(questions)
    .filter((question) => !answeredIds.includes(question.id))
    .sort((a, b) => b.timestamp - a.timestamp);

  return {
    filteredQuestions: {
      answered,
      unanswered,
    },
  };
}
export default connect(mapStateToProps)(Home);
