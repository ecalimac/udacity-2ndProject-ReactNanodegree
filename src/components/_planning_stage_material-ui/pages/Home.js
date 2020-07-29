import React, { Component } from "react";
import PropTypes from "prop-types";
//Mui Styles
import withStyles from "@material-ui/core/styles/withStyles";
//Mui
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";

//questions
import questionsByAnsweredOrUnanswered from "../utils/_data";
import Question from "../components/Question";

const styles = {
  tablist: {
    padding: "16px",
  },
};

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
  state = {
    selectedTab: 0,
  };

  handleChangeTab = (event, value) => {
    this.setState({ selectedTab: value });
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid container>
        <Grid item xs={12} sm={2}></Grid>
        <Grid item xs={12} sm={8}>
          <AppBar position="static">
            <Tabs
              value={this.state.selectedTab}
              onChange={this.handleChangeTab}
              aria-label="Answered vs. Unanswered Questions"
            >
              <Tab label="Answered" {...a11yProps(0)} />
              <Tab label="Unanswered" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <Paper variant="outlined" square className={classes.tablist}>
            <TabPanel value={this.state.selectedTab} index={0}>
              {questionsByAnsweredOrUnanswered.answered.map((question) => (
                <Question key={question.qid} {...question} />
              ))}
            </TabPanel>
            <TabPanel value={this.state.selectedTab} index={1}>
              {questionsByAnsweredOrUnanswered.unanswered.map((question) => (
                <Question key={question.qid} {...question} />
              ))}
            </TabPanel>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={2}></Grid>
      </Grid>
    );
  }
}
Home.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Home);
