export default function ArticleApp() {
  const onClickLogoutButtonHandler = () => {
    localStorage.removeItem("_jwt_");
  };

  return (
    <div>
      <button type="button" onClick={onClickLogoutButtonHandler}>
        로그아웃
      </button>
    </div>
  );
}
