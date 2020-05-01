import React from "react";
import useAuth from "./useAuth";
import ChangeUsername from "./ChangeUsername";
import { useHistory } from "react-router-dom";

export default function BroadcastHeading({
  hostDisplayName,
}: {
  hostDisplayName: string;
}) {
  const authInfo = useAuth();
  const history = useHistory();
  const [editing, setEditing] = React.useState(false);

  if (authInfo == null || authInfo.displayName !== hostDisplayName) {
    return `${hostDisplayName}'s Channel`;
  }

  const nameUpdated = (name: string) => {
    setEditing(false);
    history.replace(`/u/${encodeURIComponent(name)}`);
  };

  if (!editing) {
    return (
      <div className="Broadcast-heading">
        <div className="Broadcast-headingTitle">
          {hostDisplayName}'s Channel
        </div>
        <button onClick={() => setEditing(true)}>Edit</button>
      </div>
    );
  }

  return (
    <div className="Broadcast-heading">
      <ChangeUsername
        initialVal={hostDisplayName}
        onSuccess={(name) => nameUpdated(name)}
        onCancel={() => setEditing(false)}
      />
    </div>
  );
}
