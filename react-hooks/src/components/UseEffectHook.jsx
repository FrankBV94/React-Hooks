import React, { useEffect, useState } from "react";

export const UseEffectHook = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(count + 1);
  }, []);
  return <div>
    <h1>{count}</h1>
  </div>;
};
