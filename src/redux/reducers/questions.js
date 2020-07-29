import {
  RECEIVE_QUESTIONS,
  ADD_VOTE_TO_QUESTIONS,
  ADD_QUESTION_TO_QUESTIONS,
} from "../types";

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case ADD_VOTE_TO_QUESTIONS:
      //in questions[qid][vote].votes we want to add authedUser
      const { authedUser, qid, vote } = action;
      return {
        ...state,
        [qid]: {
          ...state[qid],
          [vote]: {
            ...state[qid][vote],
            votes: state[qid][vote].votes.concat(authedUser),
          },
        },
      };
    case ADD_QUESTION_TO_QUESTIONS:
      const { question } = action;
      return {
        ...state,
        [question.id]: question,
      };
    default:
      return state;
  }
}
