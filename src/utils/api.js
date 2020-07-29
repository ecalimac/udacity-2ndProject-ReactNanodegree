import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from "./_DATA.js";

export function getInitialData() {
  return Promise.all([_getUsers(), _getQuestions()]).then(
    ([users, questions]) => ({
      users,
      questions,
    })
  );
}

export function saveQuestion(question) {
  return _saveQuestion(question);
}

export function saveQuestionAnswer(authedUser, qid, answer) {
  // return _saveQuestionAnswer( authedUser, qid, answer );
  // The comment above, represent a very expensive distraction for me, and costed me 2 hours of debugging. Simply can't remove it - have to remember it!
  return _saveQuestionAnswer({ authedUser, qid, answer });
}
