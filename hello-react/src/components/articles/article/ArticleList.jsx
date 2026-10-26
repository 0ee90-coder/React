import { Fragment } from "react";
import Loading from "../../common_ui/Loading";
import style from "./ArticleApp.module.css";
import {
  readOneArticle,
  searchArticles,
} from "../../../api/article/articleApi";
import { readAllReplies } from "../../../api/reply/replyApi";

export default function ArticleList() {
  const [articles, setArticles] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isRepliesLoading, setIsRepliesLoading] = useState(false);
  const [replies, setReplies] = useState();
  const [showArticle, setShowArticle] = useState();

  const onClickArticleItemHandler = (articleId) => {
    (async () => {
      const readArticleResult = await readOneArticle(articleId);
      setShowArticle(readArticleResult);

      setArticles((prevState) => {
        const newState = { ...prevState };
        const articleList = newState.body.articleList;
        const article = articleList.find((article) => article.id === articleId);
        article.viewCnt = readArticleResult.body.viewCnt;
        return newState;
      });

      setIsRepliesLoading(false);
      const repliesList = await readAllReplies(articleId);
      setReplies(repliesList);
      setIsRepliesLoading(true);
    })();
  };
  const onClickMoreButtonHandler = () => {
    // 현재 페이지 번호 가져오기. (paginate.pageNo)
    const pageNo = articles.paginate.pageNo;
    // pageCount 가져오기 (paginate.pageCount)
    const pageCount = articles.paginate.pageCount;

    // pageCount - 1 > 현재 페이지 ===> 다음 목록을 가져온다.
    if (pageCount - 1 > pageNo) {
      (async () => {
        const articleList = await searchArticles({ pageNo: pageNo + 1 });
        // 기존 articles 내용을 갱신한다.
        setArticles((prevState) => {
          const newState = { ...prevState };

          newState.body = {
            articleCount: articleList.body.articleCount,
            articleList: [
              ...newState.body.articleList,
              ...articleList.body.articleList,
            ],
          };

          // articleCount는 새로운 값으로 갱신.
          // newState.body.articleCount = articleList.body.articleCount;
          // articleList에는 새로운 값을 아래에 붙여넣기.
          //   newState.body.articleList = [
          //     ...newState.body.articleList,
          //     ...articleList.body.articleList,
          //   ];
          // paginate는 새로운 객체로 갱신.
          newState.paginate = articleList.paginate;
          return newState;
        });
      })();
    }
  };
  return (
    <div className={style.articleListGrid}>
      <div>ID</div>
      <div>제목</div>
      <div>닉네임</div>
      <div>작성일</div>
      <div>추천수</div>
      <div>조회수</div>
      <Loading
        isLoading={isLoading}
        loadingMessage={<div>게시글을 불러오는 중입니다...........</div>}
      >
        {!isLoading &&
          articles.body.articleList.map(
            ({
              id,
              subject,
              member: { nickname },
              crtDt,
              recommendCnt,
              viewCnt,
            }) => (
              <Fragment key={id}>
                <div>{id}</div>
                <div onClick={onClickArticleItemHandler.bind(this, id)}>
                  {subject}
                </div>
                <div>{nickname}</div>
                <div>{crtDt}</div>
                <div>{recommendCnt}</div>
                <div>{viewCnt}</div>
              </Fragment>
            ),
          )}

        <div>
          <button type="button" onClick={onClickMoreButtonHandler}>
            더 보기
          </button>
        </div>
      </Loading>
    </div>
  );
}
