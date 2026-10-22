/** @format */

import TodoItem from "./TodoItem.jsx";

export default function TodoList({ todoList, onChangeDone }) {
  return (
    <>
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
        />
      ))}
    </>
  );
}
