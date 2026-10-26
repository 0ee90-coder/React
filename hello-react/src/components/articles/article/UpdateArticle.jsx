import { useRef } from "react";
import {
  readOneArticle,
  searchArticles,
} from "../../../api/article/articleApi";

export default function updateArticle() {
  const [showArticleUpdate, setShowArticleUpdate] = useState();
  const [articles, setArticles] = useState();
  const [showArticle, setShowArticle] = useState();

  const filesRef = useRef();
  const subjectRef = useRef();
  const contentRef = useRef();

  const onClickArticleUpdateCancelButtonHandler = (article) => {
    setShowArticle(article);
    setShowArticleUpdate(undefined);
  };

  const onClickArticleUpdateSaveButtonHandler = () => {
    // 사용자가 입력한 제목을 가져온다.
    const subject = subjectRef.current.value;
    // 사용자가 입력한 내용을 가져온다.
    const content = contentRef.current.value;
    // 사용자가 선택한 파일들을 가져온다.
    const files = filesRef.current.files;
    //
    // registNewArticle 호출한다.
    (async () => {
      const registResult = await updateArticle({
        articleId: showArticleUpdate.body.id,
        subject,
        content,
        files,
      });
      if (registResult.httpStatusCode === 200) {
        const readArticleResult = await readOneArticle(
          showArticleUpdate.body.id,
        );
        setShowArticle(readArticleResult);

        const searchResult = await searchArticles();
        setArticles(searchResult);
        setShowArticleUpdate(undefined);
      } else {
        // 유효성 검사 실패 했을 때 처리
        // 파일 업로드 실패 했을 때 처리
        // 인증 누락일 때 처리.
        // 케이스 확인 후 처리 필요.
      }
    })();
  };

  return (
    <>
      {showArticleUpdate && (
        <div>
          <div>
            <input
              type="text"
              placeholder="제목을 입력하세요."
              defaultValue={showArticleUpdate.body.subject}
              ref={subjectRef}
            />
            <textarea
              placeholder="내용을 입력하세요."
              ref={contentRef}
              defaultValue={showArticleUpdate.body.content}
            ></textarea>
            <input type="file" multiple ref={filesRef} />
          </div>
          <div>
            <button
              type="button"
              onClick={onClickArticleUpdateSaveButtonHandler}
            >
              수정 완료
            </button>
            <button
              type="button"
              onClick={onClickArticleUpdateCancelButtonHandler.bind(
                this,
                showArticleUpdate,
              )}
            >
              취소
            </button>
          </div>
        </div>
      )}
    </>
  );
}
