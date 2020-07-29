import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//Material UI

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";

export class Leaderboard extends Component {
  render() {
    const { tableScore } = this.props;
    // pt fiecare user afisez un ScoreCard cu numele, poza, Object.keys(answers).length si answers.legth si astea insumate = totalScore
    // le filtrez dupa user2.totalScore > user1.totalScore
    return (
      <div>
        <Box textAlign="center" mb={2}>
          <EmojiEventsIcon color="secondary" style={{ fontSize: 40 }} />

          <Typography variant="h5" component="h1" color="primary">
            Leaderboard
          </Typography>
        </Box>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Box fontWeight="bold" fontSize={18} color="primary.main">
                    User
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Box fontWeight="bold" fontSize={18} color="primary.main">
                    Answers
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Box fontWeight="bold" fontSize={18} color="primary.main">
                    Questions
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Box fontWeight="bold" fontSize={18} color="primary.main">
                    Score
                  </Box>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableScore.map((user) => (
                <TableRow key={user.id}>
                  <TableCell component="th" scope="row">
                    <Box display="flex" mr={2}>
                      <Avatar
                        src={user.avatar}
                        alt={user.name}
                        style={{ width: 24, height: 24, marginRight: 10 }}
                      ></Avatar>
                      <Box>{user.name}</Box>
                    </Box>
                  </TableCell>
                  <TableCell align="right">{user.answers}</TableCell>
                  <TableCell align="right">{user.questions}</TableCell>
                  <TableCell align="right">
                    <Box fontWeight="bold" fontSize={18} color="primary.dark">
                      {user.score}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}
Leaderboard.propTypes = {
  tableScore: PropTypes.array.isRequired,
};

function mapStateToProps({ users }) {
  const tableScore = Object.values(users)
    .map((user) => ({
      id: user.id,
      name: user.name,
      avatar: user.avatarURL,
      answers: Object.keys(user.answers).length,
      questions: user.questions.length,
      score: Object.keys(user.answers).length + user.questions.length,
    }))
    .sort((a, b) => b.score - a.score);
  return {
    tableScore,
  };
}

export default connect(mapStateToProps)(Leaderboard);

//nu tre sa fac dispatch pt ca e o componenta care doar primeste informatii si le afiseaza

// Each entry on the leaderboard contains the following:
//     the user’s name;
//     the user’s picture;
//     the number of questions the user asked; and
//     the number of questions the user answered.

// Users are ordered in descending order based on
// the sum of the number of questions they’ve answered and
//  the number of questions they’ve asked.

//Requirments
// * The Leaderboard is available at/leaderboard.
// * Each entry on the leaderboard contains the following:

//     the user’s name;
//     the user’s picture;
//     the number of questions the user asked; and
//     the number of questions the user answered.

// * Users are ordered in descending order based on the sum of the number of questions they’ve answered and the number of questions they’ve asked
