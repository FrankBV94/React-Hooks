import React from "react";
import { useCallback } from "react";
import { useState } from "react";

function UseCallackHook() {
  const [count, setCount] = useState(100);

  const showCount = useCallback(() => {
    alert(count);
  }, [count]);
  return <>useCallack</>;
}

export default UseCallackHook;
