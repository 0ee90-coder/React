/** @format */
import { useImperativeHandle, useState } from "react";
import style from "./Confirm.module.css";
import { createPortal } from "react-dom";

export default function Confirm({
  confirmRef,
  onClose = () => {},
  onOk = () => {},
  onCancel = () => {},
}) {
  const [message, setMessage] = useState();
  const [open, setOpen] = useState(false);

  useImperativeHandle(confirmRef, () => {
    return {
      open(modalDescription) {
        setMessage(modalDescription);
        setOpen(true);
      },
      close() {
        setMessage(undefined);
        setOpen(false);
      },
    };
  });

  const onClickCloseButtonHandler = () => {
    onCancel();
    onClose();
    setMessage(undefined);
    setOpen(false);
  };
  const onClickCancelButtonHandler = () => {
    onCancel();
    onClose();
    setMessage(undefined);
    setOpen(false);
  };
  const onClickOkButtonHandler = () => {
    onOk();
    onClose();
    setMessage(undefined);
    setOpen(false);
  };

  return createPortal(
    <div className={`${style.backdrop} ${open ? style.show : style.hide}`}>
      <div className={`modal ${style.confirm}`}>
        <div className="modal-body">
          <section
            className="modal-close-button"
            onClick={onClickCloseButtonHandler}
          >
            X
          </section>
          {message}
          <div className="modal-button-group">
            <button type="button" onClick={onClickCancelButtonHandler}>
              취소
            </button>
            <button type="button" onClick={onClickOkButtonHandler}>
              확인
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.querySelector("#modals"),
  );
}
