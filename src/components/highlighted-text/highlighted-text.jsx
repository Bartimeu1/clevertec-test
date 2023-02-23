import React from 'react';

export function HighlightedText({ text, highlight }) {
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));

  return parts.map((part) => (
    <React.Fragment>
      {part.toLowerCase() === highlight.toLowerCase() ? <span data-test-id='highlight-matches'>{part}</span> : part}
      {/* this comment is a placeholder to use the react fragment */}
    </React.Fragment>
  ));
}
