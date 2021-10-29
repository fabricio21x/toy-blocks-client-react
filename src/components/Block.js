import React from "react";
import PropTypes from "prop-types";

import { leftPadding } from "../utils/numbers";

export default function Block({ number, content }) {
  const formattedNumber = leftPadding(number, 3);
  return (
    <div className="flex-1 flex-col bg-disabled px-2 pt-2 pb-1">
      <div className="text-primary font-bold">{formattedNumber}</div>
      <div className="text-dark font-medium">{content}</div>
    </div>
  );
}

Block.propTypes = {
  number: PropTypes.number,
  content: PropTypes.string,
};
