/** @format */

import MemberMain from "../member/MemberMain.jsx";
import ArticleMain from "./ArticleMain.jsx";
import LoginContextProvider from "../../../contexts/LoginContext.jsx";

export default function ArticleApp() {
  return (
    <div>
      <LoginContextProvider>
        <MemberMain />
        <ArticleMain />
      </LoginContextProvider>
    </div>
  );
}
