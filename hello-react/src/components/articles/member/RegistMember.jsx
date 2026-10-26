import { useRef } from "react";
import { signUpApi } from "../../../api/member/memberApi";

export default function RegistMember() {
  const [signUpError, setSignUpError] = useState({});
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const nicknameRef = useRef();

  const onClickSignUpButtonHandler = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const name = nameRef.current.value;
    const nickname = nicknameRef.current.value;

    (async () => {
      setSignUpError({});
      const signUpResult = await signUpApi({ email, password, name, nickname });
      console.log(signUpResult);
      if (signUpResult.httpStatusCode === 400) {
        if (signUpResult.validations) {
          const validationResult = signUpResult.validations;
          setSignUpError(validationResult);
        }
      } else if (signUpResult.httpStatusCode === 403) {
        if (signUpResult.error) {
          alert(signUpResult.error);
        }
      } else if (signUpResult.httpStatusCode === 200) {
        alert("회원가입 완료");
        setShowSignUpForm(false);
      }
    })();
  };

  return (
    <>
      <div>
        {!showSignUpForm && (
          <button type="button" onClick={setShowSignUpForm.bind(this, true)}>
            회원가입
          </button>
        )}
        {showSignUpForm && (
          <div>
            <div>
              <input
                type="text"
                placeholder="이메일을 입력하세요."
                ref={emailRef}
              />
              {signUpError.email &&
                signUpError.email.map((e) => <div key={e}>{e}</div>)}
            </div>
            <div>
              <input
                type="password"
                placeholder="비밀번호를 입력하세요."
                ref={passwordRef}
              />
              {signUpError.password &&
                signUpError.password.map((e) => <div key={e}>{e}</div>)}
            </div>
            <div>
              <input
                type="text"
                placeholder="이름을 입력하세요."
                ref={nameRef}
              />
              {signUpError.name &&
                signUpError.name.map((e) => <div key={e}>{e}</div>)}
            </div>
            <div>
              <input
                type="text"
                placeholder="닉네임을 입력하세요."
                ref={nicknameRef}
              />
              {signUpError.nickname &&
                signUpError.nickname.map((e) => <div key={e}>{e}</div>)}
            </div>
            <button type="button" onClick={onClickSignUpButtonHandler}>
              회원가입
            </button>
            <button type="button" onClick={setShowSignUpForm.bind(this, false)}>
              취소
            </button>
          </div>
        )}
      </div>
    </>
  );
}
