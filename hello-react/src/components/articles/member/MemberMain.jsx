/** @format */

import { useContext, useEffect } from "react";
import Login from "./Login.jsx";
import Logout from "./Logout.jsx";
import RegistMember from "./RegistMember.jsx";
import { LoginContext } from "../../../contexts/LoginContext.jsx";
import NeedLogin from "./NeedLogin.jsx";

export default function MemberMain() {
  // LoginContextProvider가 제공하는 LoginContext를 구독 받는다.
  const { login, isLogin } = useContext(LoginContext);

  useEffect(() => {
    if (localStorage.getItem("_jwt_")) {
      login();
    }
  }, [login]);

  return (
    <>
      <NeedLogin>
        <Logout />
      </NeedLogin>

      {!isLogin && (
        <>
          <Login />
          <RegistMember />
        </>
      )}
    </>
  );
}
