import { ChangeEvent } from "react";

function DebounceThisEvent(fn: (arg0: string) => void) {
  let timer: NodeJS.Timeout;
  return (args: string) => {
    clearTimeout(timer);
    console.log("cleared");
    timer = setTimeout(() => {
      console.log("timed");
      fn.apply(null, [args]);
    }, 200);
  };
}

export default DebounceThisEvent;
