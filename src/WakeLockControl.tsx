import React from "react";
import Switch from "react-switch";
import { hasTouchScreen } from "./Utils";

export default function WakeLockControl() {
  const [wlEnabled, setwlEnabled] = React.useState(false);
  const NoSleep = (window as Window & typeof globalThis & { NoSleep: any })
    .NoSleep;
  const noSleepRef = React.useRef<any>(null);

  React.useEffect(() => {
    return () => {
      if (noSleepRef.current != null) {
        noSleepRef.current.disable();
      }
    };
  }, []);

  const handleChange = React.useCallback(
    (enabled) => {
      setwlEnabled(enabled);
      if (enabled && NoSleep != null) {
        noSleepRef.current = new NoSleep();
        noSleepRef.current.enable();
      } else {
        noSleepRef.current.disable();
      }
    },
    [setwlEnabled, NoSleep]
  );

  if (NoSleep == null || !hasTouchScreen()) {
    return null;
  }

  return (
    <>
      <div className="Broadcast-controls">
        <label htmlFor="wlToggle">Prevent screen lock</label>
        <Switch
          className="Broadcast-switch"
          id="wlToggle"
          onChange={handleChange}
          checked={wlEnabled}
        />
      </div>
    </>
  );
}
