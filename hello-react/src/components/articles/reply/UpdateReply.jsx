/** @format */

import { useRef } from "react";
import { readAllReplies, updateOneReply } from "../../../api/reply/replyApi.js";

export default function UpdateReply({
  showReplyUpdate,
  setShowReplyUpdate,
  setReplies,
}) {
  const contentRef = useRef();
  const filesRef = useRef();

  const onClickReplyUpdateSaveButtonHandler = () => {
    const articleId = showReplyUpdate.articleId;
    const replyId = showReplyUpdate.id;
    const content = contentRef.current.value;
    const files = filesRef.current.files;

    (async () => {
      const updateResult = await updateOneReply({
        articleId,
        replyId,
        content,
        files,
      });

      if (updateResult.httpStatusCode === 200) {
        setShowReplyUpdate(undefined);

        const replyList = await readAllReplies(articleId);
        setReplies(replyList);
      } else {
        alert(updateResult.error);
      }
    })();
  };

  return (
    <>
      {showReplyUpdate && (
        <>
          <textarea
            ref={contentRef}
            defaultValue={showReplyUpdate.content}
            placeholder="댓글 내용을 입력하세요."
          ></textarea>
          <input type="file" multiple ref={filesRef} />
          <button type="button" onClick={onClickReplyUpdateSaveButtonHandler}>
            댓글 수정 완료
          </button>
          <button
            type="button"
            onClick={setShowReplyUpdate.bind(this, undefined)}
          >
            취소
          </button>
        </>
      )}
    </>
  );
}
