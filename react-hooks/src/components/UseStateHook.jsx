import React, { useState } from "react";

export const UseStateHook = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <div className="App">
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>Click me</button>
      </div>
    </div>
  );
};
