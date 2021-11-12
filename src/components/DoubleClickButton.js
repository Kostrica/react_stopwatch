import React, { useEffect } from "react";

export default function DoubleClickButton({ className, title, delay = 0, onSingleClick = () => {}, onDoubleClick = () => {} }) {
  const clicks = [];
  let timeout;

  function clickHandler(event) {
      event.preventDefault();
      clicks.push(new Date().getTime());
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (clicks.length > 1 && clicks.at(-1) - clicks.at(-2) < delay) {
          onDoubleClick(event.target);
        } else {
          onSingleClick(event.target);
        }
      }, delay);
  }

  useEffect(() => {
    if (clicks.length > 10) {
      clicks = [clicks.at(-2), clicks.at(-1)];
    }
  }, [clicks]);

  return (
    <button
      className={className}
      type="button"
      onClick={clickHandler}
    >
      {title}
    </button>
  );
}
