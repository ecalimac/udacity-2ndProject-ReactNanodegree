import { getInitialData } from "../../utils/api";
import { receiveUsers } from "../actions/users";
import { receiveQuestions } from "../actions/questions";
import { saveQuestionAnswer } from "../../utils/api";
import { addVoteToUser } from "../actions/users";
import { addVoteToQuestions } from "../actions/questions";
import { addQuestionToUser } from "../actions/users";
import { addQuestionToQuestions } from "../actions/questions";
import { saveQuestion } from "../../utils/api";

export function handleInitialData() {
  return (dispatch) => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveQuestions(questions));
      dispatch(receiveUsers(users));
    });
  };
}

export function handleSaveUserVote(authedUser, qid, answer) {
  return (dispatch) => {
    dispatch(addVoteToUser(authedUser, qid, answer));
    dispatch(addVoteToQuestions(authedUser, qid, answer));
    return saveQuestionAnswer(authedUser, qid, answer).catch((e) => {
      console.warn(
        "To difficult to catch this error. It is in saveUserVote action thunk creator",
        e
      );
    });
  };
}

export function handleAddQuestion(optionOneText, optionTwoText, author) {
  return (dispatch) => {
    // first we have to save the datas in DB (because we need an unique id and timestamp for our new question)

    //From ./utils/api.js we know that:
    // in order to to save a question in DB we have to call saveQuestion(question)
    // question parameter is an object resulted from formatQuestion function
    // formatQuestion({ optionOneText, optionTwoText, author })
    return saveQuestion({ optionOneText, optionTwoText, author }).then(
      (question) => {
        dispatch(addQuestionToQuestions(question));
        dispatch(addQuestionToUser(question));
      }
    );
  };
}
