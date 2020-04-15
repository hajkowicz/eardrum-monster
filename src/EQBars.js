import React from "react";
import "./EQBars.css";

export default function EQBars({ className }) {
  return (
    <div className={className}>
      <div className="EQBars-container">
        <ol className="EQBars-column">
          <li className="colour-bar"></li>
        </ol>
        <ol className="EQBars-column">
          <li className="colour-bar"></li>
        </ol>
        <ol className="EQBars-column">
          <li className="colour-bar"></li>
        </ol>
        <ol className="EQBars-column">
          <li className="colour-bar"></li>
        </ol>
        <ol className="EQBars-column">
          <li className="colour-bar"></li>
        </ol>
      </div>
    </div>
  );
}
