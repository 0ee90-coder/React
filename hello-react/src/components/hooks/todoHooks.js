import { useEffect, useState } from "react";
import { loadAllTodos } from "../../api/todo/todoApi";

// 함수의 이름이 "use"로 시작하면 React는 Hook으로 취급한다.
/*
 Hook 들은 컴포넌트 내부에서만 사용 가능.
 컴포넌트 내부의 함수에서는 사용이 불가능.
 커스텀 Hook에서도 Hook을 사용할 수 있다. ==> 여러 Hook들을 결합해서 사용할 때.
 */
export const useLoadTodo = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

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
          setIsLoading(false);
        }
      } catch (e) {
        console.log(e);
        setError(e.message);
      }
    };
    loadTodoList();

    return () => {
      console.log("TodoApp componentWillUnmount");
      ignoreUpdateState = true;
    };
  }, []);

  return { todos, setTodos, isLoading, error };
};
