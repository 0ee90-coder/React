/** @format */

import { useEffect, useState } from "react";
import TodoAppender from "./TodoAppender.jsx";
import TodoHeader from "./TodoHeader.jsx";
import TodoList from "./TodoList.jsx";
import { loadAllTodos } from "../../api/todo/todoApi.js";

export default function TodoApp() {
  console.log("TodoApp 실행됨.");
  const [todos, setTodos] = useState([]);

  // TODO 목록을 API를 통해 얻어온다.
  useEffect(() => {
    let ignoreUpdateState = false;
    console.log(1, ignoreUpdateState);
    const loadTodoList = async () => {
      console.log(2, ignoreUpdateState);
      try {
        const todoList = await loadAllTodos();
        if (!ignoreUpdateState) {
          setTodos(todoList);
        }
      } catch (e) {
        console.log(e);
      }
    };
    loadTodoList();

    return () => {
      console.log("TodoApp componentWillUnmount");
      ignoreUpdateState = true;
    };
  }, []);

  const taskCountInfo = {
    all: todos.length,
    done: todos.filter((todo) => todo.done).length,
  };

  return (
    <div className="wrapper">
      <header>React Todo</header>
      <ul className="tasks">
        <TodoHeader onChangeDone={setTodos} count={taskCountInfo} />
        <TodoList todoList={todos} onChangeDone={setTodos} />
      </ul>
      <TodoAppender onClickSave={setTodos} />
    </div>
  );
}
