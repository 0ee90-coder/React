import { useState } from "react";
import {
  deleteOneArticle,
  recommendOneArticle,
  searchArticles,
} from "../../../api/article/articleApi";
import { host } from "../../../api/common";
import {
  deleteOneReply,
  readAllReplies,
  recommendOneReply,
  registNewReply,
  updateOneReply,
} from "../../../api/reply/replyApi";

export default function ArticleItem() {
  const [showArticle, setShowArticle] = useState();
  const [showReplyUpdate, setShowReplyUpdate] = useState();
  const [isRepliesLoading, setIsRepliesLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState();
  const [replies, setReplies] = useState();
  const [showArticleUpdate, setShowArticleUpdate] = useState();

  const contentRef = useRef();
  const filesRef = useRef();

  const onClickReplySaveButtonHandler = () => {
    const content = contentRef.current.value;
    const files = filesRef.current.files;
    (async () => {
      const registResult = await registNewReply({
        articleId: showArticle.body.id,
        content,
        files,
      });

      console.log(registResult);
    })();
  };
  const onClickArticleUpdateButtonHandler = (article) => {
    setShowArticle(undefined);
    setShowArticleUpdate(article);
  };
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

  const onClickArticleDeleteButtonHandler = (articleId) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      (async () => {
        const deleteResult = await deleteOneArticle(articleId);
        if (deleteResult.httpStatusCode === 403) {
          if (deleteResult.error) {
            alert(deleteResult.error);
          }
        } else if (deleteResult.httpStatusCode === 200) {
          alert("삭제했습니다.");
          setShowArticle(undefined);

          setIsLoading(true);
          const articleList = await searchArticles();
          setIsLoading(false);
          setArticles(articleList);
        }
      })();
    }
  };
  const onClickArticleRecommendButtonHandler = (articleId) => {
    (async () => {
      const recommendResult = await recommendOneArticle(articleId);
      const recommendCount = recommendResult.body;
      setShowArticle((prevState) => {
        const newState = { ...prevState };
        newState.body = { ...newState.body, recommendCnt: recommendCount };
        return newState;
      });

      setArticles((prevState) => {
        const newState = { ...prevState };
        const articleList = newState.body.articleList;
        const article = articleList.find((article) => article.id === articleId);
        article.recommendCnt = recommendCount;
        return newState;
      });
    })();
  };
  return (
    <>
      {showArticle && (
        <div>
          <div>제목: {showArticle.body.subject}</div>
          <div>작성자 이름: {showArticle.body.member.name}</div>
          <div>작성자 Nickname: {showArticle.body.member.nickname}</div>
          <div>작성자 Email: {showArticle.body.member.email}</div>
          <div>작성일: {showArticle.body.crtDt}</div>
          {showArticle.body.mdfyDt && (
            <div>수정일: {showArticle.body.mdfyDt}</div>
          )}
          <div>조회수: {showArticle.body.viewCnt}</div>
          <div>
            추천수: {showArticle.body.recommendCnt}{" "}
            <button
              type="button"
              onClick={onClickArticleRecommendButtonHandler.bind(
                this,
                showArticle.body.id,
              )}
            >
              추천하기
            </button>
          </div>
          <div>내용: {showArticle.body.content}</div>
          <div>
            <button
              type="button"
              onClick={onClickArticleDeleteButtonHandler.bind(
                this,
                showArticle.body.id,
              )}
            >
              게시글 삭제
            </button>
            <button
              type="button"
              onClick={onClickArticleUpdateButtonHandler.bind(
                this,
                showArticle,
              )}
            >
              게시글 수정
            </button>
          </div>
          <div>
            댓글 목록
            {!isRepliesLoading && <div>댓글을 불러오는 중입니다.</div>}
            {isRepliesLoading && (
              <div>
                {!showReplyUpdate && (
                  <>
                    <textarea
                      ref={contentRef}
                      placeholder="댓글 내용을 입력하세요."
                    ></textarea>
                    <input type="file" multiple ref={filesRef} />
                    <button
                      type="button"
                      onClick={onClickReplySaveButtonHandler}
                    >
                      댓글 등록
                    </button>
                  </>
                )}

                <div>
                  {replies.body.replyList.map((reply) => (
                    <div key={reply.id}>
                      <div>작성자 이름: {reply.member.name}</div>
                      <div>작성자 이메일: {reply.member.email}</div>
                      <div>작성자 닉네임: {reply.member.nickname}</div>
                      <div>
                        추천수: {reply.recommendCnt}{" "}
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
                        <>
                          <button
                            type="button"
                            onClick={onCickReplyUpdateButtonHandler.bind(
                              this,
                              reply,
                            )}
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
                        </>
                      )}
                      {showReplyUpdate && (
                        <>
                          <textarea
                            ref={contentRef}
                            defaultValue={showReplyUpdate.content}
                            placeholder="댓글 내용을 입력하세요."
                          ></textarea>
                          <input type="file" multiple ref={filesRef} />
                          <button
                            type="button"
                            onClick={onClickReplyUpdateSaveButtonHandler}
                          >
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
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
