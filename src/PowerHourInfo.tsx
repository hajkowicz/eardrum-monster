import React from "react";
import "./PowerHourInfo.css";

export default function PowerHourInfo({
  count,
  isEnabled,
}: {
  count: number;
  isEnabled: boolean;
}) {
  if (isEnabled) {
    return (
      <div className="PowerHourInfo">
        Current Song Number: <h1>{count}</h1>
      </div>
    );
  } else {
    return null;
  }
}
