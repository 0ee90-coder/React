/** @format */

import { useState } from "react";

import ArticleItem from "./ArticleItem.jsx";
import ArticleList from "./ArticleList.jsx";
import RegistArticle from "./RegistArticle.jsx";
import UpdateArticle from "./UpdateArticle.jsx";
import NeedLogin from "../member/NeedLogin.jsx";

export default function ArticleMain() {
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState();
  const [showArticleUpdate, setShowArticleUpdate] = useState();
  const [showArticle, setShowArticle] = useState();
  // const [replies, setReplies] = useState();
  // const [isRepliesLoading, setIsRepliesLoading] = useState(false);

  return (
    <>
      <NeedLogin>
        <RegistArticle setArticles={setArticles} />
      </NeedLogin>
      <ArticleItem
        setIsLoading={setIsLoading}
        setArticles={setArticles}
        setShowArticleUpdate={setShowArticleUpdate}
        showArticle={showArticle}
        setShowArticle={setShowArticle}
        // replies={replies}
        // setReplies={setReplies}
        // isRepliesLoading={isRepliesLoading}
        // setIsRepliesLoading={setIsRepliesLoading}
      />
      <UpdateArticle
        showArticleUpdate={showArticleUpdate}
        setShowArticleUpdate={setShowArticleUpdate}
        setShowArticle={setShowArticle}
        setArticles={setArticles}
      />
      <ArticleList
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        articles={articles}
        setArticles={setArticles}
        setShowArticle={setShowArticle}
        // setReplies={setReplies}
        // setIsRepliesLoading={setIsRepliesLoading}
      />
    </>
  );
}
