/** @format */

import {
  deleteOneArticle,
  recommendOneArticle,
  searchArticles,
} from "../../../api/article/articleApi.js";
import NeedLogin from "../member/NeedLogin.jsx";
import ReplyMain from "../reply/ReplyMain.jsx";

export default function ArticleItem({
  setIsLoading,
  setArticles,
  setShowArticleUpdate,
  showArticle,
  setShowArticle,
  // replies,
  // setReplies,
  // isRepliesLoading,
  // setIsRepliesLoading,
}) {
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

  const onClickArticleUpdateButtonHandler = (article) => {
    setShowArticle(undefined);
    setShowArticleUpdate(article);
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
            <NeedLogin>
              <button
                type="button"
                onClick={onClickArticleRecommendButtonHandler.bind(
                  this,
                  showArticle.body.id,
                )}
              >
                추천하기
              </button>
            </NeedLogin>
          </div>
          <div>내용: {showArticle.body.content}</div>
          <NeedLogin>
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
          </NeedLogin>
          <ReplyMain
            articleId={showArticle.body.id}
            // replies={replies}
            // setReplies={setReplies}
            // isRepliesLoading={isRepliesLoading}
            // setIsRepliesLoading={setIsRepliesLoading}
          />
        </div>
      )}
    </>
  );
}
