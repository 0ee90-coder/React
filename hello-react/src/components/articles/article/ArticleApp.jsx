/** @format */

import { Fragment, useEffect, useRef, useState } from "react";
import {
  deleteOneArticle,
  readOneArticle,
  recommendOneArticle,
  registNewArticle,
  searchArticles,
  updateArticle,
} from "../../../api/article/articleApi";
import style from "./ArticleApp.module.css";
import Loading from "../../common_ui/Loading";
import { loginApi, signUpApi } from "../../../api/member/memberApi";
import {
  deleteOneReply,
  readAllReplies,
  recommendOneReply,
  registNewReply,
  updateOneReply,
} from "../../../api/reply/replyApi";
import { host } from "../../../api/common";

export default function ArticleApp() {
  const [articles, setArticles] = useState();

  const [replies, setReplies] = useState();
  const [isRepliesLoading, setIsRepliesLoading] = useState(false);

  const [showWriteForm, setShowWriteForm] = useState(false);

  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [showArticle, setShowArticle] = useState();
  const [showArticleUpdate, setShowArticleUpdate] = useState();
  const [showReplyUpdate, setShowReplyUpdate] = useState();

  const [registArticleError, setRegistArticleError] = useState({});

  const subjectRef = useRef();
  const contentRef = useRef();
  const filesRef = useRef();

  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const nicknameRef = useRef();

  console.log(style);

  useEffect(() => {
    let ignoreUpdateState = false;
    //   const fetchArticles = async () => {};
    //   fetchArticles();
    (async () => {
      const articleList = await searchArticles();
      if (!ignoreUpdateState) {
        setIsLoading(false);
        console.log(articleList);
        setArticles(articleList);
      }
    })();

    return () => {
      ignoreUpdateState = true;
    };
  }, []);

  return <div></div>;
}
