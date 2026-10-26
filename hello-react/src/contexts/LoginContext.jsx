/**
 * 로그인 상태가 필요한 컴포넌트들에게 State를 공유(구독)할 수 있도록 해주는 특별한 컴포넌트.
 * Context
 * @format
 */

import { createContext, useState } from "react";

// Context가 관리하려는 State 형태 생성.
export const LoginContext = createContext({
  isLogin: false,
  login() {},
  logout() {},
});

// Context State를 전파(공유/구독)할 수 있는 컴포넌트 생성.
export default function LoginContextProvider({ children }) {
  // createContext 로 만들어진 객체 내용 중 isLogin에 해당하는 state 생성.
  const [isLogin, setIsLogin] = useState(false);

  const login = () => {
    setIsLogin(true);
  };
  const logout = () => {
    setIsLogin(false);
  };

  // createContext로 만들어진 State 형태를 구현!
  const contextValue = {
    isLogin,
    login,
    logout,
  };

  // LoginContext.Provider의 모든 하위 컴포넌트들에게 전파한다.
  return (
    <LoginContext.Provider value={contextValue}>
      {children}
    </LoginContext.Provider>
  );
}
