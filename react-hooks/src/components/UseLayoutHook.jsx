import React from "react";
import { useLayoutEffect } from "react";
import { useState } from "react";

function UseLayoutHook() {
  const [count, setCount] = useState(100);

  useLayoutEffect(() => {
    fetch("https://api.github.com/users/mike-b-miller")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  });
  return (
    <>
      <h1>useLayout</h1>
      <div>{data}</div>
    </>
  );
}

export default UseLayoutHook;
