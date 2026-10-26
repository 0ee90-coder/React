/** @format */

import TodoAppender from "./TodoAppender.jsx";
import TodoHeader from "./TodoHeader.jsx";
import TodoList from "./TodoList.jsx";
import { useLoadTodo } from "../../hooks/todoHooks.js";

export default function TodoApp() {
  console.log("TodoApp 실행됨.");

  const { todos, setTodos, isLoading, error, refreshTodoList } = useLoadTodo();

  const taskCountInfo = {
    all: todos.length,
    done: todos.filter((todo) => todo.done).length,
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="wrapper">
      <header>React Todo</header>
      <ul className="tasks">
        <TodoHeader
          onChangeDone={setTodos}
          count={taskCountInfo}
          refreshTodoList={refreshTodoList}
        />
        {isLoading && <li>Todo를 불러오는 중입니다.</li>}
        {!isLoading && (
          <TodoList
            todoList={todos}
            onChangeDone={setTodos}
            refreshTodoList={refreshTodoList}
          />
        )}
      </ul>
      <TodoAppender onClickSave={setTodos} refreshTodoList={refreshTodoList} />
    </div>
  );
}
