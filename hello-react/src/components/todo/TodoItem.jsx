/** @format */

import { useContext, useRef } from "react";
import Confirm from "../modals/Confirm";
import Message from "../modals/Message";
import { doneOneTodo } from "../../api/todo/todoApi";
import { TodoListContext } from "./TodoList";

export default function TodoItem({
  id,
  title,
  dueDate,
  priority,
  done,
  temp,
  onChangeDone,
  refreshTodoList,
}) {
  const priorityMap = {
    1: "높음",
    2: "보통",
    3: "낮음",
  };

  const checkboxRef = useRef();
  const confirmRef = useRef();
  const messageRef = useRef();

  const onChangeCheckboxHandler = () => {
    // API Server는 완료 ==> 진행중 으로 변경하는 기능이 없음.
    if (done) {
      messageRef.current.open(<div>이미 완료된 Todo 입니다.</div>);
      return;
    }
    confirmRef.current.open(
      <div>
        {title}을 {done ? "진행 중으로" : "완료로"} 변경 하시겠습니까?
      </div>,
    );
  };

  const onClickConfirmOkButtonHandler = () => {
    // 낙관적 업데이트.
    onChangeDone((prevTodoList) => {
      const todo = prevTodoList.find((todo) => todo.id === id);
      todo.done = !checkboxRef.current.checked;
      return [...prevTodoList];
    });

    const requestDoneFetch = async () => {
      try {
        await doneOneTodo(id);
        // const todoList = await loadAllTodos();
        // onChangeDone(todoList);
        refreshTodoList();
      } catch (e) {
        console.log(e);

        messageRef.current.open(<div>완료 처리를 할 수 없습니다.</div>);
        // 낙관적 업데이트 롤백
        onChangeDone((prevTodoList) => {
          const todo = prevTodoList.find((todo) => todo.id === id);
          // todo의 done을 TodoItem이 받아온 done props로 원복.
          todo.done = done;
          return [...prevTodoList];
        });
      }
    };
    requestDoneFetch();

    // onChangeDone((prevTodoList) => {
    //   const newTodoList = [...prevTodoList];

    //   // props로 받아온 ID를 이용해, todo item을 찾아온다.
    //   const targetItem = newTodoList.find((todo) => todo.id === id);
    //   // todo의 완료 상태를 체크박스의 체크 상태로 변경한다.
    //   targetItem.done = !checkboxRef.current.checked;
    //   return newTodoList;
    // });
  };

  const onClickConfirmCancelHandler = () => {
    confirmRef.current.close();
  };

  const { tagName } = useContext(TodoListContext);
  if (tagName !== "TodoList") {
    return <div>잘못된 컴포넌트 위치입니다.</div>;
  }

  return (
    <li className={`task-item ${done ? "done-todo" : ""}`}>
      <input
        id={id}
        type="checkbox"
        checked={done}
        onChange={onChangeCheckboxHandler}
        ref={checkboxRef}
        disabled={temp}
      />
      <label htmlFor={id}>{title}</label>
      <span className="due-date">{dueDate}</span>
      <span className="priority">{priorityMap[priority]}</span>
      <Confirm
        confirmRef={confirmRef}
        onOk={onClickConfirmOkButtonHandler}
        onCancel={onClickConfirmCancelHandler}
      />
      <Message messageRef={messageRef} />
    </li>
  );
}
