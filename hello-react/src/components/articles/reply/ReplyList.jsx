/** @format */

import { useEffect, useState } from "react";
import RegistReply from "./RegistReply.jsx";
import ReplyListItem from "./ReplyListItem.jsx";
import { readAllReplies } from "../../../api/reply/replyApi.js";
import NeedLogin from "../member/NeedLogin.jsx";

export default function ReplyList({
  // replies,
  // setReplies,
  // isRepliesLoading,
  // setIsRepliesLoading,
  articleId,
}) {
  const [replies, setReplies] = useState();
  const [isRepliesLoading, setIsRepliesLoading] = useState(true);

  useEffect(() => {
    let ignoreUpdateState = false;
    //   const fetchArticles = async () => {};
    //   fetchArticles();
    (async () => {
      const articleList = await readAllReplies(articleId);
      if (!ignoreUpdateState) {
        setIsRepliesLoading(false);
        console.log(articleList);
        setReplies(articleList);
      }
    })();

    return () => {
      ignoreUpdateState = true;
    };
  }, [articleId]);

  return (
    <div>
      {isRepliesLoading && <div>댓글을 불러오는 중입니다.</div>}
      {!isRepliesLoading && (
        <div>
          <NeedLogin>
            <RegistReply setReplies={setReplies} articleId={articleId} />
          </NeedLogin>
          <div>
            {replies.body.replyList.map((reply) => (
              <ReplyListItem
                key={reply.id}
                reply={reply}
                setReplies={setReplies}
                setIsRepliesLoading={setIsRepliesLoading}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
