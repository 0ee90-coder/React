/** @format */

import { host } from "../common";

export const readAllReplies = async (articleId) => {
  try {
    const fetchResult = await fetch(
      `${host}:8080/articles/${articleId}/replies`,
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

export const registNewReply = async ({ articleId, content, files }) => {
  try {
    const formData = new FormData();
    formData.append("content", content);
    for (const f of files) {
      formData.append("file", f);
    }

    // 인증을 위한 JWT
    const authorization = localStorage.getItem("_jwt_");
    const fetchResult = await fetch(
      `${host}:8080/articles/${articleId}/replies`,
      {
        method: "post",
        body: formData,
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

export const recommendOneReply = async (articleId, replyId) => {
  try {
    const authorization = localStorage.getItem("_jwt_");

    const fetchResult = await fetch(
      `${host}:8080/articles/${articleId}/replies/recommend/${replyId}`,
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

export const deleteOneReply = async (articleId, replyId) => {
  try {
    const authorization = localStorage.getItem("_jwt_");

    const fetchResult = await fetch(
      `${host}:8080/articles/${articleId}/replies/${replyId}`,
      {
        method: "delete",
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

export const updateOneReply = async ({
  articleId,
  replyId,
  content,
  files,
}) => {
  try {
    const formData = new FormData();
    formData.append("content", content);
    for (const f of files) {
      formData.append("file", f);
    }

    // 인증을 위한 JWT
    const authorization = localStorage.getItem("_jwt_");
    const fetchResult = await fetch(
      `${host}:8080/articles/${articleId}/replies/${replyId}`,
      {
        method: "put",
        body: formData,
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
