/** @format */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ListApp from "./tests/List.jsx";
import Person from "./tests/Person.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/** <App /> <-- App.jsx에 있는 App 함수를 실행시키고, 그 반환 결과를 현재 자리에 노출시켜라.  */}
    <App />
    {/* <ListApp /> */}
    {/* <Person name="김경환" age={34} job="st">
      <ul>
        Computers
        <li>Macbook</li>
        <li>Windows Laptop</li>
      </ul>
    </Person>
    <Person name="React" age={13} job="Library" />
    <Person name="홍길동" age={20} job="의적">
      <img src="https://img1.kakaocdn.net/thumb/R1280x0.fwebp/?fname=http://t1.daumcdn.net/brunch/service/user/F6P/image/VKzWHJAzm5HxEfoexwOZuR8Xr1Q.JPG" />
    </Person> */}
  </StrictMode>,
);
