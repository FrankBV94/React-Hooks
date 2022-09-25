import React, { useState } from "react";

export const UseStateHook = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <h1>useState</h1>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </>
  );
};
