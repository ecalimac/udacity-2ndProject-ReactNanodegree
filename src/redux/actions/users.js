import {
  RECEIVE_USERS,
  ADD_VOTE_TO_USER,
  ADD_QUESTION_TO_USER,
} from "../types";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

// in users[authedUser].answers we want to add [qid]:answer
export function addVoteToUser(authedUser, qid, answer) {
  return {
    type: ADD_VOTE_TO_USER,
    authedUser,
    qid,
    answer,
  };
}

//in users[authedUser].questions we want to add [id]
export function addQuestionToUser({ id, author }) {
  return {
    type: ADD_QUESTION_TO_USER,
    id,
    author,
  };
}
