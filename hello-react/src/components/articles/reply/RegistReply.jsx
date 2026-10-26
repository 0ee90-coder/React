/** @format */

import { useRef } from "react";
import { readAllReplies, registNewReply } from "../../../api/reply/replyApi.js";

export default function RegistReply({ setReplies, articleId }) {
  const contentRef = useRef();
  const filesRef = useRef();

  const onClickReplySaveButtonHandler = () => {
    const content = contentRef.current.value;
    const files = filesRef.current.files;
    (async () => {
      const registResult = await registNewReply({
        articleId: articleId,
        content,
        files,
      });

      const replyList = await readAllReplies(articleId);
      setReplies(replyList);
      console.log(registResult);
    })();
  };

  return (
    <>
      <textarea
        ref={contentRef}
        placeholder="댓글 내용을 입력하세요."
      ></textarea>
      <input type="file" multiple ref={filesRef} />
      <button type="button" onClick={onClickReplySaveButtonHandler}>
        댓글 등록
      </button>
    </>
  );
}
