/** @format */

import { useRef, useState } from "react";
import {
  registNewArticle,
  searchArticles,
} from "../../../api/article/articleApi.js";

export default function RegistArticle({ setArticles }) {
  const [showWriteForm, setShowWriteForm] = useState(false);
  const [registArticleError, setRegistArticleError] = useState({});

  const subjectRef = useRef();
  const contentRef = useRef();
  const filesRef = useRef();

  const onClickArticleSaveButtonHandler = () => {
    setRegistArticleError({});

    // 사용자가 입력한 제목을 가져온다.
    const subject = subjectRef.current.value;
    // 사용자가 입력한 내용을 가져온다.
    const content = contentRef.current.value;
    // 사용자가 선택한 파일들을 가져온다.
    const files = filesRef.current.files;
    //
    // registNewArticle 호출한다.
    (async () => {
      const registResult = await registNewArticle({ subject, content, files });
      if (registResult.httpStatusCode === 201) {
        // 정상 케이스 일 때 처리
        // 게시글 목록 재조회.
        const searchResult = await searchArticles();
        setArticles(searchResult);
        setShowWriteForm(false);
      }
      // 유효성 검사 실패 했을 때 처리
      else if (registResult.httpStatusCode === 400) {
        setRegistArticleError(registResult.validations);
      }
    })();
  };

  const onClickArticleSaveCancelButtonHandler = () => {
    setRegistArticleError({});
    setShowWriteForm(false);
  };

  return (
    <div>
      {!showWriteForm && (
        <button type="button" onClick={setShowWriteForm.bind(this, true)}>
          글쓰기
        </button>
      )}

      {showWriteForm && (
        <div>
          <div>
            <input
              type="text"
              placeholder="제목을 입력하세요."
              ref={subjectRef}
            />
            {registArticleError.subject &&
              registArticleError.subject.map((validate) => (
                <div>{validate}</div>
              ))}
          </div>
          <textarea
            placeholder="내용을 입력하세요."
            ref={contentRef}
          ></textarea>
          <input type="file" multiple ref={filesRef} />

          <button type="button" onClick={onClickArticleSaveButtonHandler}>
            저장
          </button>
          <button type="button" onClick={onClickArticleSaveCancelButtonHandler}>
            취소
          </button>
        </div>
      )}
    </div>
  );
}
