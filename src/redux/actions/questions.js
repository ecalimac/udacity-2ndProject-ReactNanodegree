import {
  RECEIVE_QUESTIONS,
  ADD_VOTE_TO_QUESTIONS,
  ADD_QUESTION_TO_QUESTIONS,
} from "../types";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

//in questions[qid][vote].votes we want to add  authedUser
export function addVoteToQuestions(authedUser, qid, vote) {
  return {
    type: ADD_VOTE_TO_QUESTIONS,
    authedUser,
    qid,
    vote,
  };
}

//in questions we want to add a new question object
export function addQuestionToQuestions(question) {
  return {
    type: ADD_QUESTION_TO_QUESTIONS,
    question,
  };
}
