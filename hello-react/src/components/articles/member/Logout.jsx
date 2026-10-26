/** @format */

import { useContext } from "react";
import { LoginContext } from "../../../contexts/LoginContext";

export default function Logout() {
  const { logout } = useContext(LoginContext);

  const onClickLogoutButtonHandler = () => {
    localStorage.removeItem("_jwt_");
    logout();
  };

  return (
    <div>
      <button type="button" onClick={onClickLogoutButtonHandler}>
        로그아웃
      </button>
    </div>
  );
}
