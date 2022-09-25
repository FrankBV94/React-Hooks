import "./App.css";
import { UseStateHook } from "./components/UseStateHook";
import { UseEffectHook } from "./components/UseEffectHook";
import UseRefHook from "./components/UseRefHook";
import UseReducerHook from "./components/UseReducerHook";
import UseMemoHook from "./components/UseMemoHook";
import UseCallackHook from "./components/UseCallackHook";
import UseLayoutHook from "./components/UseLayoutHook";

function App() {
  return (
    <div>
      <UseStateHook />
      <UseEffectHook />
      <UseRefHook />
      <UseReducerHook />
      <UseMemoHook />
      <UseCallackHook />
      <UseLayoutHook />
    </div>
  );
}

export default App;
