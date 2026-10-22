/** @format */

import { useState } from "react";
import TodoApp from "../todo/TodoApp.jsx";
import Counter from "../../tests/Counter.jsx";
import ManagementVariables from "../../tests/ManagementVariables.jsx";
import Person from "../../tests/Person.jsx";
import ListApp from "../../tests/List.jsx";
import StateTest from "../../tests/State.jsx";

export default function Navigator() {
  const componentMap = {
    TodoApp: <TodoApp />,
    Counter: <Counter />,
    ManagementVariables: <ManagementVariables />,
    Person: <Person />,
    ListApp: <ListApp />,
    StateTest: <StateTest />,
  };

  const [item, setItem] = useState("TodoApp");

  const onClickButtonHandler = (value) => {
    setItem(value);
    console.log(value);
  };

  return (
    <>
      <div>
        <button
          type="button"
          onClick={onClickButtonHandler.bind(this, "TodoApp")}
        >
          TodoApp
        </button>
        <button
          type="button"
          onClick={onClickButtonHandler.bind(this, "Counter")}
        >
          Counter
        </button>
        <button
          type="button"
          onClick={onClickButtonHandler.bind(this, "ManagementVariables")}
        >
          ManagementVariables
        </button>
        <button
          type="button"
          onClick={onClickButtonHandler.bind(this, "Person")}
        >
          Person
        </button>
        <button
          type="button"
          onClick={onClickButtonHandler.bind(this, "ListApp")}
        >
          ListApp
        </button>
        <button
          type="button"
          onClick={onClickButtonHandler.bind(this, "StateTest")}
        >
          StateTest
        </button>
      </div>
      <div>{componentMap[item]}</div>
    </>
  );
}
