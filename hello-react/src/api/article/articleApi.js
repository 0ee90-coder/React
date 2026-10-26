/** @format */

import { host } from "../common";

export const searchArticles = async (param = {}) => {
  const { pageNo = 0 } = param;

  try {
    const fetchResult = await fetch(`${host}:8080/articles?pageNo=${pageNo}`);
    if (!fetchResult.ok) {
      throw Error("잘못된 요청입니다.");
    }

    const responseJson = await fetchResult.json();
    return responseJson;
  } catch (e) {
    throw Error("잘못된 요청입니다.", e);
  }
};

export const registNewArticle = async ({ subject, content, files }) => {
  try {
    console.log(files);

    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("content", content);
    // formData.append("file", files);
    // files가 선택되었을 경우에는 FileList로 들어오기 때문에, 반복이 필요하다.
    // 각 인덱스에 있는 파일들을 하나씩 formData에게 할당해야 한다.
    for (const f of files) {
      console.log(f);
      formData.append("file", f);
    }

    // 인증을 위한 JWT
    const authorization = localStorage.getItem("_jwt_");

    const fetchResult = await fetch(`${host}:8080/articles`, {
      method: "post",
      body: formData,
      headers: {
        Authorization: authorization,
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

export const readOneArticle = async (articleId) => {
  try {
    const fetchResult = await fetch(`${host}:8080/articles/${articleId}`);
    if (!fetchResult.ok) {
      throw Error("잘못된 요청입니다.");
    }

    const responseJson = await fetchResult.json();
    return responseJson;
  } catch (e) {
    throw Error("잘못된 요청입니다.", e);
  }
};

export const recommendOneArticle = async (articleId) => {
  try {
    const authorization = localStorage.getItem("_jwt_");

    const fetchResult = await fetch(
      `${host}:8080/articles/recommend/${articleId}`,
      {
        method: "put",
        headers: {
          Authorization: authorization,
        },
      },
    );
    if (!fetchResult.ok) {
      throw Error("잘못된 요청입니다.");
    }

    const responseJson = await fetchResult.json();
    return responseJson;
  } catch (e) {
    throw Error("잘못된 요청입니다.", e);
  }
};

export const deleteOneArticle = async (articleId) => {
  try {
    const authorization = localStorage.getItem("_jwt_");

    const fetchResult = await fetch(`${host}:8080/articles/${articleId}`, {
      method: "delete",
      headers: {
        Authorization: authorization,
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

export const updateArticle = async ({ articleId, subject, content, files }) => {
  try {
    console.log(files);

    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("content", content);
    // formData.append("file", files);
    // files가 선택되었을 경우에는 FileList로 들어오기 때문에, 반복이 필요하다.
    // 각 인덱스에 있는 파일들을 하나씩 formData에게 할당해야 한다.
    for (const f of files) {
      console.log(f);
      formData.append("file", f);
    }

    // 인증을 위한 JWT
    const authorization = localStorage.getItem("_jwt_");

    const fetchResult = await fetch(`${host}:8080/articles/${articleId}`, {
      method: "put",
      body: formData,
      headers: {
        Authorization: authorization,
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
