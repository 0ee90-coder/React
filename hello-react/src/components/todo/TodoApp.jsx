/** @format */

import TodoAppender from "./TodoAppender.jsx";
import TodoHeader from "./TodoHeader.jsx";
import TodoItem from "./TodoItem.jsx";

export default function TodoApp() {
  const todoItems = [];

  return (
    <div className="wrapper">
      <header>React Todo</header>
      <ul className="tasks">
        <TodoHeader />
        <TodoItem
          dueDate="2026-10-19"
          id="todo_1"
          title="React Component Master"
          priority="1"
        />
        <TodoItem
          dueDate="2026-10-20"
          id="todo_2"
          title="Array.map() 함수 사용하기"
          priority="1"
        />
      </ul>
      <TodoAppender />
    </div>
  );
}
