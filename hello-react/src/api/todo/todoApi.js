/** @format */

import { host } from "../common";

export const loadAllTodos = async () => {
  try {
    const fetchResult = await fetch(`${host}:8888/api/v1/task`);
    if (!fetchResult.ok) {
      throw Error("잘못된 요청입니다.");
    }
    const responseTodoList = await fetchResult.json();
    return responseTodoList.body;
  } catch (e) {
    throw Error("잘못된 요청입니다.", e);
  }
};

export const addTodo = async (newTodo) => {
  try {
    const fetchResult = await fetch(`${host}:8888/api/v1/task`, {
      method: "post",
      body: JSON.stringify(newTodo),
      headers: { "Content-Type": "application/json" },
    });
    if (!fetchResult.ok) {
      throw Error("잘못된 요청입니다.");
    }
    const responseJson = await fetchResult.json();
    return responseJson.body;
  } catch (e) {
    throw Error("잘못된 요청입니다.", e);
  }
};

export const doneOneTodo = async (todoId) => {
  try {
    const fetchResult = await fetch(`${host}:8888/api/v1/task/${todoId}`, {
      method: "put",
    });
    if (!fetchResult.ok) {
      throw Error("잘못된 요청입니다.");
    }
    const responseJson = await fetchResult.json();
    return responseJson.body;
  } catch (e) {
    throw Error("잘못된 요청입니다.", e);
  }
};

export const doneAllTodos = async () => {
  try {
    const fetchResult = await fetch(`${host}:8888/api/v1/task`, {
      method: "put",
    });
    if (!fetchResult.ok) {
      throw Error("잘못된 요청입니다.");
    }
    const responseJson = await fetchResult.json();
    return responseJson.body;
  } catch (e) {
    throw Error("잘못된 요청입니다.", e);
  }
};
