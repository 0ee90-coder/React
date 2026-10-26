import { useRef, useState } from "react";
import { loginApi } from "../../../api/member/memberApi";

export default function ArticleApp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [showLoginForm, setShowLoginForm] = useState(false);

  const onClickLoginButtonHandler = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    (async () => {
      const loginResult = await loginApi({ email, password });
      console.log(loginResult);
    })();
  };

  return (
    <div>
      {!showLoginForm && (
        <button type="button" onClick={setShowLoginForm.bind(this, true)}>
          로그인
        </button>
      )}
      {showLoginForm && (
        <div>
          <input
            type="text"
            placeholder="이메일을 입력하세요."
            ref={emailRef}
          />
          <input
            type="password"
            placeholder="비밀번호를 입력하세요."
            ref={passwordRef}
          />
          <button type="button" onClick={onClickLoginButtonHandler}>
            로그인
          </button>
          <button type="button" onClick={setShowLoginForm.bind(this, false)}>
            취소
          </button>
        </div>
      )}
    </div>
  );
}
