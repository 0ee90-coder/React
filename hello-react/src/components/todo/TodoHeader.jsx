/** @format */

import { useRef } from "react";
import Confirm from "../modals/Confirm";
import { doneAllTodos } from "../../api/todo/todoApi";

export default function TodoHeader({ onChangeDone, count, refreshTodoList }) {
  const confirmRef = useRef();
  const checkboxRef = useRef();

  const onChangeAllDoneHandler = () => {
    const checked = checkboxRef.current.checked;
    confirmRef.current.open(
      <div>
        모든 Task를 {checked ? "완료로" : "진행 중으로"} 변경 하시겠습니까?
      </div>,
    );
  };

  const onClickConfirmOkButtonHandler = () => {
    // 낙관적 업데이트.
    onChangeDone((prevTodoList) => {
      const newTodoList = prevTodoList.map((todo) => {
        return {
          ...todo,
          prevDone: todo.done, // 낙관적 업데이트 취소를 위해 원래의 done 을 prevDone에 할당.
          done: checkboxRef.current.checked,
        };
      });
      return newTodoList;
    });

    const reqeustAllDone = async () => {
      try {
        await doneAllTodos();
        // const todoList = await loadAllTodos();
        // onChangeDone(todoList);
        refreshTodoList();
      } catch (e) {
        console.log(e);
        // 낙관적 업데이트 취소.
        onChangeDone((prevTodoList) => {
          const newTodoList = prevTodoList.map((todo) => {
            const rollbackTodo = {
              ...todo,
              done: todo.prevDone, // prevDone의 값을 done으로 할당 (낙관적 업데이트 취소.)
            };
            delete rollbackTodo.prevDone; // prevDone은 제거.
            return rollbackTodo;
          });
          return newTodoList;
        });
      }
    };
    reqeustAllDone();
  };

  const onClickConfirmCancelButtonHandler = () => {
    checkboxRef.current.checked = !checkboxRef.current.checked;
  };

  return (
    <>
      <li>
        전체 Task 개수: {count.all} / 완료된 Task 개수: {count.done} / 진행중인
        Task 개수: {count.all - count.done}
      </li>
      <li className="tasks-header">
        <input
          id="checkall"
          type="checkbox"
          ref={checkboxRef}
          onChange={onChangeAllDoneHandler}
        />
        <label>Task</label>
        <span className="due-date">Due date</span>
        <span className="priority">Priority</span>
        <Confirm
          confirmRef={confirmRef}
          onOk={onClickConfirmOkButtonHandler}
          onCancel={onClickConfirmCancelButtonHandler}
        />
      </li>
    </>
  );
}
