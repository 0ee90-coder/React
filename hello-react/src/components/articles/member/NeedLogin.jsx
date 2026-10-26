/** @format */

import { useContext } from "react";
import { LoginContext } from "../../../contexts/LoginContext";

export default function NeedLogin({ children }) {
  const { isLogin } = useContext(LoginContext);
  if (!isLogin) {
    return <></>;
  }

  return <>{children}</>;
}
