import React, { Component } from "react";
import PropTypes from "prop-types";
//Material UI
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";

import withStyles from "@material-ui/core/styles/withStyles";

const styles = (theme) => ({
  cardContainer: {
    marginBottom: 20,
    borderTop: "2px solid",
    borderColor: theme.palette.primary.light,
  },
  authorQuest: {
    // backgroundColor: theme.palette.secondary.light,
    padding: 10,
  },
  flexWrapper: {
    display: "flex",
    padding: 10,
  },
  avatarContainer: {
    width: "30%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  bigAvatar: {
    width: 80,
    height: 80,
  },
  button: {
    padding: 0,
    marginTop: 10,
  },
});

export class Question extends Component {
  render() {
    const { classes, avatarURL, author, question } = this.props;

    return (
      <Card className={classes.cardContainer}>
        <Box className={classes.authorQuest}>
          <Typography color="primary" p={15}>
            {author} asks:
          </Typography>
        </Box>
        <div className={classes.flexWrapper}>
          <div className={classes.avatarContainer}>
            <Avatar
              alt={author}
              src={avatarURL}
              className={classes.bigAvatar}
            />
          </div>
          <Divider orientation="vertical" flexItem />
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Would you rather
            </Typography>
            <Typography variant="h5" component="h2">
              {question}
            </Typography>
            <CardActions className={classes.button}>
              <Button size="small" variant="contained" color="secondary">
                View Poll
              </Button>
            </CardActions>
          </CardContent>
        </div>
      </Card>
    );
  }
}

Question.propTypes = {
  id: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  avatarURL: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
};
export default withStyles(styles)(Question);
