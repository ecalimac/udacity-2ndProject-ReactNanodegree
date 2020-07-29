import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthedUser } from "../redux/actions/authedUser";
//Material UI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MeetingRoomRoundedIcon from "@material-ui/icons/MeetingRoomRounded";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";

export class Navbar extends Component {
  handleLogout = (event) => {
    event.preventDefault();
    this.props.setAuthedUser(null);
  };
  render() {
    const { authedUser, users } = this.props;
    return (
      <AppBar position="relative" style={{ marginBottom: 32 }}>
        <Toolbar>
          <Grid
            container
            direction={
              isWidthDown("sm", this.props.width) ? "column-reverse" : "row"
            }
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/newPoll">
                NewPoll
              </Button>
              <Button color="inherit" component={Link} to="/leaderboard">
                Leaderboard
              </Button>
            </Grid>
            <Grid item>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box display="flex" mr={2}>
                  <Avatar
                    src={users[authedUser].avatarURL}
                    alt={users[authedUser].name}
                    style={{ width: 24, height: 24, marginRight: 10 }}
                  ></Avatar>
                  <Typography variant="body1">
                    {users[authedUser].name}
                  </Typography>
                </Box>
                <IconButton
                  color="secondary"
                  aria-label="logout"
                  size="medium"
                  edge="end"
                  onClick={this.handleLogout}
                >
                  <MeetingRoomRoundedIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}
function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users,
  };
}
export default connect(mapStateToProps, { setAuthedUser })(withWidth()(Navbar));
