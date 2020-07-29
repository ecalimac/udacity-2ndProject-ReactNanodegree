import React, { Component } from "react";
import PropTypes from "prop-types";
//Connection to the store
import { connect } from "react-redux";
import { setAuthedUser } from "../../redux/actions/authedUser";
//Material UI
import WithStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Link from "@material-ui/core/Link";
//different App images
// import AppImage from "../utils/icon.png";
// import AppImage from "../utils/Questions-bro.svg";
import AppImage from "../../utils/Questions-bro1.svg";

const styles = {
  formContainer: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    alignSelf: "center",
  },
  appImage: {
    width: 100,
    height: 100,
    margin: "20px auto",
  },
  formControl: {
    margin: "10px 0",
    width: "100%",
  },
  select: {},
};

export class Login extends Component {
  state = {
    value: "",
  };
  preventDefault = (event) => event.preventDefault();
  handleSubmit = (event) => {
    event.preventDefault();
    const { setAuthedUser } = this.props;
    const authedUser = this.state.value;
    setAuthedUser(authedUser);
  };
  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { classes, users } = this.props;
    const disabled = this.state.value === "" ? true : false;
    return (
      <Grid container style={{ height: "100vh" }}>
        <Grid item xs={12} sm={3}></Grid>
        <Grid item xs={12} sm={6} className={classes.formContainer}>
          <Box m={2}>
            <Card>
              <CardContent>
                <Typography variant="h4" component="h1" color="primary">
                  Would You Rather
                </Typography>
                <Box maxWidth={250} mx={"auto"}>
                  <img src={AppImage} alt="Would you Rather" />
                </Box>
                <Box my={1}>
                  <Typography variant="h5" component="h2">
                    Login
                  </Typography>
                </Box>

                <Typography variant="body1" component="p" color="textSecondary">
                  Please sign in to continue
                </Typography>
                <form noValidate onSubmit={this.handleSubmit}>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="simple-select-outlined-label">
                      Select your Player
                    </InputLabel>
                    <Select
                      labelId="simple-select-outlined-label"
                      id="simple-select-outlined"
                      value={this.state.value}
                      onChange={this.handleChange}
                      label="Select your Player"
                      className={classes.select}
                    >
                      {users.map((user) => (
                        <MenuItem value={user.id} key={user.id}>
                          {user.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth={true}
                    size="large"
                    disabled={disabled}
                  >
                    Login
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Box>

          <Box color="primary">
            <Link
              href="https://stories.freepik.com/people"
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
              variant="body2"
            >
              Illustration by Stories by Freepik
            </Link>
            <br />
            <Link
              href="https://www.freepik.com/free-photos-vectors/people"
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
              variant="body2"
            >
              People vector created by freepik - www.freepik.com
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} sm={3}></Grid>
      </Grid>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
};

function mapStateToProps({ users }) {
  return {
    users: Object.values(users),
  };
}

export default connect(mapStateToProps, { setAuthedUser })(
  WithStyles(styles)(Login)
);
