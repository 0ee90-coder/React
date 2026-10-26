/** @format */

import { host } from "../common";

export const loginApi = async ({ email, password }) => {
  try {
    const fetchResult = await fetch(`${host}:8080/login`, {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!fetchResult.ok) {
      throw Error("잘못된 요청입니다.");
    }

    const responseJson = await fetchResult.json();
    if (responseJson.httpStatusCode === 200) {
      const jwt = responseJson.body;
      localStorage.setItem("_jwt_", jwt);
      return;
    }

    return responseJson;
  } catch (e) {
    throw Error("잘못된 요청입니다.", e);
  }
};

export const signUpApi = async ({ email, password, name, nickname }) => {
  try {
    const fetchResult = await fetch(`${host}:8080/members`, {
      method: "post",
      body: JSON.stringify({ email, password, name, nickname }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!fetchResult.ok) {
      throw Error("잘못된 요청입니다.");
    }

    const responseJson = await fetchResult.json();
    return responseJson;
  } catch (e) {
    throw Error("잘못된 요청입니다.", e);
  }
};
