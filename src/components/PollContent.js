import React from "react";
import PropTypes from "prop-types";

import PollPreview from "./PollPreview";
import PollQuestion from "./PollQuestion";
import PollResults from "./PollResults";

const PollContent = (props) => {
  const { pollType, question, answered } = props;
  switch (pollType) {
    case "POLL_PREVIEW":
      return <PollPreview question={question} answered={answered} />;
    case "POLL_QUESTION":
      return <PollQuestion question={question} />;
    case "POLL_RESULTS":
      return <PollResults question={question} />;
    default:
      return;
  }
};

PollContent.propTypes = {
  question: PropTypes.object.isRequired,
  answered: PropTypes.bool,
  pollType: PropTypes.string.isRequired,
};

export default PollContent;
