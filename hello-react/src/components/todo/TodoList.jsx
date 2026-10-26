/** @format */

import { createContext } from "react";
import TodoItem from "./TodoItem.jsx";

export const TodoListContext = createContext({ tagName: "" });

export default function TodoList({ todoList, onChangeDone, refreshTodoList }) {
  const todoListContextValue = { tagName: "TodoList" };
  return (
    <TodoListContext.Provider value={todoListContextValue}>
      {todoList.map(({ id, task, dueDate, priority, done, temp }) => (
        <TodoItem
          key={id}
          id={id}
          title={task}
          dueDate={dueDate}
          priority={priority}
          done={done}
          temp={temp}
          onChangeDone={onChangeDone}
          refreshTodoList={refreshTodoList}
        />
      ))}
    </TodoListContext.Provider>
  );
}
