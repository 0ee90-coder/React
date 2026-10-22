/** @format */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Navigator from "./components/navigator/NavigatorApp.jsx";

// StrictMode는 React의 코드를 두 번씩 실행시킨다.
// 무엇을 두 번씩 실행시키나?
// 1. 컴포넌트의 실행(최초, 재실행)
// 2. state 변경 함수 (setState)
// 3. useEffect 함수
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Navigator />
  </StrictMode>,
);
