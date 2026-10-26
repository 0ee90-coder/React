/** @format */

// import { useState } from "react";
import { useState } from "react";
import { host } from "../../../api/common.js";
import {
  deleteOneReply,
  readAllReplies,
  recommendOneReply,
} from "../../../api/reply/replyApi.js";
import UpdateReply from "./UpdateReply.jsx";
import NeedLogin from "../member/NeedLogin.jsx";

export default function ReplyListItem({
  reply,
  setReplies,
  setIsRepliesLoading,
}) {
  const [showReplyUpdate, setShowReplyUpdate] = useState();

  const onClickReplyRecommendButtonHandler = (articleId, replyId) => {
    (async () => {
      const recommendResult = await recommendOneReply(articleId, replyId);
      console.log(recommendResult);

      const replyList = await readAllReplies(articleId);
      setReplies(replyList);
    })();
  };

  const onCickReplyUpdateButtonHandler = (reply) => {
    console.log(reply);
    setShowReplyUpdate(reply);
  };

  const onClickReplyDeleteButtonHandler = (articleId, replyId) => {
    (async () => {
      const deleteResult = await deleteOneReply(articleId, replyId);
      console.log(deleteResult);
      if (deleteResult.httpStatusCode !== 200) {
        alert(deleteResult.error);
      }
      const replyList = await readAllReplies(articleId);
      setReplies(replyList);
    })();
  };

  return (
    <div>
      <div>작성자 이름: {reply.member.name}</div>
      <div>작성자 이메일: {reply.member.email}</div>
      <div>작성자 닉네임: {reply.member.nickname}</div>
      <div>
        추천수: {reply.recommendCnt}{" "}
        <NeedLogin>
          <button
            type="button"
            onClick={onClickReplyRecommendButtonHandler.bind(
              this,
              reply.articleId,
              reply.id,
            )}
          >
            추천하기
          </button>
        </NeedLogin>
      </div>
      <div>작성일: {reply.crtDt}</div>
      {reply.fileSet && (
        <div>
          첨부파일:{" "}
          {reply.fileSet.files.map((f) => (
            <div key={f.id}>
              <div>
                <a
                  href={`${host}:8080/filesets/${f.fileSetId}/files/download/${f.id}`}
                >
                  {f.displayFileName}
                </a>
              </div>
              <span>파일 크기: {f.fileSize} bytes </span>
              <span>다운로드 횟수: {f.downloadCount} 회</span>
            </div>
          ))}
        </div>
      )}
      {reply.mdfyDt && <div>수정일: {reply.mdfyDt}</div>}
      <div>내용: {reply.content}</div>
      {!showReplyUpdate && (
        <NeedLogin>
          <button
            type="button"
            onClick={onCickReplyUpdateButtonHandler.bind(this, reply)}
          >
            댓글 수정하기
          </button>
          <button
            type="button"
            onClick={onClickReplyDeleteButtonHandler.bind(
              this,
              reply.articleId,
              reply.id,
            )}
          >
            댓글 삭제하기
          </button>
        </NeedLogin>
      )}
      <NeedLogin>
        <UpdateReply
          showReplyUpdate={showReplyUpdate}
          setShowReplyUpdate={setShowReplyUpdate}
          setReplies={setReplies}
        />
      </NeedLogin>
    </div>
  );
}
